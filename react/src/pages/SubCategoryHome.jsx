import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import CategoryHome from './CategoryHome';

const SubCategoryHome = () => {
    const { categorySlug, subcategorySlug } = useParams();
    const [posts, setPosts] = useState([]);
    const [subcategoryName, setSubcategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosInstance.get(`/categories/${categorySlug}/subcategories/${subcategorySlug}/posts`);
                console.log('Posts response:', response);
                if (response.data && Array.isArray(response.data.posts)) {
                    setPosts(response.data.posts);
                    setSubcategoryName(response.data.subcategoryName);
                } else {
                    setError('Unexpected response format');
                }
                setLoading(false);
            } catch (error) {
                console.error('There was an error fetching the posts!', error);
                setError('Failed to fetch posts');
                setLoading(false);
            }
        };

        fetchPosts();
    }, [categorySlug, subcategorySlug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl font-bold">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl font-bold text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <>
            <CategoryHome />
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-semibold mb-6">{subcategoryName}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <Link
                            to={`/posts/${post.id}`}>
                            <div key={post.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-64 md:h-96 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold">{post.title}</h3>
                                <p className="mt-2 text-gray-600">{post.content}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SubCategoryHome;
