import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Tab } from '@nextui-org/react';
import axiosInstance from '../axiosInstance';

const CategoryHome = () => {
  const { categorySlug, subcategorySlug } = useParams();
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(subcategorySlug || 'home');
  const [mixedPosts, setMixedPosts] = useState([]);

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

  useEffect(() => {
    const fetchMixedPosts = async () => {
      try {
        const response = await axiosInstance.get(`/categories/${categorySlug}/mixed-posts`);
        console.log('Mixed posts response:', response);
        setMixedPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching mixed posts:', error);
        setError('Failed to fetch mixed posts');
      }
    };

    if (activeTab === 'home') {
      fetchMixedPosts();
    }
  }, [categorySlug, activeTab]);

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
              <div
                onClick={() => {
                  setActiveTab('home');
                  navigate(`/category/${categorySlug}`);
                }}
                className={`text-lg font-semibold ${activeTab === 'home' ? 'text-blue-800' : 'text-blue-600 hover:text-blue-800'}`}
              >
                Home
              </div>
            }
            className={`whitespace-nowrap ${activeTab === 'home' ? 'border-b-2 border-blue-800' : ''}`}
          >
            {activeTab === 'home' && (
              <div>
                {/* Content for Home tab */}
                <p>Mixed posts from the parent category will be displayed here.</p>
                {/* Display mixed posts */}
                <div>
                  {mixedPosts.map(post => (
                    <div key={post.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img
                   src={post.image}
                   alt={post.title}
                   className="w-full h-64 md:h-96 object-cover rounded-lg mb-4"
                 />
                   <h3 className="text-lg font-semibold">{post.title}</h3>
                   <p className="mt-2 text-gray-600">{post.content}</p>
                 </div>
                  ))}
                </div>
              </div>
            )}
          </Tab>

          {/* Dynamic Subcategory Tabs */}
          {subcategories.map((subcategory) => (
            <Tab
              key={subcategory.id}
              title={
                <div
                  onClick={() => {
                    setActiveTab(subcategory.slug);
                    navigate(`/categories/${categorySlug}/subcategories/${subcategory.slug}`);
                  }}
                  className={`text-lg font-semibold ${activeTab === subcategory.slug ? 'text-blue-800' : 'text-blue-600 hover:text-blue-800'}`}
                >
                  {subcategory.name}
                </div>
              }
              className={`whitespace-nowrap ${activeTab === subcategory.slug ? 'border-b-2 border-blue-800' : ''}`}
            >
              {activeTab === subcategory.slug && (
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
