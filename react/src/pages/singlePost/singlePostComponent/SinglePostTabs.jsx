import React from 'react';
import { Tab } from '@headlessui/react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { useQuery } from '@tanstack/react-query';

const fetchLatestPosts = async () => {
  const response = await axiosInstance.get('blog/latest');
  return response.data.latestpost || [];
};

const fetchPopularPosts = async () => {
  const response = await axiosInstance.get('blog/popular');
  return response.data.popularpost || [];
};

function SinglePostTabs() {
  const {
    data: latestPosts = [],
    isLoading: latestLoading,
    isError: latestError,
    error: latestErrorMessage,
  } = useQuery({
    queryKey: ['latestPosts'],
    queryFn: fetchLatestPosts,
  });

  const {
    data: popularPosts = [],
    isLoading: popularLoading,
    isError: popularError,
    error: popularErrorMessage,
  } = useQuery({
    queryKey: ['popularPosts'],
    queryFn: fetchPopularPosts,
  });

  return (
    <Tab.Group>
      <Tab.List className="flex p-1 space-x-1">
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
              : 'w-full py-2.5 text-sm leading-5 font-medium border-b-2'
          }
        >
          Popular
        </Tab>
      </Tab.List>
      <Tab.Panels className="mt-2">
        <Tab.Panel key="latest" className="bg-white rounded-xl p-3">
          {latestLoading && <div>Loading...</div>}
          {latestError && <div>Error fetching latest posts: {latestErrorMessage.message}</div>}
          {!latestLoading && !latestError && latestPosts.map((post) => (
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
          {popularLoading && <div>Loading...</div>}
          {popularError && <div>Error fetching popular posts: {popularErrorMessage.message}</div>}
          {!popularLoading && !popularError && popularPosts.map((post) => (
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
