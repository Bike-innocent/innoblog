import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';

const MixedCategorySection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the API
    axiosInstance.get('/mixedPostOnHome')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  if (posts.length === 0) {
    return <p>Loading...</p>;
  }

  // Split the posts into sections
  const mainPost = posts[0];
  const additionalPosts = posts.slice(1, 10);
  const trendingPosts = posts.slice(10, 15);

  return (
    <section id="posts" className="posts">
      <div className="container mx-auto my-4" data-aos="fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Main post */}
          <div className="lg:col-span-1">
            <div className="post-entry-1 lg relative bg-white shadow rounded overflow-hidden">
              <Link to={`/post/${mainPost.id}`}>
                <img src={mainPost.image} alt="" className="w-full h-60 object-cover" />
              </Link>
              <div className="p-4">
                <div className="post-meta text-gray-500 text-sm">
                  <span className="date">{mainPost.category}</span> <span className="mx-1">&bullet;</span> <span>{new Date(mainPost.created_at).toLocaleDateString()}</span>
                </div>
                <h2 className="text-xl font-semibold">
                  <Link to={`/post/${mainPost.id}`}>{mainPost.title}</Link>
                </h2>
                <p className="mb-4 text-gray-700">{mainPost.excerpt}</p>
                <div className="flex items-center mt-4">
                  <img src={mainPost.author.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold">{mainPost.author.name}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional posts */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {additionalPosts.map((post) => (
              <div className="border-l pl-4" key={post.id}>
                <div className="post-entry-1 mb-5">
                  <Link to={`/post/${post.id}`}>
                    <img src={post.image} alt="" className="w-full h-40 object-cover" />
                  </Link>
                  <div className="post-meta text-gray-500 text-sm">
                    <span className="date">{post.category}</span> <span className="mx-1">&bullet;</span> <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-xl font-semibold">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </h2>
                </div>
              </div>
            ))}

            {/* Trending Section */}
            <div className="border-l pl-4">
              <div className="trending bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-4">Trending</h3>
                <ul className="trending-post">
                  {trendingPosts.map((post, index) => (
                    <li className="mb-4" key={post.id}>
                      <Link to={`/post/${post.id}`} className="flex items-start">
                        <span className="number text-2xl font-bold mr-3">{index + 1}</span>
                        <div>
                          <h3 className="text-lg font-semibold">{post.title}</h3>
                          <span className="author text-gray-500 text-sm">{post.author.name}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MixedCategorySection;
