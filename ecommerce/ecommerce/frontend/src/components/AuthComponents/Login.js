import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useToken } from '../../contexts/UserTokenContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '', rememberMe: false });
  const { setAccessToken, setRefreshToken } = useToken();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setCredentials({ ...credentials, rememberMe: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.login(credentials.username, credentials.password, credentials.rememberMe)
      .then(response => {
        setAccessToken(response.access);
        setRefreshToken(response.refresh);
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E9E9E9]">
      <div>
        <img src="/bandes.png" alt="bandes" style={{ width: '100%', height: '10vh' }} />
        <form onSubmit={handleSubmit} className="bg-[#2E4033] pr-8 pl-8 pb-8 shadow-md relative">
          <div className="flex flex-col items-center mb-8">
            <img src="/CapyBrun.png" alt="CapyBrun" className="h-30 w-30 object-cover rounded-full" />
            <h1 className="text-5xl mt-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A88030] via-[#E7C248] via-[#FFEB8A] via-[#E7C248] to-[#A88030]" style={{ fontFamily: 'Marcellus SC, serif' }}>
              Papuche
            </h1>
          </div>
          <div>
            <label htmlFor="username" className="text-white text-xl" style={{ fontFamily: 'Marcellus SC, serif' }}>Nom d'utilisateur</label>
            <input type="text" id="username" name="username" value={credentials.username} onChange={handleChange} required className="border p-2 w-full" autocomplete="username" />
          </div>
          <div className="mt-8">
            <label htmlFor="password" className="text-white text-xl" style={{ fontFamily: 'Marcellus SC, serif' }}>Mot de passe</label>
            <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required className="border p-2 w-full" autocomplete="current-password" />
          </div>
          <div className="mt-8">
            <label className="text-white text-xl flex items-center" style={{ fontFamily: 'Marcellus SC, serif' }}>
              <input type="checkbox" name="rememberMe" checked={credentials.rememberMe} onChange={handleCheckboxChange} className="mr-2" />
              Se souvenir de moi
            </label>
          </div>
          <div className="mt-8 flex justify-center">
            <button type="submit" className="bg-blue-500 text-white text-xl p-3 rounded" style={{ fontFamily: 'Marcellus SC, serif' }}>Se connecter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
