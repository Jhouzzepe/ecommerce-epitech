import React from 'react';

const QuantitySelector = ({ quantity, setQuantity }) => {
  const increment = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div>
      <label className="text-gray-700 text-sm" htmlFor="count">Quantité :</label>
      <div className="flex items-center mt-1">
        <button onClick={decrement} className="text-gray-500 focus:outline-none focus:text-gray-600
        ">
          <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
        <span className="text-gray-700 text-lg mx-2">{quantity}</span>
        <button onClick={increment} className="text-gray-500 focus:outline-none focus:text-gray-600">
          <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
