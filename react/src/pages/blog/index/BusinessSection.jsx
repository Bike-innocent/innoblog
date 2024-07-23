import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../mycss.css';
import '../../../myvariable.css';
import { Link } from 'react-router-dom';

function BusinessSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/business')
      .then(response => {
        console.log('API response:', response.data);
        setPosts(response.data.slice(0, 10)); // Get only the latest 10 posts
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the posts!', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="category-section">
      <div className="container" data-aos="fade-up">
        <div className="section-header d-flex justify-content-between align-items-center mb-5">
          <h2>Business</h2>
          <div><a href="category.html" className="more">See All Buisness</a></div>
        </div>

        <div className="row">
          <div className="col-md-9 order-md-2">
            {posts.length > 0 && (
              <div className="d-lg-flex post-entry-2">
                <Link to={`/posts/${posts[0].id}`} className="me-4 thumbnail mb-4 mb-lg-0 d-inline-block">
                  <img src={posts[0].image} alt="" className="img-fluid" />
                </Link>
                <div>
                  <div className="post-meta">
                    <span className="date">Business</span>
                    <span className="mx-1">&bullet;</span>
                    <span>{new Date(posts[0].created_at).toLocaleDateString()}</span>
                  </div>
                  <h3><Link to={`/posts/${posts[0].id}`}>{posts[0].title}</Link></h3>
                  <p>{posts[0].description}</p>
                  <div className="d-flex align-items-center author">
                    <div className="photo">
                      <img src={posts[0].user.avatar} alt="" className="img-fluid" />
                    </div>
                    <div className="name">
                      <h3 className="m-0 p-0">{posts[0].user.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="row">
              {posts.slice(1, 4).map(post => (
                <div key={post.id} className="col-lg-4">
                  <div className="post-entry-1 border-bottom">
                    <Link to={`/posts/${post.id}`}>
                      <img src={post.image} alt="" className="img-fluid" />
                    </Link>
                    <div className="post-meta">
                      <span className="date">Sport</span>
                      <span className="mx-1">&bullet;</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <h2 className="mb-2"><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
                    <span className="author mb-3 d-block">{post.user.name}</span>
                    <p className="mb-4 d-block">{post.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-3">
            {posts.slice(4).map(post => (
              <div key={post.id} className="post-entry-1 border-bottom">
                <div className="post-meta">
                  <span className="date">Sport</span>
                  <span className="mx-1">&bullet;</span>
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <h2 className="mb-2"><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
                <span className="author mb-3 d-block">{post.user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BusinessSection;
