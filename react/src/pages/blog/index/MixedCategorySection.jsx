
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../mycss.css'
import '../../../myvariable.css';

const MixedCategorySection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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

  const mainPost = posts[0];
  const columnTwoPosts = posts.slice(1, 4);
  const columnThreePosts = posts.slice(4, 7);
  const trendingPosts = posts.slice(7, 12);

  const getUserAvatar = (user) => {
    if (user.avatar) {
      return user.avatar;
    }
    const firstLetter = user.name.charAt(0).toUpperCase();
    return `https://via.placeholder.com/40?text=${firstLetter}`;
  };

  return (
    <section id="posts" className="posts">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="post-entry-1 lg">
              <Link to={`/posts/${mainPost.id}`}>
                <img src={mainPost.image} alt="" className="img-fluid" />
              </Link>
              <div className="post-meta">
                <span className="date">{mainPost.category}</span>
                <span className="mx-1">.</span>
                <span>{new Date(mainPost.created_at).toLocaleDateString()}</span>
              </div>
              <h2>
                <Link to={`/posts/${mainPost.id}`}>{mainPost.title}</Link>
              </h2>
              <p className="mb-4 d-block">{mainPost.excerpt}</p>
              <div className="d-flex align-items-center author">
                <div className="photo">
                  <img src={getUserAvatar(mainPost.user)} alt="" className="img-fluid h-8 w-8" />
                </div>
                <div className="name">
                  <h3 className="m-0 p-0">{mainPost.user.name}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="row g-5">
              <div className="col-lg-4 border-start custom-border">
                {columnTwoPosts.map((post) => (
                  <div className="post-entry-1" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                      <img src={post.image} alt="" className="img-fluid" />
                    </Link>
                    <div className="post-meta">
                      <span className="date">{post.category}</span>
                      <span className="mx-1">.</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <h2>
                      <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </h2>
                  </div>
                ))}
              </div>
              <div className="col-lg-4 border-start custom-border">
                {columnThreePosts.map((post) => (
                  <div className="post-entry-1" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                      <img src={post.image} alt="" className="img-fluid" />
                    </Link>
                    <div className="post-meta">
                      <span className="date">{post.category}</span>
                      <span className="mx-1">.</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <h2>
                      <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </h2>
                  </div>
                ))}
              </div>
              <div className="col-lg-4">
                <div className="trending">
                  <h3>Trending</h3>
                  <ul className="trending-post">
                    {trendingPosts.map((post, index) => (
                      <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                          <span className="number">{index + 1}</span>
                          <h3>{post.title}</h3>
                          <span className="author">{post.user.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MixedCategorySection;

