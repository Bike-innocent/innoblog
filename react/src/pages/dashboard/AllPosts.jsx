// src/pages/AllPosts.jsx

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';
import SuccessMessage from '../../components/SuccessMessage';
import Loader from '../../components/Loader';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/all-posts');
            console.log('Response data:', response.data); // Debugging line
            setPosts(response.data.posts || []);
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
                                        <td>{index + 1}</td>
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
                    )}
                </>
            )}
        </div>
    );
};

export default AllPosts;
