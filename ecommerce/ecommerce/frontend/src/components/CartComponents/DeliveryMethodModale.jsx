import React, { useState } from "react";
import Modal from "react-modal";
import { useDeliveryMethods } from "../../contexts/DeliveryMethodContext";

Modal.setAppElement("#root");

const DeliveryMethodModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const { deliveryMethods = {}, loading, error } = useDeliveryMethods();
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

  const handleSubmit = () => {
    if (onSubmit && selectedMethod) {
      onSubmit(selectedMethod);
      onRequestClose();
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      className="bg-white rounded-lg shadow-lg max-w-sm mx-auto p-6 flex flex-col h-[500px] relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Choisissez votre méthode de livraison
      </h2>
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-4">
          {Object.entries(deliveryMethods).map(([key, { price, label, deliveryTime }]) => (
            <li
              key={key}
              className={`border-2 rounded-lg overflow-hidden shadow-lg bg-gray-50 ${
                selectedMethod && selectedMethod.key === key
                  ? "border-green-500"
                  : "border-gray-300"
              } transition`}
            >
              <button
                onClick={() => handleSelectMethod({ key, price })}
                className="w-full p-4 flex flex-col items-center text-left focus:outline-none transition-transform transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {label}
                </h3>
                <p className="text-gray-600 mt-1">
                  Prix: {price.toFixed(2)}€
                </p>
                <p className="text-gray-600 mt-1">
                  Délai de livraison: {deliveryTime}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <button
          onClick={handleSubmit}
          className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition ${
            selectedMethod ? "cursor-pointer hover:bg-green-700" : "cursor-not-allowed bg-gray-300"
          }`}
          disabled={!selectedMethod}
        >
          Continuer
        </button>
      </div>
    </Modal>
  );
};

export default DeliveryMethodModal;
