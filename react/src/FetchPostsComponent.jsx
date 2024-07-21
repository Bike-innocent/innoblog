import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import Loader from './components/Loader';

const FetchPostsComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/posts')
      .then(response => {
        setPosts(response.data.posts || []); // Assume response.data.posts is correct
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-semibold">Loading...</p>
         
        </div>
      ) : (
        <div className="flex flex-wrap -mx-2">
            <h2 className="text-2xl font-semibold mb-2">My Posts</h2>
          {posts.map(post => (
            <div key={post.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
              <div className="bg-white p-4 rounded shadow-md h-full">
                <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded mb-4"/>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FetchPostsComponent;
