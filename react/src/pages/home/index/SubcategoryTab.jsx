import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../axiosInstance';
import Post from './Post';
import HeaderSection from './HeaderSection';
import { Skeleton } from '@nextui-org/react';

// Function to fetch posts based on the active tab
const fetchPosts = async ({ queryKey }) => {
  const { selectedCategory, activeTab } = queryKey[1];

  // Ensure the category and tab are valid before making the request
  if (!selectedCategory) {
    throw new Error('Selected category is invalid.');
  }

  try {
    if (activeTab === 'home') {
      const response = await axiosInstance.get(`/categories/${selectedCategory}/mixed-posts`);
      return response.data.data || [];
    } else {
      const response = await axiosInstance.get(`/subcategories/${activeTab}/posts`);
      return response.data.data || [];
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

const SubcategoryTab = ({ selectedCategory, subcategories }) => {
  const [activeTab, setActiveTab] = useState('home');

  // Reset activeTab to 'home' when a new category is selected
  useEffect(() => {
    setActiveTab('home');
  }, [selectedCategory]);

  // Use React Query to fetch posts
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['posts', { selectedCategory, activeTab }],
    queryFn: fetchPosts,
  });

  if (!selectedCategory) {
    return (
      <div className="container mx-auto my-4">
        <HeaderSection />
      </div>
    );
  }

  if (isLoading) {
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
        <div className="text-xl font-bold text-red-500">Failed to fetch posts.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto ">
      <Tab.Group
        as="div"
        selectedIndex={subcategories.findIndex(sub => sub.slug === activeTab) + 1}
        onChange={(index) => {
          if (index === 0) {
            setActiveTab('home');
          } else {
            setActiveTab(subcategories[index - 1].slug);
          }
        }}
      >
        <Tab.List className="flex  overflow-x-auto scrollbar-hide my-categorytab whitespace-nowrap">
          <Tab
            as="button"
            className={({ selected }) =>
              selected
                ? 'px-4 py-2 text-lg font-semibold focus:outline-none text-blue-800 border-b-2 border-blue-800'
                : 'px-4 py-2 text-lg font-semibold text-blue-600 hover:text-blue-800 outline-none focus:outline-none border-none'
            }
          >
            Home
          </Tab>

          {subcategories.map((subcategory) => (
            <Tab
              key={subcategory.id}
              as="button"
              className={({ selected }) =>
                selected
                  ? 'px-4 py-2 text-lg font-semibold focus:outline-none text-blue-800 border-b-2 border-blue-800'
                  : 'px-4 py-2 text-lg font-semibold hover:border-gray-400 hover:border-b-1  text-blue-600 hover:text-blue-800 outline-none focus:outline-none border-none'
              }
            >
              {subcategory.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </Tab.Panel>

          {subcategories.map((subcategory) => (
            <Tab.Panel key={subcategory.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SubcategoryTab;
