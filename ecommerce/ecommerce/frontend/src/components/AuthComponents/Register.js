import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { COUNTRY_CHOICES } from '../../constants';

const Register = () => {
  const [formErrors, setFormErrors] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [gender, setGender] = useState('Homme');
  const [country, setCountry] = useState('FR');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{8,}$/; // Minimum 8 caractères, au moins une lettre et un chiffre
    const phoneRegex = /^\+?\d{10,15}$/;
    const postalCodeRegex = /^\d{5}$/; // Valide les codes postaux à 5 chiffres (français)

    if (!username.trim()) {
      errors.username = "Nom d'utilisateur est requis.";
    } else if (!usernameRegex.test(username)) {
      errors.username = "Nom d'utilisateur doit comporter entre 3 et 16 caractères, et peut contenir des lettres, chiffres et underscores.";
    }

    if (!email.trim()) {
      errors.email = "L'email est requis.";
    } else if (!emailRegex.test(email)) {
      errors.email = "L'email n'est pas valide.";
    }

    if (!password) {
      errors.password = "Le mot de passe est requis.";
    } else if (!passwordRegex.test(password)) {
      errors.password = "Le mot de passe doit comporter au moins 8 caractères.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    if (!firstName.trim()) {
      errors.firstName = "Le prénom est requis.";
    }

    if (!lastName.trim()) {
      errors.lastName = "Le nom de famille est requis.";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Le numéro de téléphone est requis.";
    } else if (!phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = "Le numéro de téléphone n'est pas valide.";
    }

    if (!address.trim()) {
      errors.address = "L'adresse est requise.";
    }

    if (!postalCode.trim()) {
      errors.postalCode = "Le code postal est requis.";
    } else if (!postalCodeRegex.test(postalCode)) {
      errors.postalCode = "Le code postal n'est pas valide.";
    }

    return errors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const userData = {
      username,
      email,
      password,
      confirm_password: confirmPassword,
      first_name: firstName,
      last_name: lastName,
      profile: {
        phone_number: phoneNumber,
        address,
        postal_code: postalCode,
        gender,
        country,
      },
    };

    authService.register(userData).then(
      () => {
        setMessage("Utilisateur enregistré avec succès. Redirection vers la connexion...");
        setTimeout(() => navigate('/login'), 2000);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E9E9E9] py-12
    ">
      <div>
        <img src="/bandes.png" alt="bandes" style={{ width: '100%', height: '10vh' }} />
        <form onSubmit={handleRegister} className="bg-[#2E4033] pr-8 pl-8 pb-8 shadow-md relative">
          <div className="flex flex-col items-center mb-8">
            <img src="/CapyBrun.png" alt="CapyBrun" className="h-30 w-30 object-cover rounded-full" />
            <h1 className="text-5xl mt-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A88030] via-[#E7C248] via-[#FFEB8A] via-[#E7C248] to-[#A88030]" style={{ fontFamily: 'Marcellus SC, serif' }}>
              Papuche
            </h1>
          </div>
          <div>
            <label htmlFor="username" className="text-white text-xl" style={{ fontFamily: 'Marcellus SC, serif' }}>Nom d'utilisateur</label>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-full" />
            {formErrors.username && <div className="text-red-500 mt-2 max-w-xs">{formErrors.username}</div>}
          </div>
          <div className="mt-8">
            <label htmlFor="email" className="text-white text-xl" style={{ fontFamily: 'Marcellus SC, serif' }}>Email</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
            {formErrors.email && <div className="text-red-500 mt-2 max-w-xs">{formErrors.email}</div>}
          </div>
          <div className="mt-8">
            <label htmlFor="password" className="text-white text-xl" style={{ fontFamily: 'Marcellus SC, serif' }}>Mot de passe</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
            {formErrors.password && <div className="text-red-500 mt-2 max-w-xs">{formErrors.password}</div>}
          </div>
          <div className="mt-8">
            <label htmlFor="confirmPassword" className="text-white text-xl" style={{ fontFamily: 'Marcellus SC, serif' }}>Confirmer mot de passe</label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border p-2 w-full" />
            {formErrors.confirmPassword && <div className="text-red-500 mt-2 max-w-xs">{formErrors.confirmPassword}</div>}
          </div>
          <div className="mt-8">
            <label htmlFor="firstName" className="text-white text-xl" style={{ fontFamily: 'Marcellus SC, serif' }}>Prénom</label>
            <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border p-2 w-full" />
            {formErrors.firstName && <div className="text-red-500 mt-2 max-w-xs">{formErrors.firstName}</div>}
          </div>
          <div className="mt-8">
            <label htmlFor="lastName" className="text-white text-xl" style={{ fontFamily: 'Marcellus SC, serif' }}>Nom de famille</label>
            <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border p-2 w-full" />
            {formErrors.lastName && <div className="text-red-500 mt-2 max-w-xs">{formErrors.lastName}</div>}
          </div>
          <div className="mt-8">
            <label htmlFor="phoneNumber" className="text-white text-xl" style={{ fontFamily: 'Marcellus SC, serif' }}>Numéro de téléphone</label>
            <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="border p-2 w-full" />
            {formErrors.phoneNumber && <div className="text-red-500 mt-2 max-w-xs">{formErrors.phoneNumber}</div>}
          </div>
          <div className="mt-8">
            <label htmlFor="address" className="text-white text-xl" style={{ fontFamily: 'Marcellus SC, serif' }}>Adresse</label>
            <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="border p-2 w-full" />
            {formErrors.address && <div className="text-red-500 mt-2 max-w-xs">{formErrors.address}</div>}
          </div>
          <div className="mt-8">
            <label htmlFor="postalCode" className="text-white text-xl" style={{ fontFamily: 'Marcellus SC, serif' }}>Code postal</label>
            <input type="text" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="border p-2 w-full" />
            {formErrors.postalCode && <div className="text-red-500 mt-2 max-w-xs">{formErrors.postalCode}</div>}
          </div>
          <div className="mt-8">
            <label htmlFor="gender" className="text-white text-xl" style={{ fontFamily: 'Marcellus SC, serif' }}>Genre</label>
            <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="border p-2 w-full">
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>
          </div>
          <div className="mt-8">
            <label htmlFor="country" className="text-white text-xl" style={{ fontFamily: 'Marcellus SC, serif' }}>Pays</label>
            <select name="country" value={country} onChange={(e) => setCountry(e.target.value)} className="border p-2 w-full">
              {COUNTRY_CHOICES.map((country) => (
                <option key={country.value} value={country.value}>{country.label}</option>
              ))}
            </select>
          </div>
          <div className="mt-8 flex justify-center">
            <button type="submit" className="bg-blue-500 text-white text-xl p-3 rounded" style={{ fontFamily: 'Marcellus SC, serif' }}>S'inscrire</button>
          </div>
          {message && (
            <div className="alert mt-4">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
