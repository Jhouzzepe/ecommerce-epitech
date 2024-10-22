import React from "react";

function ProductFilters({ filter, onFilterChange, sort, onSortChange }) {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filter,
      [name]: Number(value),
    });
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="w-full p-4 md:p-6 bg-white shadow-md rounded-lg border border-gray-300">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtres</h2>
        <label className="block mb-4 text-gray-600">
          Prix minimum:
          <input
            type="number"
            name="minPrice"
            value={filter.minPrice}
            onChange={handleFilterChange}
            className="mt-1 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out w-full"
          />
        </label>
        <label className="block text-gray-600">
          Prix maximum:
          <input
            type="number"
            name="maxPrice"
            value={filter.maxPrice}
            onChange={handleFilterChange}
            className="mt-1 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out w-full"
          />
        </label>
      </div>
      <div>
        <label className="block text-gray-600">
          Trier par date:
          <select
            value={sort}
            onChange={handleSortChange}
            className="mt-1 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out appearance-none bg-white w-full"
          >
            <option value="none">Aucun</option>
            <option value="asc">Croissant</option>
            <option value="desc">Décroissant</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default ProductFilters;
