import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';
import SuccessMessage from '../../components/SuccessMessage';
import Loader from '../../components/Loader';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/all-posts?page=${page}`);
            console.log('Response data:', response.data); // Debugging line
            setPosts(response.data.data);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/all-posts/${id}`);
            setPosts(posts.filter(post => post.id !== id));
            setSuccessMessage('Post deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">All Posts</h1>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('')} />
            {loading ? (
                <Loader />
            ) : (
                <>
                    {posts.length === 0 ? (
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
                                    {posts.map((post, index) => (
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
                                    {Array.from({ length: lastPage }, (_, index) => (
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
                                <div className="flex  sm:hidden">
                                    <button
                                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                        className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700"
                                        disabled={currentPage === 1}
                                    >
                                        &larr; Previous
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(Math.min(currentPage + 1, lastPage))}
                                        className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700"
                                        disabled={currentPage === lastPage}
                                    >
                                        Next &rarr;
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default AllPosts;
