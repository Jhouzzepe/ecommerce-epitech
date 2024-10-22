import React, { useEffect, useState } from 'react';
import axios from 'axios';
import countryList from 'react-select-country-list';

const ProfileComponent = ({ accessToken }) => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    address: '',
    postal_code: '',
    gender: '',
    country: ''
  });
  const [errors, setErrors] = useState({});
  const countries = countryList().getData(); // Utilisation de react-select-country-list

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProfile(response.data);
        setFormData({
          username: response.data.user.username,
          email: response.data.user.email,
          phone_number: response.data.phone_number,
          address: response.data.address,
          postal_code: response.data.postal_code,
          gender: response.data.gender,
          country: response.data.country,
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, [accessToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({}); // Clear previous errors

    const updatedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== profile[key] && key !== 'user') {
        updatedFields[key] = formData[key];
      }
    });

    if (formData.username !== profile.user.username) {
      updatedFields.user = {
        ...updatedFields.user,
        username: formData.username,
      };
    }

    if (formData.email !== profile.user.email) {
      updatedFields.user = {
        ...updatedFields.user,
        email: formData.email,
      };
    }

    if (Object.keys(updatedFields).length === 0) {
      console.log("No changes detected");
      setEditMode(false);
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/api/profile/update/",
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Profile updated successfully:", response.data);
        setProfile(response.data);
        setEditMode(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error.response.data);
      setErrors(error.response.data);
    }
  };

  return (
    <div className="my-4 flex justify-center mt-8 mb-16 flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
      <div className="relative w-full flex flex-col p-4 bg-[#2E4033] rounded-lg 2xl:w-1/3">
        <div
          className="absolute inset-0 rounded-lg border-4 border-transparent"
          style={{
            borderImage:
              'linear-gradient(to right, #A88030, #E7C248, #FFEB8A, #E7C248, #A88030) 1',
            borderRadius: '20px',
            boxSizing: 'border-box',
            padding: '4px',
          }}
        ></div>
        <div className="relative flex-1 bg-white rounded-lg shadow-xl p-8">
          <h4 className="text-xl text-gray-900 font-bold">Vos informations</h4>
          {profile ? (
            editMode ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Pseudo</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.user?.username && (
                    <p className="text-red-500 text-xs italic">{errors.user.username[0]}</p>
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
                  {errors.user?.email && (
                    <p className="text-red-500 text-xs italic">{errors.user.email[0]}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Numéro</label>
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    maxLength="10" // Limite à 10 chiffres
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-xs italic">{errors.phone_number[0]}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Adresse</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
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
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Genre</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Pays</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {countries.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
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
              <ul className="mt-2 text-gray-700">
                <li className="flex border-b py-2 ml-4">
                  <span className="font-bold w-24 mr-8">Pseudo</span>
                  <span className="text-gray-700">{profile.user.username}</span>
                </li>
                <li className="flex border-b py-2 ml-4">
                  <span className="font-bold w-24 mr-8">Email</span>
                  <span className="text-gray-700">{profile.user.email}</span>
                </li>
                <li className="flex border-b py-2 ml-4">
                  <span className="font-bold w-24 mr-8">Numéro</span>
                  <span className="text-gray-700">{profile.phone_number}</span>
                </li>
                <li className="flex border-b py-2 ml-4">
                  <span className="font-bold w-24 mr-8">Adresse</span>
                  <span className="text-gray-700">{profile.address}</span>
                </li>
                <li className="flex border-b py-2 ml-4">
                  <span className="font-bold w-24 mr-8">Code Postal</span>
                  <span className="text-gray-700">{profile.postal_code}</span>
                </li>
                <li className="flex border-b py-2 ml-4">
                  <span className="font-bold w-24 mr-8">Genre</span>
                  <span className="text-gray-700">{profile.gender}</span>
                </li>
                <li className="flex border-b py-2 ml-4">
                  <span className="font-bold w-24 mr-8">Pays</span>
                  <span className="text-gray-700">{profile.country}</span>
                </li>
                <li className="flex border-b py-2 ml-4 mt-4">
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Modifier
                  </button>
                </li>
              </ul>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
