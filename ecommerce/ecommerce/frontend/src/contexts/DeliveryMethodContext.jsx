import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useToken } from './UserTokenContext';

const DeliveryMethodContext = createContext();

export const DeliveryMethodProvider = ({ children }) => {
  const { accessToken } = useToken();
  const [deliveryMethods, setDeliveryMethods] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDeliveryMethods = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/deliverymethods/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const methods = response.data.reduce((acc, method) => {
        acc[method.id] = {
          label: method.label,
          price: parseFloat(method.price),
          deliveryTime: method.delivery_time
        };
        return acc;
      }, {});

      setDeliveryMethods(methods);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveryMethods();
  }, [accessToken]);

  return (
    <DeliveryMethodContext.Provider value={{ deliveryMethods, loading, error }}>
      {children}
    </DeliveryMethodContext.Provider>
  );
};

export const useDeliveryMethods = () => {
  return useContext(DeliveryMethodContext);
};
