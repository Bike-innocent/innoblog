import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { Link, useLocation } from 'react-router-dom';
import SuccessMessage from '../../components/SuccessMessage';
import Loader from '../../components/Loader';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (location.state && location.state.success) {
            setSuccessMessage(location.state.success);
            // Remove the state so the message doesn't reappear on page reload
            location.state.success = null;
        }
        fetchPosts();
    }, [location.state]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/posts');
            setPosts(response.data.posts || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/posts/${id}`);
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">My Posts</h1>
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

export default MyPosts;
