import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border border-gray-300 rounded-lg overflow-hidden max-w-md mx-auto"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher..."
        className="flex-1 p-2 border-none outline-none text-black"
      />
      <button
        type="submit"
        className="p-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
      >
        <FiSearch size={20} className="text-gray-600" />
      </button>
    </form>
  );
}

export default SearchBar;
