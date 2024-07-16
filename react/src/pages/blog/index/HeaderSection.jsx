import React from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Carousel } from 'react-bootstrap';
import { Skeleton } from '@nextui-org/react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <div className="row">
            <div className="col-12">
              <Carousel>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Carousel.Item key={index} className="custom-carousel-item h-[400px] md:h-[500px]">
                    <Skeleton className="w-full h-full" />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
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
      <div className="container mx-auto my-4" data-aos="fade-in">
        <div className="row">
          <div className="col-12">
            <Carousel
              interval={6000}
              controls={true}
              indicators={true}
              nextIcon={<span aria-hidden="true" className="carousel-control-next-icon hidden md:inline" />}
              prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon hidden md:inline" />}
            >
              {posts.slice(-5).map((post) => (
                <Carousel.Item key={post.id} className="custom-carousel-item h-[400px] md:h-[500px]">
                  <div
                    className="d-flex align-items-end justify-content-start h-full"
                    style={{
                      background: `url(${post.image}) center/cover no-repeat`,
                    }}
                  >
                    <Link
                      to={`/posts/${post.id}`}
                      className="w-100 h-100 d-flex align-items-end justify-content-start text-white bg-black bg-opacity-25 p-4 md:p-2"
                    >
                      <div className="text-left mb-4 ml-4">
                        <h2 className="text-2xl font-semibold">
                          {post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}
                        </h2>
                        <p className="mt-2 hidden md:block">
                          {post.content.length > 70 ? post.content.substring(0, 70) + '...' : post.content}
                        </p>
                      </div>
                    </Link>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
