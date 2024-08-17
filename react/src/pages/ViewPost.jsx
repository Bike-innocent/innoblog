import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';

const ViewPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axiosInstance.get(`/posts/${slug}`);
                setPost(response.data.post);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return <Loader />;
    }

    if (!post) {
        return <p>Post not found.</p>;
    }

    return (
        <>

            <div className="container mx-auto p-4">


                <div className="">
                    <span className="text-gray-700 font-bold">{post.category ? post.category.name : 'N/A'} |{post.sub_category ? post.sub_category.name : 'N/A'}| {new Date(post.created_at).toLocaleDateString()}</span>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <div className="mb-4 ">
                        <div className="w-full md:w-1/2 float-start p-2 mt-3" >

                            <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded" />
                        </div>
                        <div className="w-full  md:p-4 ">
                            <p className="text-gray-700 ">{post.content}</p>
                        </div>
                    </div>


                    <Link to="/profile" className="btn btn-secondary">Back</Link>
                </div>
            </div>
        </>
    );
};

export default ViewPost;
