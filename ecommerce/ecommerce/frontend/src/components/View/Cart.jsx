import React, { useEffect } from 'react';
import CartItemsList from '../CartComponents/CartItem';
import CartOverview from '../CartComponents/CartOverview';
import { useCartItems } from '../../contexts/CartItemContext';
import { useToken } from '../../contexts/UserTokenContext';

const Cart = () => {
  const { cartItems, refreshCart } = useCartItems();
  const { accessToken } = useToken();

  useEffect(() => {
    const interval = setInterval(() => {
      refreshCart();
    }, 1000); // Refresh cart every 1 second
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <div className="flex-none lg:w-3/4">
        <CartItemsList token={accessToken} items={cartItems} updateCart={refreshCart} />
      </div>
      
      <div className="flex-none lg:w-1/4"> 
        <CartOverview items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;