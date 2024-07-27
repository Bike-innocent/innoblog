import { Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';
import PlaceholderImage from './PlaceholderImage';

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
        <div className="container mx-auto my-4" data-aos="fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="w-full group">
                <div className="block">
                  <Skeleton className="w-full h-[180px] md:h-[250px] object-cover rounded-lg" />
                  <div className="flex pt-2 ">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col pl-2 w-full">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2 mt-1" />
                    </div>
                  </div>
            
                </div>
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
    <section>
      <div className="container mx-auto my-4" data-aos="fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.slice(-50).map((post) => (
            <div key={post.id} className="w-full group">
              <Link to={`/posts/${post.id}`} className="block">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[180px] md:h-[250px] object-cover rounded-lg group-hover:opacity-75 transition-opacity"
                />
                <div className="flex pt-2">
                  <div className="w-1/5">
                    <PlaceholderImage name={post.user.name} avatar={post.user.avatar_url} />
                  </div>
                  <div className="">
                    <h2 className="text-xl font-semibold m-0 p-0 group-hover:underline">
                      {post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}
                    </h2>
                  </div>
                </div>
                <p className="text-gray-500"> {post.user.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
