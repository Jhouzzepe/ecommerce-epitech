import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');

  const refreshTokenFunction = useCallback(async () => {
    console.log('Refreshing token...');
    try {
      const response = await axios.post('http://localhost:8000/api/token/refresh/', { 
        refresh: refreshToken 
      });
  
      if (response.status === 200) {
        const data = response.data;
        setAccessToken(data.access);
        localStorage.setItem('accessToken', data.access);
        console.log('Token refreshed:', data.access); // Affiche le nouveau token dans la console
      } else {
        console.error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  }, [refreshToken]);
  

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken);
  }, [accessToken]);

  useEffect(() => {
    localStorage.setItem('refreshToken', refreshToken);
  }, [refreshToken]);

  useEffect(() => {
    const interval = setInterval(refreshTokenFunction, 180000);
    return () => clearInterval(interval);
  }, [refreshTokenFunction]);

  return (
    <TokenContext.Provider value={{ accessToken, setAccessToken, refreshToken, setRefreshToken, refreshTokenFunction }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};
