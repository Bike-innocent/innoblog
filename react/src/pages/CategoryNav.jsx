import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from '@nextui-org/react';
import axiosInstance from '../axiosInstance'; // Adjust the path according to your project structure

const CategoryNav = () => {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="overflow-x-auto whitespace-nowrap ">
      <Tabs>
        {categories.map(category => (
          <Tab
            key={category.id}
            title={
              <Link to={`/category/${category.slug}`}>
                {category.name}
              </Link>
            }
            className="whitespace-nowrap"
          >
            {/* Empty div to ensure only the tabs are scrollable */}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default CategoryNav;
