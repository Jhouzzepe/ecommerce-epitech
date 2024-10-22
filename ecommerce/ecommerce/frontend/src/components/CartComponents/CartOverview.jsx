import React, { useState, useEffect } from "react";
import FacturationModale from "./FacturationModale";
import DeliveryMethodModal from "./DeliveryMethodModale";
import ConfirmationModal from "./ConfirmationModale";
import { usePrestataires } from "../../contexts/PrestatairesContext";
import { useDeliveryMethods } from "../../contexts/DeliveryMethodContext";
import axios from 'axios';

const CartOverview = ({ items }) => {
  const [isFacturationModalOpen, setIsFacturationModalOpen] = useState(false);
  const [isDeliveryMethodModalOpen, setIsDeliveryMethodModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
  const [discountCode, setDiscountCode] = useState(''); // Pour stocker le code de réduction
  const [discount, setDiscount] = useState(0); // Pour stocker la valeur de la réduction en pourcentage
  const [error, setError] = useState(null); // Pour stocker les erreurs lors de la vérification du code

  const { prestataires } = usePrestataires();
  const { deliveryMethods } = useDeliveryMethods();

  // Calculs de prix
  const totalWeightInGrams = items.reduce((total, item) => {
    const weightInGrams = parseFloat(item.product.weight) || 0;
    const quantity = parseInt(item.quantity, 10) || 1;
    return total + weightInGrams * quantity;
  }, 0);

  const baseDeliveryMethod = prestataires
    .filter((method) => totalWeightInGrams <= parseFloat(method.poids_max_colis) * 1000)
    .reduce((bestMethod, currentMethod) => {
      const currentPrice = parseFloat(currentMethod.montant_facture_client);
      if (!bestMethod || currentPrice < bestMethod.price) {
        return { id: currentMethod.id, name: currentMethod.nom, price: currentPrice };
      }
      return bestMethod;
    }, null);

  const baseDeliveryFee = baseDeliveryMethod ? baseDeliveryMethod.price : 0;

  const totalPriceWithoutDelivery = items.reduce((total, item) => {
    const price = parseFloat(item.product.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 1;
    return total + price * quantity;
  }, 0);

  const discountAmount = (totalPriceWithoutDelivery * discount) / 100;
  const additionalDeliveryFee = selectedDeliveryMethod ? selectedDeliveryMethod.price : 0;
  const totalPriceWithDelivery = totalPriceWithoutDelivery - discountAmount + baseDeliveryFee + additionalDeliveryFee;

  // Logique pour vérifier le code de réduction
  const handleApplyDiscount = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/discounts/apply`, {
        params: {
          code: discountCode,
        },
      });
      const data = response.data;
      if (data.success) {
        setDiscount(data.discount_value); // Met à jour la réduction
        setError(null); // Réinitialise les erreurs
      } else {
        setDiscount(0); // Réinitialise la réduction si le code est invalide
        setError(data.message); // Affiche l'erreur
      }
    } catch (error) {
      console.error("Erreur lors de l'application du code de réduction:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message); // Affiche le message d'erreur retourné par le serveur
      } else {
        setError("Erreur lors de la vérification du code de réduction.");
      }
    }
  };

  const openDeliveryMethodModal = () => setIsDeliveryMethodModalOpen(true);
  const closeDeliveryMethodModal = () => setIsDeliveryMethodModalOpen(false);

  const openFacturationModal = () => setIsFacturationModalOpen(true);
  const closeFacturationModal = () => setIsFacturationModalOpen(false);

  const openConfirmationModal = () => setIsConfirmationModalOpen(true);
  const closeConfirmationModal = () => setIsConfirmationModalOpen(false);

  const handleDeliveryMethodSubmit = (method) => {
    setSelectedDeliveryMethod(method);
    closeDeliveryMethodModal();
    openFacturationModal();
  };
  const handleFacturationSubmit = (data) => {
    const summary = {
        items: items.map(item => ({
            name: item.product.name,
            price: parseFloat(item.product.price),
            quantity: item.quantity || 1,
            product_id: item.product.id
        })),
        totalPriceWithoutDelivery,
        baseDeliveryFee,
        deliveryFee: selectedDeliveryMethod ? selectedDeliveryMethod.price : 0,
        totalPriceWithDelivery,
        billingData: data,
        discountCode: discountCode,  // Use discountCode defined in your state
        discountValue: discount  // Use discount value from your state
    };
    setOrderSummary(summary);
    closeFacturationModal();
    openConfirmationModal();
};



  return (
    <div className="flex flex-col w-full lg:w-5/6 h-fit gap-4 p-4">
      <p className="text-blue-900 text-xl font-extrabold">Mon récapitulatif :</p>
      <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
        {items.length > 0 ? (
          <div>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.product.name} (x{item.quantity})</span>
                <span>{(parseFloat(item.product.price) * item.quantity).toFixed(2)}€</span>
              </div>
            ))}
          </div>
        ) : (
          <p>Votre panier est vide.</p>
        )}

        <div className="flex justify-between font-semibold mt-4">
          <p>Total sans livraison :</p>
          <p>{totalPriceWithoutDelivery.toFixed(2)}€</p>
        </div>

        {/* Affichage de la réduction si elle est appliquée */}
        {discount > 0 && (
          <div className="flex justify-between font-semibold text-red-600">
            <p>Réduction appliquée :</p>
            <p>-{discountAmount.toFixed(2)}€</p>
          </div>
        )}

        <div className="flex justify-between font-semibold">
          <p>Frais de livraison de base :</p>
          <p>{baseDeliveryFee.toFixed(2)}€</p>
        </div>
        <div className="flex justify-between font-bold text-xl">
          <p>Total avec livraison :</p>
          <p>{totalPriceWithDelivery.toFixed(2)}€</p>
        </div>

        {/* Champ pour le code de réduction */}
        <div className="flex flex-col gap-2 mt-4">
          <input
            type="text"
            placeholder="Code de réduction"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            onClick={handleApplyDiscount}
            className="btn-primary h-10 flex items-center justify-center bg-blue-800 text-white font-semibold gap-2 cursor-pointer shadow-lg relative overflow-hidden transition duration-300"
          >
            Appliquer
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="flex gap-2 justify-center w-full mt-4">
          <button
            onClick={openDeliveryMethodModal}
            className="btn-primary w-32 h-10 flex items-center justify-center bg-green-800 text-white font-semibold gap-2 cursor-pointer shadow-lg relative overflow-hidden transition duration-300"
          >
            Passer commande
            <svg className="w-4" viewBox="0 0 576 512">
              <path
                className="fill-current text-white"
                d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H376zm-64 0c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H312zm0-80c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H312zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H440zm-128-80c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H312zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H440z"
              />
            </svg>
          </button>
        </div>
      </div>

      <DeliveryMethodModal
        isOpen={isDeliveryMethodModalOpen}
        onRequestClose={closeDeliveryMethodModal}
        onSubmit={handleDeliveryMethodSubmit}
      />

      <FacturationModale
        isOpen={isFacturationModalOpen}
        onClose={closeFacturationModal}
        onSubmit={handleFacturationSubmit}
        initialData={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          address2: "",
          city: "",
          postalCode: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        }}
        deliveryFee={baseDeliveryFee + additionalDeliveryFee} // Pass the total delivery fee
      />

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
        orderSummary={orderSummary}
      />
    </div>
  );
};

export default CartOverview;
