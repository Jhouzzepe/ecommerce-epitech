


// Fichier temporaire 





import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <li>
      <h2>{product.name}</h2>
      <p>{product.price}€</p>
    </li>
  );
};

export default ProductItem;
