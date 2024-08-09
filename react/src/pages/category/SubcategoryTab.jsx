import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import axiosInstance from '../../../axiosInstance';
import Post from './Post';
import HeaderSection from './HeaderSection';
import { Skeleton } from '@nextui-org/react';

const SubcategoryTab = ({ selectedCategory }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [mixedPosts, setMixedPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  // Effect to fetch subcategories and reset states when selectedCategory changes
  useEffect(() => {
    if (!selectedCategory) {
      setSubcategories([]);
      setActiveTab('home');
      setMixedPosts([]);  // Clear mixed posts when no category is selected
      setPosts([]);       // Clear posts when no category is selected
      setLoading(false);  // Stop loading when no category is selected
      return;
    }

    const fetchSubcategories = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/categories/${selectedCategory}/subcategories`);
        setSubcategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setError('Failed to fetch subcategories');
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  // Effect to fetch mixed posts when activeTab is 'home' and selectedCategory changes
  useEffect(() => {
    if (activeTab === 'home') {
      const fetchMixedPosts = async () => {
        if (!selectedCategory) return;  // Avoid making a request with a null category

        try {
          const response = await axiosInstance.get(`/categories/${selectedCategory}/mixed-posts`);
          setMixedPosts(response.data.data || []);
        } catch (error) {
          console.error('Error fetching mixed posts:', error);
          setError('Failed to fetch mixed posts');
        }
      };

      fetchMixedPosts();
    }
  }, [selectedCategory, activeTab]);

  // Effect to fetch posts by subcategory when activeTab changes and it's not 'home'
  useEffect(() => {
    if (activeTab !== 'home') {
        const fetchPosts = async () => {
            if (!selectedCategory) return; 
        
            try {
                const response = await axiosInstance.get(`/categories/${selectedCategory}/subcategories/${activeTab}/posts`);
                setPosts(response.data.data || []);
            } catch (error) {
                console.error('Error fetching posts:', error);
                if (error.response && error.response.status === 404) {
                    setError('Subcategory not found.');
                } else {
                    setError('Failed to fetch posts.');
                }
            }
        };
        

      fetchPosts();
    }
  }, [selectedCategory, activeTab]);

  if (!selectedCategory) {
    return (
      <div className="container mx-auto my-4">
        <HeaderSection/>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto my-4" data-aos="fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="w-full group">
              <div className="block">
                <Skeleton className="w-full h-[180px] md:h-[250px] object-cover rounded-lg" />
                <div className="flex pt-2">
                  <div className="w-1/5">
                    <Skeleton className="w-10 h-10 rounded-full" />
                  </div>
                  <div className="flex flex-col pl-2 w-full">
                    <Skeleton className="h-5 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4 mt-1 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
    <div className="container mx-auto">
      <Tab.Group>
        <Tab.List className="flex space-x-2 border-b">
          <Tab
            as="button"
            className={({ selected }) =>
              selected
                ? 'px-4 py-2 text-lg font-semibold text-blue-800 border-b-2 border-blue-800'
                : 'px-4 py-2 text-lg font-semibold text-blue-600 hover:text-blue-800'
            }
            onClick={() => setActiveTab('home')}
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
              onClick={() => setActiveTab(subcategory.slug)}
            >
              {subcategory.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            {activeTab === 'home' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                  {mixedPosts.length > 0 ? (
                    mixedPosts.map((post) => (
                      <Post key={post.slug} post={post} />
                    ))
                  ) : (
                    <p>No posts available.</p>
                  )}
                </div>
              </div>
            )}
          </Tab.Panel>

          {subcategories.map((subcategory) => (
            <Tab.Panel key={subcategory.id}>
              {activeTab === subcategory.slug && (
                <div>
                  <p>Posts for {subcategory.name} will be displayed here.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                    {posts.length > 0 ? (
                      posts.map((post) => (
                        <Post key={post.slug} post={post} />
                      ))
                    ) : (
                      <p>No posts available.</p>
                    )}
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

export default SubcategoryTab;
