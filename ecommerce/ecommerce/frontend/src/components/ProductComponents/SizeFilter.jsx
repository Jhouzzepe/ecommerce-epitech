import React, { useState } from 'react';

const SizeFilter = ({ selectedSize, onSizeClick }) => {
  const [showSizeFilter, setShowSizeFilter] = useState(false);

  const handleSizeClick = (size) => {
    onSizeClick(size);
    setShowSizeFilter(false);
  };

  return (
    <div className="mt-3 relative">
        <button
            onClick={() => setShowSizeFilter(!showSizeFilter)}
            className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md text-gray-800 w-full md:w-3/4 border-2 border-black
        ">
            Sélectionner votre taille {selectedSize && ` :  ${selectedSize}`}
            <i className="fas fa-angle-down pl-3 text-stone-700"></i>
        </button>
        {showSizeFilter && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg" style={{ width:'16%' }}>
                <ul className="text-gray-700">
                    {['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map((size) => (
                        <li key={size}>
                            <button
                                onClick={() => handleSizeClick(size)}
                                className={`block px-4 py-2 w-full text-left ${selectedSize === size ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
                            >
                                {size}
                                {selectedSize === size && (
                                    <i className="fas fa-check text-green-500 ml-2"></i>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  );
};

export default SizeFilter;