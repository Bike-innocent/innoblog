import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';

const SinglePostHeaderSection = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/blog/show/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
  };

  return (
    <div className="container mx-auto ">
      <div className="bg-white rounded-lg ">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="relative">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-4" 
          />
          <div className="absolute -top-[30px] right-2 text-black text-opacity-20 text-sm p-1 rounded">
            {formatDate(post.created_at)}
          </div>
        </div>
        <p className="text-gray-700">{post.description}</p>
      </div>
    </div>
  );
};

export default SinglePostHeaderSection;
