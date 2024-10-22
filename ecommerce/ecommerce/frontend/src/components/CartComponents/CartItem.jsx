import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Notification from '../MainComponents/Notifications';

const BASE_IMAGE_URL = "http://localhost:8000/";

const CartItemsList = ({ token, items }) => {
  return (
    <div className="w-full lg:w-2/3 flex flex-col h-fit gap-4 p-4">
      <p className="text-blue-900 text-xl font-extrabold">Mon panier</p>
      {items.map((item) => (
        <CartItem token={token} key={item.id} item={item} />
      ))}
    </div>
  );
};

const CartItem = ({ token, item }) => {
  const { id, name, price, description, image, size, color, stock } = item.product;
  const [quantity, setQuantity] = useState(item.quantity);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const updateQuantity = async (newQuantity) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/cart/update/${id}/`,
        { quantity: newQuantity },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setQuantity(newQuantity);
        setNotification({ message: 'Quantité mise à jour avec succès', type: 'success' });
      }
    } catch (error) {
      setNotification({ message: 'Erreur lors de la mise à jour de la quantité', type: 'error' });
    }
  };

  const handleRemove = async () => {
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?');
  
    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/cart/remove/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 204) {
          setNotification({ message: 'Article supprimé avec succès', type: 'success' });
          window.location.reload();  // Rechargez la page pour mettre à jour la liste du panier
        }
      } catch (error) {
        setNotification({ message: 'Erreur lors de la suppression', type: 'error' });
      }
    } else {
      setNotification({ message: 'Suppression annulée', type: 'info' });
    }
  };

  const handleQuantityChange = (action) => {
    let newQuantity = quantity;
    if (action === 'increase' && newQuantity < stock) {
      newQuantity += 1;
    } else if (action === 'decrease') {
      if (newQuantity === 1) {
        const isConfirmed = window.confirm('La quantité est 1. Voulez-vous supprimer ce produit?');
        if (isConfirmed) {
          handleRemove();
        }
        return;
      }
      newQuantity -= 1;
    }
    if (newQuantity !== quantity) {
      updateQuantity(newQuantity);
    } else if (action === 'increase' && newQuantity >= stock) {
      setNotification({ message: `Vous ne pouvez pas ajouter plus que ${stock} articles de ce produit.`, type: 'info' });
    }
  };

  return (
    <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">
      <div className="flex flex-col sm:flex-row items-center sm:items-start w-full">
        <div className="w-full sm:w-1/3 flex justify-center items-center mb-4 sm:mb-0">
          <div className="w-40 h-40 flex justify-center items-center bg-gray-200 sm:rounded-none rounded-lg">
            {image ? (
              <img
                className="w-full h-full object-cover sm:rounded-none rounded-lg"
                src={`${BASE_IMAGE_URL}${image}`}
                alt={name}
              />
            ) : (
              <p className="text-gray-500">Image non disponible</p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-2/3 sm:ml-8 gap-2">
          <Link
            to={`/product/${id}`}
            className="text-lg text-gray-800 font-semibold hover:underline break-words"
          >
            {name}
          </Link>
          <p className="text-xs text-gray-600 font-semibold line-clamp-2 break-words">
            Description: <span className="font-normal">{description}</span>
          </p>
          <p className="text-xs text-gray-600 font-semibold break-words">
            Taille: <span className="font-normal">{size}</span>
          </p>
          <p className="text-xs text-gray-600 font-semibold break-words">
            Couleur: <span className="font-normal">{color}</span>
          </p>
          <p className="text-gray-800 font-normal text-xl">{price}€</p>
          <QuantityControl quantity={quantity} onQuantityChange={handleQuantityChange} />
        </div>
        <div className="flex justify-center sm:justify-end mt-4 sm:mt-0 lg:self-start lg:ml-auto">
          <RemoveButton token={token} id={id} handleRemove={handleRemove} />
        </div>
      </div>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
    </div>
  );
};

const QuantityControl = ({ quantity, onQuantityChange }) => (
  <div className="flex items-center">
    <button
      onClick={() => onQuantityChange('decrease')}
      className="w-5 h-5 rounded-full border border-gray-300 flex justify-center items-center mr-2"
      aria-label="Decrease quantity"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d1d5db"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
      </svg>
    </button>
    <input
      type="text"
      readOnly
      value={quantity}
      className="w-8 h-8 text-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm mx-2"
    />
    <button
      onClick={() => onQuantityChange('increase')}
      className="w-5 h-5 rounded-full border border-gray-300 flex justify-center items-center ml-2"
      aria-label="Increase quantity"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill=""
        stroke="#9ca3af"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </button>
  </div>
);

const RemoveButton = ({ token, id, handleRemove }) => (
  <button
    className="w-8 h-8 rounded-full flex justify-center items-center text-red-500"
    aria-label="Remove item from cart"
    onClick={handleRemove}
  >
    <svg
      height="24px"
      width="24px"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9l0,0.4v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4l0-0.4L147.7,128h217.2L341.6,417.9z" />
        <g>
          <rect height="241" width="14" x="249" y="160" />
          <polygon points="320,160 305.4,160 294.7,401 309.3,401" />
          <polygon points="206.5,160 192,160 202.7,401 217.3,401" />
        </g>
      </g>
    </svg>
  </button>
);

export default CartItemsList;