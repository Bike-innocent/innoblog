import React from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Skeleton, Container, Text } from '@nextui-org/react';

const fetchPost = async (id) => {
  const response = await axiosInstance.get(`/blog/show/posts/${id}`);
  return response.data;
};

const SinglePostHeaderSection = () => {
  const { id } = useParams();

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
  };

  if (isLoading) {
    return (
      <Container className="mx-auto">
        <div className="bg-white rounded-lg p-4">
          <Skeleton height="40px" width="70%" className="mb-4" />
          <Skeleton height="20px" width="40%" className="mb-2" />
          <Skeleton height="400px" className="mb-4" />
          <Skeleton height="20px" width="90%" className="mb-2" />
          <Skeleton height="20px" width="85%" className="mb-2" />
          <Skeleton height="20px" width="80%" className="mb-2" />
        </div>
      </Container>
    );
  }

  if (isError) {
    return <div>Error fetching post: {error.message}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-1 mt-3">{post.title}</h1>
        <div className="relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-4"
          />
          <div className="absolute top-2 right-2 bg-white bg-opacity-75 text-black text-sm p-1 rounded">
            {post.category.name} | {formatDate(post.created_at)}
          </div>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
};

export default SinglePostHeaderSection;
