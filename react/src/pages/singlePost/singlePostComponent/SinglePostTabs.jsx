import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';

function SinglePostTabs() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const latestResponse = await axiosInstance.get('blog/latest');
        setLatestPosts(latestResponse.data.latestpost || []); // Ensure latestpost is defined

        const popularResponse = await axiosInstance.get('blog/popular');
        setPopularPosts(popularResponse.data.popularpost || []); // Ensure popularpost is defined
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Tab.Group>
      <Tab.List className="flex p-1 space-x-1 ">
        <Tab
          key="latest"
          className={({ selected }) =>
            selected
              ? 'w-full py-2.5 text-sm leading-5 font-medium border-b-2 border-blue-500'
              : 'w-full py-2.5 text-sm leading-5 font-medium border-b-2'
          }
        >
          Latest
        </Tab>
        <Tab
          key="popular"
          className={({ selected }) =>
            selected
              ? 'w-full py-2.5 text-sm leading-5 font-medium border-b-2 border-blue-500'
              : 'w-full py-2.5 text-sm leading-5 font-medium border-b-2 '
          }
        >
          Popular
        </Tab>
      </Tab.List>
      <Tab.Panels className="mt-2">
        <Tab.Panel key="latest" className="bg-white rounded-xl p-3">
          {latestPosts.map((post) => (
            <Link to={`/posts/${post.id}`} key={post.id} className="block border-b pb-4 mb-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="text-gray-500 text-sm">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                  </div>
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  {post.user && (
                    <div className="text-gray-700 text-sm">{post.user.name}</div>
                  )}
                </div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-24 h-16 object-cover rounded-lg ml-4"
                />
              </div>
            </Link>
          ))}
        </Tab.Panel>
        <Tab.Panel key="popular" className="bg-white rounded-xl p-3">
          {popularPosts.map((post) => (
            <Link to={`/posts/${post.id}`} key={post.id} className="block border-b pb-4 mb-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="text-gray-500 text-sm">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                  </div>
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  {post.user && (
                    <div className="text-gray-700 text-sm">{post.user.name}</div>
                  )}
                </div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-24 h-16 object-cover rounded-lg ml-4"
                />
              </div>
            </Link>
          ))}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default SinglePostTabs;
