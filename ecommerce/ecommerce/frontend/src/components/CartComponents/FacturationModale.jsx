import React, { useState } from "react";
import Modal from "react-modal";
import InputMask from "react-input-mask";
import axios from "axios";
import { useToken } from "../../contexts/UserTokenContext";

Modal.setAppElement("#root");

const FacturationModale = ({ isOpen, onClose, onSubmit, initialData }) => {
  const { accessToken } = useToken();
  const [formData, setFormData] = useState({
    first_name: '',
    lastlast_name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    postal_code: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    shippingMethod: '',
    trackingNumber: '',
    shippingCost: 0.00,
    estimatedDelivery: '',
    ...initialData // Merge initial data into formData
  });
  const [formErrors, setFormErrors] = useState({});
  const [saveInfo, setSaveInfo] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setSaveInfo(e.target.checked);
  };

  const validateForm = () => {
    const errors = {};

    const validations = {
      firstName: (value) => !value.trim() && "Le prénom est requis",
      lastName: (value) => !value.trim() && "Le nom est requis",
      email: (value) => {
        if (!value.trim()) return "L'email est requis";
        if (!/\S+@\S+\.\S+/.test(value)) return "L'email n'est pas valide";
        return null;
      },
      phone: (value) => {
        if (!value.trim()) return "Le téléphone est requis";
        if (!/^\d{10}$/.test(value))
          return "Le téléphone doit contenir 10 chiffres";
        return null;
      },
      address1: (value) => !value.trim() && "L'adresse est requise",
      city: (value) => !value.trim() && "La ville est requise",
      postalCode: (value) => {
        if (!value.trim()) return "Le code postal est requis";
        if (!/^\d{5}$/.test(value))
          return "Le code postal doit contenir 5 chiffres";
        return null;
      },
      cardNumber: (value) => {
        const sanitizedValue = value.replace(/\s+/g, ""); // Enlever les espaces
        if (!sanitizedValue) return "Le numéro de carte est requis";
        if (!/^\d{13,19}$/.test(sanitizedValue))
          return "Le numéro de carte est invalide";
        return null;
      },
      expiryDate: (value) => {
        if (!value.trim()) return "La date d'expiration est requise";
        if (!/^\d{2}\/\d{2}$/.test(value))
          return "La date d'expiration doit être au format MM/AA";
        const [month, year] = value.split("/");
        if (month < 1 || month > 12)
          return "Le mois doit être compris entre 01 et 12";
        if (year < 24) return "L'année doit être en cours ou future";
        return null;
      },
      cvv: (value) => {
        if (!value.trim()) return "Le CVV est requis";
        if (!/^\d{3}$/.test(value)) return "Le CVV doit contenir 3 chiffres";
        return null;
      },
    };

    for (const [key, validate] of Object.entries(validations)) {
      const error = validate(formData[key]);
      if (error) errors[key] = error;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSend = {
        ...formData,
        order: 2,
      };
      console.log("Données envoyées :", dataToSend);
      try {
        if (saveInfo) {
          const response = await axios.post(
            "http://localhost:8000/api/shipping/add/",
            dataToSend,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
            }
          );
          console.log("Réponse du serveur :", response.data);
          alert("Informations de facturation sauvegardées !");
        }
        onSubmit(dataToSend);
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des informations de facturation :", error.response ? error.response.data : error.message);
        alert("Une erreur est survenue lors de la sauvegarde des informations.");
      }
    }
  };
  
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal de Paiement"
      className="bg-white p-8 rounded-lg max-w-lg mx-auto relative max-h-screen md:max-h-[80vh] overflow-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-900">
        Informations de Facturation
      </h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Section Prénom et Nom */}
        <div className="flex flex-col md:flex-row gap-6">
          {["firstName", "lastName"].map((field) => (
            <label key={field} className="flex flex-col w-full md:w-1/2">
              <span className="text-gray-700 mb-1">
                {field === "firstName" ? "Prénom" : "Nom"} :
              </span>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className={`border p-4 rounded-lg ${
                  formErrors[field] ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder={`Votre ${field === "firstName" ? "prénom" : "nom"}`}
              />
              {formErrors[field] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
              )}
            </label>
          ))}
        </div>

        {/* Section Email et Téléphone */}
        <div className="flex flex-col md:flex-row gap-6">
          {["email", "phone"].map((field) => (
            <label key={field} className="flex flex-col w-full md:w-1/2">
              <span className="text-gray-700 mb-1">
                {field === "email" ? "Email" : "Téléphone"} :
              </span>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className={`border p-4 rounded-lg ${
                  formErrors[field] ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder={field === "email" ? "email@exemple.com" : "Votre téléphone"}
              />
              {formErrors[field] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
              )}
            </label>
          ))}
        </div>

        {/* Section Adresse et Complément */}
        <div className="flex flex-col md:flex-row gap-6">
          {["address1", "address2"].map((field) => (
            <label key={field} className="flex flex-col w-full md:w-1/2">
              <span className="text-gray-700 mb-1">
                {field === "address1" ? "Adresse" : "Complément d'adresse"} :
              </span>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className={`border p-4 rounded-lg ${
                  formErrors[field] ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder={
                  field === "address1"
                    ? "Adresse de facturation"
                    : "Complément d'adresse"
                }
              />
              {formErrors[field] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
              )}
            </label>
          ))}
        </div>

        {/* Section Ville et Code postal */}
        <div className="flex flex-col md:flex-row gap-6">
          {["city", "postalCode"].map((field) => (
            <label key={field} className="flex flex-col w-full md:w-1/2">
              <span className="text-gray-700 mb-1">
                {field === "city" ? "Ville" : "Code postal"} :
              </span>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className={`border p-4 rounded-lg ${
                  formErrors[field] ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder={field === "city" ? "Votre ville" : "Code postal"}
              />
              {formErrors[field] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
              )}
            </label>
          ))}
        </div>

        {/* Section Numéro de carte, Date d'expiration et CVV */}
        <div className="flex flex-col gap-6">
          {["cardNumber", "expiryDate", "cvv"].map((field) => (
            <label key={field} className="flex flex-col">
              <span className="text-gray-700 mb-1">
                {field === "cardNumber"
                  ? "Numéro de carte"
                  : field === "expiryDate"
                  ? "Date d'expiration (MM/AA)"
                  : "CVV"}{" "}
                :
              </span>
              <InputMask
                mask={
                  field === "cardNumber"
                    ? "9999 9999 9999 9999"
                    : field === "expiryDate"
                    ? "99/99"
                    : "999"
                }
                value={formData[field]}
                onChange={handleInputChange}
                name={field}
                className={`border p-4 rounded-lg ${
                  formErrors[field] ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder={
                  field === "cardNumber"
                    ? "0000 0000 0000 0000"
                    : field === "expiryDate"
                    ? "MM/AA"
                    : "123"
                }
                onBlur={() => {
                  if (field === "cardNumber") {
                    setFormData((prev) => ({
                      ...prev,
                      cardNumber: prev.cardNumber.replace(/\s+/g, ""),
                    }));
                  }
                }}
              />
              {formErrors[field] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
              )}
            </label>
          ))}
        </div>

        {/* Case à cocher pour sauvegarder les informations de facturation */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            checked={saveInfo}
            onChange={handleCheckboxChange}
            className="h-4 w-4"
          />
          <label className="text-gray-700">
            Sauvegarder les informations de facturation
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-4 rounded-lg mt-6 hover:bg-blue-700 transition-colors"
        >
          Payer maintenant
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-gray-700 p-4 rounded-lg mt-4 hover:bg-gray-400 transition-colors"
        >
          Annuler
        </button>
      </form>
    </Modal>
  );
};

export default FacturationModale;
