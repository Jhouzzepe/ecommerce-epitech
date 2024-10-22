import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShippingInfoComponent = ({ accessToken }) => {
  const [shippingInfo, setShippingInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    postal_code: '',
    country: '',
    card_number: '',
    expiry_date: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchShippingInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/facturations/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.length > 0) {
          const shippingData = response.data[0];
          setShippingInfo(shippingData);
          setFormData(shippingData);
        } else {
          setShippingInfo(null);
        }
      } catch (error) {
        console.error('Error fetching shipping info:', error);
      }
    };

    fetchShippingInfo();
  }, [accessToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      const response = shippingInfo
        ? await axios.put(
            `http://localhost:8000/api/facturations/${shippingInfo.id}/`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            }
          )
        : await axios.post(
            'http://localhost:8000/api/facturations/',
            formData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            }
          );

      if (response.status === 200 || response.status === 201) {
        console.log('Shipping info saved successfully:', response.data);
        setShippingInfo(response.data);
        setEditMode(false);
      } else {
        console.error('Failed to save shipping info');
      }
    } catch (error) {
      console.error('Error saving shipping info:', error.response.data);
      setErrors(error.response.data);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer vos informations ?')) {
      try {
        await axios.delete(`http://localhost:8000/api/facturations/${shippingInfo.id}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('Shipping info deleted successfully');
        setShippingInfo(null); // Clear shipping info after deletion
      } catch (error) {
        console.error('Error deleting shipping info:', error);
      }
    }
  };

  const maskCardNumber = (number) => {
    if (number) {
      return `${'*'.repeat(number.length - 4)}${number.slice(-4)}`;
    }
    return '';
  };

  const maskCVV = (cvv) => {
    if (cvv) {
      return '***';
    }
    return '';
  };

  return (
    <div className="container mx-auto p-4">
      {shippingInfo ? (
        editMode ? (
          <form onSubmit={handleSubmit}>
            {/* Form fields for editing shipping info */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Prénom</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs italic">{errors.first_name[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Nom</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs italic">{errors.last_name[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Téléphone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs italic">{errors.phone[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Adresse 1</label>
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.address1 && (
                <p className="text-red-500 text-xs italic">{errors.address1[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Adresse 2</label>
              <input
                type="text"
                name="address2"
                value={formData.address2 || ''}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.address2 && (
                <p className="text-red-500 text-xs italic">{errors.address2[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Ville</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.city && (
                <p className="text-red-500 text-xs italic">{errors.city[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Code Postal</label>
              <input
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.postal_code && (
                <p className="text-red-500 text-xs italic">{errors.postal_code[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Pays</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.country && (
                <p className="text-red-500 text-xs italic">{errors.country[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Numéro de Carte</label>
              <input
                type="text"
                name="card_number"
                value={maskCardNumber(formData.card_number)}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                maxLength="16"
              />
              {errors.card_number && (
                <p className="text-red-500 text-xs italic">{errors.card_number[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Date d'Expiration</label>
              <input
                type="text"
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                maxLength="7" // Format MM/YYYY
              />
              {errors.expiry_date && (
                <p className="text-red-500 text-xs italic">{errors.expiry_date[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">CVV</label>
              <input
                type="text"
                name="cvv"
                value={maskCVV(formData.cvv)}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                maxLength="3"
              />
              {errors.cvv && (
                <p className="text-red-500 text-xs italic">{errors.cvv[0]}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <div>
            <ul className="mt-2 text-gray-700">
              {/* Display shipping info */}
              <li className="flex border-b py-2 ml-4">
                <span className="font-bold w-36 mr-8">Prénom</span>
                <span className="text-gray-700">{shippingInfo.first_name}</span>
              </li>
              <li className="flex border-b py-2 ml-4">
                <span className="font-bold w-36 mr-8">Nom</span>
                <span className="text-gray-700">{shippingInfo.last_name}</span>
              </li>
              <li className="flex border-b py-2 ml-4">
                <span className="font-bold w-36 mr-8">Email</span>
                <span className="text-gray-700">{shippingInfo.email}</span>
              </li>
              <li className="flex border-b py-2 ml-4">
                <span className="font-bold w-36 mr-8">Téléphone</span>
                <span className="text-gray-700">{shippingInfo.phone}</span>
              </li>
              <li className="flex border-b py-2 ml-4">
                <span className="font-bold w-36 mr-8">Adresse 1</span>
                <span className="text-gray-700">{shippingInfo.address1}</span>
              </li>
              <li className="flex border-b py-2 ml-4">
                <span className="font-bold w-36 mr-8">Adresse 2</span>
                <span className="text-gray-700">{shippingInfo.address2 || 'N/A'}</span>
              </li>
              <li className="flex border-b py-2 ml-4">
                <span className="font-bold w-36 mr-8">Ville</span>
                <span className="text-gray-700">{shippingInfo.city}</span>
              </li>
              <li className="flex border-b py-2 ml-4">
                <span className="font-bold w-36 mr-8">Code Postal</span>
                <span className="text-gray-700">{shippingInfo.postal_code}</span>
              </li>
              <li className="flex border-b py-2 ml-4">
                <span className="font-bold w-36 mr-8">Pays</span>
                <span className="text-gray-700">{shippingInfo.country}</span>
              </li>
              <li className="flex border-b py-2 ml-4">
                <span className="font-bold w-36 mr-8">Numéro de Carte</span>
                <span className="text-gray-700">{maskCardNumber(shippingInfo.card_number)}</span>
              </li>
              <li className="flex border-b py-2 ml-4">
                <span className="font-bold w-36 mr-8">Date d'Expiration</span>
                <span className="text-gray-700">{shippingInfo.expiry_date}</span>
              </li>
              <li className="flex border-b py-2 ml-4">
                <span className="font-bold w-36 mr-8">CVV</span>
                <span className="text-gray-700">{maskCVV(shippingInfo.cvv)}</span>
              </li>
            </ul>
            <div className="mt-4">
              <button
                onClick={() => setEditMode(true)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Modifier
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
              >
                Supprimer
              </button>
            </div>
          </div>
        )
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold mb-4">Ajouter vos informations d'expédition</h2>
          {/* Form fields for creating shipping info */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Prénom</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs italic">{errors.first_name[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nom</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs italic">{errors.last_name[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Téléphone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">{errors.phone[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Adresse 1</label>
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.address1 && (
              <p className="text-red-500 text-xs italic">{errors.address1[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Adresse 2</label>
            <input
              type="text"
              name="address2"
              value={formData.address2 || ''}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.address2 && (
              <p className="text-red-500 text-xs italic">{errors.address2[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Ville</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.city && (
              <p className="text-red-500 text-xs italic">{errors.city[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Code Postal</label>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.postal_code && (
              <p className="text-red-500 text-xs italic">{errors.postal_code[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Pays</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.country && (
              <p className="text-red-500 text-xs italic">{errors.country[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Numéro de Carte</label>
            <input
              type="text"
              name="card_number"
              value={formData.card_number}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              maxLength="16"
            />
            {errors.card_number && (
              <p className="text-red-500 text-xs italic">{errors.card_number[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Date d'Expiration</label>
            <input
              type="text"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              maxLength="7" // Format MM/YYYY
            />
            {errors.expiry_date && (
              <p className="text-red-500 text-xs italic">{errors.expiry_date[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              maxLength="3"
            />
            {errors.cvv && (
              <p className="text-red-500 text-xs italic">{errors.cvv[0]}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Enregistrer
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ShippingInfoComponent;
