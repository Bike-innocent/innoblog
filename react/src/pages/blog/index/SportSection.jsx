import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axiosInstance from '../../../axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Skeleton } from '@nextui-org/react';

function SportSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/sport')
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
    return (
      <section className="category-section">
        <div className="container">
          <div className="section-header d-flex justify-content-between align-items-center mb-5">
            <h2>Sports</h2>
            <div><a href="category.html" className="more">See All Sports</a></div>
          </div>
          <Row>
            <Col md={9}>
              <Skeleton height={400} width="100%" color="black" />
              <Skeleton height={300} width="100%" className="mt-4" />
            </Col>
            <Col md={3}>
              <Skeleton height={100} width="100%" />
              <Skeleton height={100} width="100%" className="mt-4" />
              <Skeleton height={100} width="100%" className="mt-4" />
            </Col>
          </Row>
        </div>
      </section>
    );
  }

  return (
    <section className="category-section">
      <div className="container" data-aos="fade-up">
        <div className="section-header flex justify-between items-center mb-5">
          <h2>{posts[0] && posts[0].category.name}</h2>
          <div><a href="category.html" className="more">See All {posts[0] && posts[0].category.name}</a></div>
        </div>

        <Row>
          <Col md={9}>
            {posts.length > 0 && (
              <div className="flex lg:flex-row flex-col mb-4">
                <Link to={`/posts/${posts[0].id}`} className="lg:mr-4 mb-4 lg:mb-0 inline-block">
                  <img src={posts[0].image} alt="" className="img-fluid" />
                </Link>
                <div>
                  <div className="post-meta">
                    <span className="date">{posts[0].category.name}</span>
                    <span className="mx-1">.</span>
                    <span>{new Date(posts[0].created_at).toLocaleDateString()}</span>
                  </div>
                  <h3><Link to={`/posts/${posts[0].id}`}>{posts[0].title}</Link></h3>
                  <p>{posts[0].description}</p>
                  <div className="flex items-center author">
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

            <Row>
              {posts.slice(1, 4).map(post => (
                <Col key={post.id} lg={4}>
                  <div className="post-entry-1 border-b">
                    <Link to={`/posts/${post.id}`}>
                      <img src={post.image} alt="" className="img-fluid" />
                    </Link>
                    <div className="post-meta">
                      <span className="date">{post.category.name}</span>
                      <span className="mx-1">.</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <h2 className="mb-2"><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
                    <span className="author mb-3 block">{post.user.name}</span>
                    <p className="mb-4 block">{post.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>

          <Col md={3}>
            {posts.slice(4).map(post => (
              <div key={post.id} className="post-entry-1 border-b mb-4">
                <div className="post-meta">
                  <span className="date">{post.category.name}</span>
                  <span className="mx-1">.</span>
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <h2 className="mb-2"><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
                <span className="author mb-3 block">{post.user.name}</span>
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default SportSection;
