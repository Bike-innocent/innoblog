import React from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Skeleton } from '@nextui-org/react';
import PlaceholderImage from './PlaceholderImage'; // Adjust the import path as necessary

const fetchPost = async (slug) => {
    const response = await axiosInstance.get(`/blog/show/posts/${slug}`);
    return response.data;
};

const SinglePostHeaderSection = () => {
    const { slug } = useParams();

    const { data: post, isLoading, isError, error } = useQuery({
        queryKey: ['postrt', slug],
        queryFn: () => fetchPost(slug),
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
    };

    if (isLoading) {
        return (
            <div className="mx-auto">
                <div className="bg-gray-200 rounded-lg p-4 h-64 md:h-96 mt-5">
                    <Skeleton height="500px" width="70%" className="mb-4" />
                </div>
            </div>
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
                <Link to={`/${post.user.username}`}  >
                    <div className="flex items-center mt-4">
                        <PlaceholderImage
                            name={post.user.name}
                            avatar={post.user.avatar}
                            placeholderColor={post.user.placeholder_color}
                        />
                        <p className="ml-2 text-gray-700">{post.user.name}</p>
                    </div>
                </Link>
                {/* Render post content as HTML */}
                <div
                  
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </div>
    );
};

export default SinglePostHeaderSection;
