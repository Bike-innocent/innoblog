import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import axiosInstance from '../../axiosInstance';
import Post from './Post';

const CategoryHome = () => {
  const { categorySlug, subcategorySlug } = useParams();
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(subcategorySlug || 'home');
  const [mixedPosts, setMixedPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axiosInstance.get(`/categories/${categorySlug}/subcategories`);
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
        setMixedPosts(response.data.data || []);
      } catch (error) {
        console.error('Error fetching mixed posts:', error);
        setError('Failed to fetch mixed posts');
      }
    };

    if (activeTab === 'home') {
      fetchMixedPosts();
    }
  }, [categorySlug, activeTab]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`/categories/${categorySlug}/subcategories/${activeTab}`);
        setPosts(response.data.data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts');
      }
    };

    if (activeTab !== 'home') {
      fetchPosts();
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
      <Tab.Group>
        <Tab.List className="flex space-x-2 border-b">
          <Tab
            as="button"
            className={({ selected }) =>
              selected
                ? 'px-4 py-2 text-lg font-semibold text-blue-800 border-b-2 border-blue-800'
                : 'px-4 py-2 text-lg font-semibold text-blue-600 hover:text-blue-800'
            }
            onClick={() => {
              setActiveTab('home');
              navigate(`/categories/${categorySlug}`);
            }}
          >
            Home
          </Tab>

          {subcategories.map((subcategory) => (
            <Tab
              key={subcategory.id}
              as="button"
              className={({ selected }) =>
                selected
                  ? 'px-4 py-2 text-lg font-semibold text-blue-800 border-b-2 border-blue-800'
                  : 'px-4 py-2 text-lg font-semibold text-blue-600 hover:text-blue-800'
              }
              onClick={() => {
                setActiveTab(subcategory.slug);
                navigate(`/categories/${categorySlug}/subcategories/${subcategory.slug}`);
              }}
            >
              {subcategory.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            {activeTab === 'home' && (
              <div>
                <p>Mixed posts from the parent category will be displayed here.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-0">
                  {mixedPosts.map((post) => (
                    <Post key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}
          </Tab.Panel>

          {subcategories.map((subcategory) => (
            <Tab.Panel key={subcategory.id}>
              {activeTab === subcategory.slug && (
                <div>
                  <p>Posts for {subcategory.name} will be displayed here.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-0">
                    {posts.map((post) => (
                      <Post key={post.slug} post={post} />
                    ))}
                  </div>
                </div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CategoryHome;
