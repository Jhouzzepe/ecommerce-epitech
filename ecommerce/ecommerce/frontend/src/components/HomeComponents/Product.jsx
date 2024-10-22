import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import ProductReview from "../ProductReview";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div className="w-3/4 p-4">
      <h1 className="text-2xl font-bold mb-4">Liste de Produits</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-4 border rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-xl font-semibold">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h2>
            <p className="text-gray-700">Prix: ${product.price}</p>
            <p className="text-gray-500">
              Date de sortie: {product.releaseDate}
            </p>
          </li>
        ))}
          <ProductReview />
      </ul>
    </div>
  );
}

export default ProductList;
