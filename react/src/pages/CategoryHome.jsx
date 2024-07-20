import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Tab } from '@nextui-org/react';
import axiosInstance from '../axiosInstance';

const CategoryHome = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('home'); // Set 'home' as the default active tab

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axiosInstance.get(`/categories/${categorySlug}/subcategories`);
        console.log('Subcategories response:', response);
        if (Array.isArray(response.data)) {
          setSubcategories(response.data);
        } else {
          setError('Unexpected response format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setError('Failed to fetch subcategories');
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto whitespace-nowrap">
        <Tabs>
          {/* Manual 'Home' Tab */}
          <Tab
            key="home"
            title={
              <button
                onClick={() => setActiveTab('home')}
                className={`text-lg font-semibold ${activeTab === 'home' ? 'text-blue-800' : 'text-blue-600 hover:text-blue-800'}`}
              >
                Home
              </button>
            }
            className={`whitespace-nowrap ${activeTab === 'home' ? 'border-b-2 border-blue-800' : ''}`}
          >
            {activeTab === 'home' && (
              <div>
                {/* Content for Home tab */}
                <p>Mixed posts from the parent category will be displayed here.</p>
                {/* Add logic to fetch and display mixed posts */}
              </div>
            )}
          </Tab>
          
          {/* Dynamic Subcategory Tabs */}
          {subcategories.map((subcategory) => (
            <Tab
              key={subcategory.id}
              title={
                <button
                  onClick={() => {
                    setActiveTab(subcategory.id);
                    navigate(`/categories/${categorySlug}/subcategories/${subcategory.slug}`);
                  }}
                  className={`text-lg font-semibold ${activeTab === subcategory.id ? 'text-blue-800' : 'text-blue-600 hover:text-blue-800'}`}
                >
                  {subcategory.name}
                </button>
              }
              className={`whitespace-nowrap ${activeTab === subcategory.id ? 'border-b-2 border-blue-800' : ''}`}
            >
              {activeTab === subcategory.id && (
                <div>
                  {/* Content for subcategory tab */}
                  <p>Posts for {subcategory.name} will be displayed here.</p>
                  {/* Add logic to fetch and display posts for the subcategory */}
                </div>
              )}
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default CategoryHome;
