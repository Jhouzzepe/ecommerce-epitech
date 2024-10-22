import React from "react";
import Modal from "react-modal";
import { useToken } from "../../contexts/UserTokenContext";
import axios from "axios";

Modal.setAppElement("#root");

const ConfirmationModal = ({ isOpen, onClose, orderSummary }) => {
  const { accessToken } = useToken();

  if (!orderSummary) return null;

  // Extraction des valeurs de orderSummary
  const {
    items,
    totalPriceWithoutDelivery,
    deliveryFee,
    totalPriceWithDelivery,
    billingData,
    discountCode, // Le code de réduction appliqué
    discountValue, // La valeur de la réduction en pourcentage
  } = orderSummary;

  const validateOrder = async () => {
    const dataToSend = {
      items: items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount: totalPriceWithoutDelivery,
      delivery_fee: deliveryFee,
      final_amount: totalPriceWithDelivery, // total après réduction et livraison
      discount_code: discountCode, // Le code de réduction utilisé
    };
  
    try {
      const response = await axios.post('http://localhost:8000/api/orders/validate/', dataToSend, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 201) {
        const order = response.data;
        console.log('Commande validée:', order);
        // Rediriger l'utilisateur ou afficher un message de succès
      } else {
        console.error('Erreur lors de la validation de la commande:', response.data);
        // Afficher un message d'erreur à l'utilisateur
      }
    } catch (error) {
      console.error('Erreur lors de la validation de la commande:', error.response ? error.response.data : error.message);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  const handleValidateOrder = async () => {
    try {
      await validateOrder();
      for (const item of items) {
        if (item.product_id) {
          await axios.delete(
            `http://localhost:8000/api/cart/remove/${item.product_id}/`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        } else {
          console.error("Erreur : ID du produit manquant pour l'élément", item);
        }
      }
      alert("Commande validée et articles supprimés du panier !");
      onClose();
    } catch (error) {
      console.error(
        "Erreur lors de la validation de la commande :",
        error.response ? error.response.data : error.message
      );
      alert("Erreur lors de la validation de la commande.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentLabel="Confirmation de Commande"
      className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto relative max-h-screen md:max-h-[80vh] overflow-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <h2 className="text-3xl font-bold mb-6 text-green-700">
        Confirmation de Commande
      </h2>
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Récapitulatif de la Commande
        </h3>
        <div>
          <h4 className="text-lg font-semibold text-gray-700">Articles :</h4>
          <ul className="list-disc pl-5 text-gray-600">
            {items.map((item, index) => (
              <li key={index} className="mb-2">
                <span className="font-medium">
                  {item.quantity}x {item.name}
                </span>{" "}
                -{" "}
                <span className="font-semibold">{item.price.toFixed(2)}€</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between font-semibold text-gray-700">
          <p>Total sans livraison :</p>
          <p>{totalPriceWithoutDelivery.toFixed(2)}€</p>
        </div>

        {/* Affichage de la réduction si elle est appliquée */}
        {discountValue > 0 && (
          <div className="flex justify-between font-semibold text-red-600">
            <p>Réduction appliquée ({discountCode}) :</p>
            <p>-{(totalPriceWithoutDelivery * (discountValue / 100)).toFixed(2)}€</p>
          </div>
        )}

        <div className="flex justify-between font-semibold text-gray-700">
          <p>
            Frais de livraison de base :{" "}
            {orderSummary.baseDeliveryFee.toFixed(2)}€
          </p>
        </div>
        <div className="flex justify-between font-semibold text-gray-700">
          <p>
            Frais de livraison supplémentaires :{" "}
            {deliveryFee.toFixed(2)}€
          </p>
        </div>
        <div className="flex justify-between font-bold text-xl text-gray-900">
          <p>Total avec livraison :</p>
          <p>{totalPriceWithDelivery.toFixed(2)}€</p>
        </div>
        <h4 className="text-lg font-semibold text-gray-700 mt-4">
          Informations de Facturation
        </h4>
        <div className="text-gray-600">
          <p>
            <span className="font-medium">Prénom :</span>{" "}
            {billingData.firstName}
          </p>
          <p>
            <span className="font-medium">Nom :</span> {billingData.lastName}
          </p>
          <p>
            <span className="font-medium">Email :</span> {billingData.email}
          </p>
          <p>
            <span className="font-medium">Téléphone :</span> {billingData.phone}
          </p>
          <p>
            <span className="font-medium">Adresse :</span> {billingData.address1}
          </p>
          <p>
            <span className="font-medium">Complément :</span>{" "}
            {billingData.address2}
          </p>
          <p>
            <span className="font-medium">Ville :</span> {billingData.city}
          </p>
          <p>
            <span className="font-medium">Code postal :</span>{" "}
            {billingData.postalCode}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleValidateOrder}
          className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Valider
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-black py-2 px-4 rounded-lg shadow-md hover:bg-gray-400 transition"
        >
          Fermer
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
