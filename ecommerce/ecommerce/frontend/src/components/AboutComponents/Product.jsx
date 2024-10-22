import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from '../../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 100,
  });
  const [sort, setSort] = useState("none");
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    api.get('/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const filteredProducts = products
    .filter(
      (product) =>
        product.price >= filter.minPrice &&
        product.price <= filter.maxPrice &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "asc") {
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      } else if (sort === "desc") {
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      } else {
        return 0;
      }
    });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4 bg-red-200">
        <div className="mb-4">
          <h2 className="font-bold mb-2">Filtres</h2>
          <label>
            Prix minimum:
            <input
              type="number"
              name="minPrice"
              value={filter.minPrice}
              onChange={handleFilterChange}
              className="ml-2 p-1 border border-gray-400"
            />
          </label>
          <label className="mt-4 block">
            Prix maximum:
            <input
              type="number"
              name="maxPrice"
              value={filter.maxPrice}
              onChange={handleFilterChange}
              className="ml-2 p-1 border border-gray-400"
            />
          </label>
        </div>
      </div>

      <div className="w-3/4 p-4">
        <div className="mb-4">
          <label>
            Trier par date:
            <select
              value={sort}
              onChange={handleSortChange}
              className="ml-2 p-1 border border-gray-400"
            >
              <option value="none">Aucun</option>
              <option value="asc">Croissant</option>
              <option value="desc">Décroissant</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex-none w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-700">Prix: {product.price}€</p>
                  <p className="text-gray-700">
                    Date de sortie: {product.releaseDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
