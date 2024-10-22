import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/outline';

function ProductList({ products }) {
  // Base URL pour les images
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8000"; // Remplacez par l'URL de votre API

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4">
      <ul className="space-y-8">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
          >
            <div className="relative w-full md:w-64 flex-shrink-0">
              <img
                src={product.image ? `${baseUrl}${product.image}` : "https://via.placeholder.com/250?text=Image"}
                alt={product.name}
                className="w-full h-72 object-cover" // Hauteur augmentée à 18rem
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h2 className="text-xl font-semibold text-[#2E4033] mb-2">
                <Link
                  to={`/product/${product.id}`}
                  className="hover:text-[#A88030] transition-colors"
                >
                  {product.name}
                </Link>
              </h2>
              <p className="text-[#555] mb-2 text-sm line-clamp-3">
                {product.description}
              </p>
              <p className="text-sm text-[#555] mb-2">
                Stock: {product.stock}
              </p>
              <p className="text-lg font-bold text-red-600 text-right mb-3">
                {parseFloat(product.price).toFixed(2)} €
              </p>
              <div className="flex flex-wrap space-x-2 mt-4">
                <Link
                  to={`/product/${product.id}`}
                  className="flex items-center justify-center px-3 py-2 bg-[#2E4033] text-white rounded-lg shadow-md hover:bg-[#A88030] transition-colors text-sm flex-shrink-0 w-full md:w-auto mb-2 md:mb-0"
                >
                  <EyeIcon className="w-5 h-5 mr-2" />
                  Voir les détails
                </Link>
                <button
                  onClick={() => alert(`Ajouté au panier: ${product.name}`)}
                  className="flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm flex-shrink-0 w-full md:w-auto"
                >
                  <ShoppingCartIcon className="w-5 h-5 mr-2" />
                  Ajouter au panier
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
