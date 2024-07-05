import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/posts');
        setPosts(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div className="text-red-500">Error fetching posts: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Posts List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Image</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{post.title}</td>
                <td className="px-4 py-2 border-b">{post.description}</td>
                <td className="px-4 py-2 border-b">
                  <img src={post.image} alt={post.title} className="w-20 h-20 object-cover" />
                </td>
                <td className="px-4 py-2 border-b">{post.category || 'N/A'}</td>
                <td className="px-4 py-2 border-b">{post.status ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostsList;
