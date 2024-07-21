import React from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';

const fetchPosts = async () => {
  const response = await axiosInstance.get('/blog/posts');
  return response.data;
};

const HeaderSection = () => {
  const { data: posts = [], isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <section id="hero-slider">
        <div className="container mx-auto my-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className={`h-[200px] md:h-[200px] lg:h-[250px] ${index === 1 ? 'md:col-span-2 md:h-[300px] lg:col-span-2 lg:row-span-2 lg:h-[400px]' : ''}`}>
                <Skeleton className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return <p className="text-red-500">Error fetching posts: {error.message}</p>;
  }

  return (
    <section id="hero-slider">
      <div className="container mx-auto my-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {posts.slice(-5).map((post, index) => (
            <div
              key={post.id}
              className={`relative bg-gray-50 shadow-sm rounded-sm overflow-hidden ${index === 1 ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}
            >
              <div className="relative h-[200px] md:h-[200px] lg:h-[250px]">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-start">
                <Link
                  to={`/posts/${post.id}`}
                  className="block text-center text-black"
                >
                  <h2 className="text-xl md:text-2xl font-semibold">
                    {post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}
                  </h2>
                  <p className="mt-2">
                    {post.content.length > 70 ? post.content.substring(0, 70) + '...' : post.content}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
