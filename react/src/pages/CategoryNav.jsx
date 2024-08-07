import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import axiosInstance from '../axiosInstance'; // Adjust the path according to your project structure

const CategoryNav = () => {
  const [categories, setCategories] = useState([]);
  const tabListRef = useRef(null);

  useEffect(() => {
    // Fetch categories from the Laravel backend using the Axios instance
    axiosInstance.get('/categories')
      .then(response => {
        console.log("Categories fetched: ", response.data); // Debug log
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  const scrollLeft = () => {
    if (tabListRef.current) {
      tabListRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tabListRef.current) {
      tabListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-10 bg-white p-2 shadow-md rounded-full"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <div className="overflow-hidden whitespace-nowrap">
        <Tab.Group>
          <Tab.List ref={tabListRef} className="flex space-x-4 overflow-x-auto scrollbar-hide px-10">
            <Tab className="focus:outline-none">
              {({ selected }) => (
                <Link
                  to="/"
                  className={`whitespace-nowrap px-3 py-2 ${selected ? 'border-b-2 border-blue-500 text-blue-500 font-bold' : ''}`}
                >
                  All
                </Link>
              )}
            </Tab>
            {categories.map(category => (
              <Tab key={category.id} className="focus:outline-none">
                {({ selected }) => (
                  <Link
                    to={`/category/${category.slug}`}
                    className={`whitespace-nowrap px-3 py-2 ${selected ? 'border-b-2 border-blue-500 text-blue-500 font-bold' : ''}`}
                  >
                    {category.name}
                  </Link>
                )}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 z-10 bg-white p-2 shadow-md rounded-full"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CategoryNav;
