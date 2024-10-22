import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToken } from './UserTokenContext';
import axios from 'axios';

const PrestatairesContext = createContext();

export const PrestatairesProvider = ({ children }) => {
  const { accessToken } = useToken();
  const [prestataires, setPrestataires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchPrestataires = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/prestataires', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPrestataires(response.data);
    //   debug
    //   console.log('Data fetched:', response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrestataires();
  }, [accessToken]);
// Debug
//   useEffect(() => {
//     console.log('Prestataires updated:', prestataires);
//   }, [prestataires]);

  return (
    <PrestatairesContext.Provider value={{ prestataires, loading, error }}>
      {children}
    </PrestatairesContext.Provider>
  );
};

export const usePrestataires = () => {
  return useContext(PrestatairesContext);
};
