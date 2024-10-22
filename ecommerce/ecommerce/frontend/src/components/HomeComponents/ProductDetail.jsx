import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/products/${productId}/`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
        setError('Produit non trouvé');
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={product.image || `https://via.placeholder.com/600x400?text=${product.name}`}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
          <div className="mb-4">
            <p className="text-xl font-semibold text-gray-900">Prix: ${product.price}</p>
            <p className="text-sm text-gray-500">Date de sortie: {product.releaseDate}</p>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            {product.description}
          </p>
          <div className="mt-6">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
