import React, { useState, Fragment, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../axiosInstance';
import { Link, useLocation } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import SuccessMessage from '../../components/SuccessMessage';
import Loader from '../../components/Loader';

const fetchPosts = async () => {
  const { data } = await axiosInstance.get('/posts');
  return data.posts || [];
};

const deletePost = async ({ id }) => {
  await axiosInstance.delete(`/posts/${id}`);
};

const MyPosts = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setSuccessMessage('Post deleted successfully.');
    },
  });

  const openDeleteDialog = (id) => {
    setPostIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setPostIdToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    deleteMutation.mutate({ id: postIdToDelete }, {
      onSuccess: () => {
        closeDeleteDialog();
      },
    });
  };

  useEffect(() => {
    if (location.state && location.state.success) {
      setSuccessMessage(location.state.success);
      location.state.success = null;
    }
  }, [location.state]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">My Posts</h1>
      <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('')} />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Error fetching posts.</p>
      ) : (
        <>
          {posts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={post.image} alt={post.title} className="w-16 h-16 object-cover" />
                    </td>
                    <td>{post.title}</td>
                    <td>{post.category ? post.category.name : 'N/A'}</td>
                    <td>{post.sub_category ? post.sub_category.name : 'N/A'}</td>
                    <td>{new Date(post.created_at).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/dashboard/view-post/${post.id}`} className="btn btn-info mr-2">View</Link>
                      <Link to={`/dashboard/edit-post/${post.id}`} className="btn btn-warning mr-2">Edit</Link>
                      <button onClick={() => openDeleteDialog(post.id)} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      <Transition appear show={isDeleteDialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Post
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this post? This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={closeDeleteDialog}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MyPosts;
