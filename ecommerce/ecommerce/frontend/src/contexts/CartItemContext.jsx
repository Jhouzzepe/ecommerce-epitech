import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const CartItemContext = createContext();

export const CartItemProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user?.access;

  const fetchCart = async () => {
    if (!accessToken) {
      setError("No access token available");
      setLoading(false);
      return;
    }

    try {
      const cartResponse = await axios.get("http://localhost:8000/api/cart/", {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const cart = cartResponse.data;

      const itemsResponse = await axios.get(`http://localhost:8000/api/cart/${cart.user}/items/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setCartItems(itemsResponse.data);
      setError(null);
    } catch (error) {
      setError("Error fetching cart or cart items");
      console.error("Error fetching cart or cart items: ", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item) => {
    try {
      await axios.post("http://localhost:8000/api/cart/add/", item, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      refreshCart();  // Rafraîchir le panier après ajout
    } catch (error) {
      setError("Error adding item to cart");
      console.error("Error adding item to cart: ", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/remove/${itemId}/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      refreshCart();
    } catch (error) {
      setError("Error removing item from cart");
      console.error("Error removing item from cart: ", error);
    }
  };

  const refreshCart = () => {
    setLoading(true);
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, [accessToken]);

  return (
    <CartItemContext.Provider value={{ cartItems, addToCart, removeFromCart, refreshCart, loading, error }}>
      {children}
    </CartItemContext.Provider>
  );
};

export const useCartItems = () => useContext(CartItemContext);
