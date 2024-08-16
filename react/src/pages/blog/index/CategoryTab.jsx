import React, { useRef } from 'react';
import { Tab } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../axiosInstance'; // Adjust the path according to your project structure

// Function to fetch categories
const fetchCategories = async () => {
  const response = await axiosInstance.get('/categories');
  return response.data;
};

const CategoryTab = ({ onSelectCategory }) => {
  const tabListRef = useRef(null);

  // Use React Query to fetch categories
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const scrollLeft = () => {
    if (tabListRef.current) {
      tabListRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tabListRef.current) {
      tabListRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleCategorySelect = async (category) => {
    if (!category) {
      onSelectCategory(null, []);
      return;
    }

    try {
      const response = await axiosInstance.get(`/categories/${category.slug}/subcategories`);
      onSelectCategory(category.slug, response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      onSelectCategory(category.slug, []);
    }
  };

  if (isLoading) {
    return <div></div>; // You can replace this with a loader component
  }

  if (error) {
    return <div>Error loading categories.</div>;
  }

  return (
    <div className="relative my-categorytab">
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-10 bg-white p-2 shadow-md rounded-full hidden sm:flex"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <div className="overflow-hidden whitespace-nowrap flex-grow px-8">
        <Tab.Group>
          <Tab.List ref={tabListRef} className="flex space-x-4 overflow-x-auto scrollbar-hide">
            <Tab>
              {({ selected }) => (
                <div
                  onClick={() => handleCategorySelect(null)}
                  className={`whitespace-nowrap px-3 py-2 cursor-pointer ${selected ? 'border-b-2 border-blue-500 text-blue-500 font-bold' : ''}`}
                >
                  All
                </div>
              )}
            </Tab>
            {categories.map((category) => (
              <Tab key={category.id}>
                {({ selected }) => (
                  <div
                    onClick={() => handleCategorySelect(category)}
                    className={`whitespace-nowrap focus:outline-none px-3 py-2 cursor-pointer ${selected ? 'border-b-2 border-blue-500 text-blue-500 focus:outline-none font-bold' : 'outline-none focus:outline-none border-none'}`}
                  >
                    {category.name}
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 z-10 bg-white p-2 shadow-md rounded-full hidden sm:flex"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CategoryTab;
