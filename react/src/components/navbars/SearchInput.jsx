import React, { useState, useRef } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => inputRef.current.focus(), 0);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      {/* Search Icon (visible on small screens) */}
      <button
        onClick={toggleSearch}
        className={`text-gray-600 dark:text-gray-300 md:hidden ${
          isSearchOpen ? 'hidden' : 'block'
        }`}
      >
        <AiOutlineSearch className="text-2xl" />
      </button>

      {/* Search Input */}
      <form
        onSubmit={handleSearch}
        className={`${
          isSearchOpen ? 'flex' : 'hidden'
        } md:flex absolute md:relative inset-0 md:inset-auto w-full items-center justify-center`}
        style={{ zIndex: isSearchOpen ? 50 : 'auto' }}
      >
        <div className="relative w-full md:max-w-lg lg:max-w-xl">
          <input
            type="text"
            ref={inputRef}
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-10 py-2 rounded-md shadow-md outline-none focus:ring-2 focus:ring-blue-500 transition-width duration-300 ease-in-out"
          />
          {/* Search Icon inside Input for Larger Screens */}
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
          >
            <AiOutlineSearch className="text-xl" />
          </button>
        </div>
        {/* Close Icon (visible when the search input is open on mobile) */}
        {isSearchOpen && (
          <button
            type="button"
            onClick={closeSearch}
            className="absolute right-2 text-gray-600 dark:text-gray-300 md:hidden"
          >
            <AiOutlineClose className="text-xl" />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchInput;
