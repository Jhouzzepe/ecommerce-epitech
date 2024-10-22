import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductFilters from "../ProductComponents/Filter";
import ProductList from "../ProductComponents/Product";
import { useProducts } from "../../contexts/ProductContext";

const Product = () => {
  const { products } = useProducts();

  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 1000,
  });

  const [sort, setSort] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchTerm(search.toLowerCase());
    }
  }, [location.search]);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(product => parseFloat(product.price));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setFilter({ minPrice, maxPrice });
    }
  }, [products]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const filteredProducts = products
    .filter(
      (product) =>
        parseFloat(product.price) >= filter.minPrice &&
        parseFloat(product.price) <= filter.maxPrice &&
        product.name.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sort === "asc") {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sort === "desc") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else {
        return 0;
      }
    });

  return (
    <div className="min-h-screen w-full bg-[#F4F4F4] flex flex-col pb-12
    ">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center py-8">
        Découvrez Nos Produits
      </h1>
      <div className="flex flex-col lg:flex-row gap-4 px-4 lg:px-8 flex-1">
        <div className="w-full lg:w-1/4 xl:w-1/5 lg:pr-4">
          <ProductFilters
            filter={filter}
            onFilterChange={handleFilterChange}
            sort={sort}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="w-full lg:w-3/4 xl:w-4/5">
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Product;
