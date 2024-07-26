import { Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';
import PlaceholderImage from './PlaceholderImage';

const fetchPosts = async () => {
  const response = await axiosInstance.get('/blog/posts');
  console.log(response.data); // Log the response data
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
        <div className="container mx-auto my-4" data-aos="fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Skeleton key={index} className="w-full h-[300px] md:h-[400px]" />
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
    <section>
      <div className="container mx-auto my-4" data-aos="fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.slice(-50).map((post) => (
            <div key={post.id} className="w-full">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[180px] md:h-[250px] object-cover rounded-lg"
              />
              <div className="flex p-1">
                <PlaceholderImage name={post.user.name} avatar={post.user.avatar} />
                <div>
                  <h2 className="text-xl font-semibold m-0 p-0">
                    {post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}
                  </h2>
                </div>
              </div>
              <p className="text-gray-500">By {post.user.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
