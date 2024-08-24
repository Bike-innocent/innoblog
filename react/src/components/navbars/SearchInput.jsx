import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'; // Import the search icon
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-full">
      <input
        type="text"
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-96 bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-4 py-2 pl-10 rounded-md shadow-md outline-none focus:ring-2 focus:ring-blue-500 transition-width duration-300 ease-in-out"
      />
      <button type="submit" className="absolute left-2 text-gray-600 dark:text-gray-300">
        <AiOutlineSearch className="text-xl" />
      </button>
    </form>
  );
};

export default SearchInput;
