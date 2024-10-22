import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import ProductList from '../ProductComponents/Product';

const CategoryProduct = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categoryId) {
      api.get(`/category-products/${categoryId}/products/`)
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the products!', error);
        });
    }
  }, [categoryId]);

  return (
    <div className="min-h-screen w-full bg-[#F4F4F4] flex flex-col">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center p-4">
        Produits de la catégorie
      </h1>
      <div className="flex flex-col lg:flex-row gap-4 px-4 lg:px-8 flex-1">
        <div className="w-full lg:w-3/4 xl:w-4/5">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
