import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';
import SuccessMessage from '../../components/SuccessMessage';
import Loader from '../../components/Loader';

const fetchPosts = async ({ queryKey }) => {
  const [_key, { page }] = queryKey;
  const response = await axiosInstance.get(`/admin/all-posts?page=${page}`);
  return response.data;
};

const deletePost = async (id) => {
  await axiosInstance.delete(`/admin/all-posts/${id}`);
};

const AllPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['posts', { page: currentPage }],
    queryFn: fetchPosts,
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', { page: currentPage }]);
      setSuccessMessage('Post deleted successfully');
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">All Posts</h1>
      <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('')} />
      {data.data.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Image</th>
                <th>Title</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((post, index) => (
                <tr key={post.id}>
                  <td>{index + 1 + (currentPage - 1) * 10}</td>
                  <td>
                    <img src={post.image} alt={post.title} className="w-16 h-16 object-cover" />
                  </td>
                  <td>{post.title}</td>
                  <td>{new Date(post.created_at).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/dashboard/edit-post/${post.id}`} className="btn btn-warning mr-2">Edit</Link>
                    <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {/* Pagination for Desktop */}
            <div className="hidden sm:flex">
              {Array.from({ length: data.last_page }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            {/* Pagination for Mobile */}
            <div className="flex sm:hidden">
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700"
                disabled={currentPage === 1}
              >
                &larr; Previous
              </button>
              <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, data.last_page))}
                className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700"
                disabled={currentPage === data.last_page}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllPosts;
