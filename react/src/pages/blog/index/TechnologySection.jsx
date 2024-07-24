// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../../axiosInstance';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../../mycss.css';
// import '../../../myvariable.css';
// import { Link } from 'react-router-dom';
// import { Skeleton } from '@nextui-org/react';

// function TechnologySection() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axiosInstance.get('/technolgy')
//       .then(response => {
//         console.log('API response:', response.data);
//         setPosts(response.data.slice(0, 15)); // Get the latest 15 posts
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the posts!', error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <section className="category-section">
//         <div className="container">
//           <div className="section-header d-flex justify-content-between align-items-center mb-5">
//             <h2>Loading...</h2>
//             <div><a href="/category/technology" className="more">See All Technology</a></div>
//           </div>
//           <div className="row g-5">
//             <div className="col-lg-4">
//               <Skeleton height={400} width="100%" color="black" />
//               <Skeleton height={100} width="100%" className="mt-4" />
//               <Skeleton height={100} width="100%" className="mt-4" />
//             </div>
//             <div className="col-lg-8">
//               <Skeleton height={300} width="100%" />
//               <Skeleton height={300} width="100%" className="mt-4" />
//               <Skeleton height={300} width="100%" className="mt-4" />
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="category-section">
//       <div className="container" data-aos="fade-up">
//         <div className="section-header d-flex justify-content-between align-items-center mb-5">
//           <h2>{posts[0]?.category.name}</h2>
//           <div><a href={`/category/${posts[0]?.category.name}`} className="more">See All {posts[0]?.category.name}</a></div>
//         </div>

//         <div className="row g-5">
//           <div className="col-lg-4">
//             {posts[0] && (
//               <div className="post-entry-1 lg">
//                 <Link to={`/posts/${posts[0].id}`}>
//                   <img src={posts[0].image} alt="" className="img-fluid" />
//                 </Link>
//                 <div className="post-meta">
//                   <span className="date">{posts[0].category.name}</span>
//                   <span className="mx-1">.</span>
//                   <span>{new Date(posts[0].created_at).toLocaleDateString()}</span>
//                 </div>
//                 <h2><Link to={`/posts/${posts[0].id}`}>{posts[0].title}</Link></h2>
//                 <p className="mb-4 d-block">{posts[0].description}</p>
//                 <div className="d-flex align-items-center author">
//                   <div className="photo">
//                     <img src={posts[0].user.avatar} alt="" className="img-fluid" />
//                   </div>
//                   <div className="name">
//                     <h3 className="m-0 p-0">{posts[0].user.name}</h3>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {posts.slice(1, 3).map(post => (
//               <div key={post.id} className="post-entry-1 border-bottom">
//                 <div className="post-meta">
//                   <span className="date">{post.category.name}</span>
//                   <span className="mx-1">.</span>
//                   <span>{new Date(post.created_at).toLocaleDateString()}</span>
//                 </div>
//                 <h2 className="mb-2"><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
//                 <span className="author mb-3 d-block">{post.user.name}</span>
//               </div>
//             ))}
//           </div>

//           <div className="col-lg-8">
//             <div className="row g-5">
//               {posts.slice(3, 12).map((post, index) => (
//                 <div key={post.id} className={`col-lg-4 ${index % 3 !== 0 ? 'border-start custom-border' : ''}`}>
//                   <div className="post-entry-1">
//                     <Link to={`/posts/${post.id}`}>
//                       <img src={post.image} alt="" className="img-fluid" />
//                     </Link>
//                     <div className="post-meta">
//                       <span className="date">{post.category.name}</span>
//                       <span className="mx-1">.</span>
//                       <span>{new Date(post.created_at).toLocaleDateString()}</span>
//                     </div>
//                     <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
//                   </div>
//                 </div>
//               ))}

//               <div className="col-lg-4">
//                 {posts.slice(12, 15).map(post => (
//                   <div key={post.id} className="post-entry-1 border-bottom">
//                     <div className="post-meta">
//                       <span className="date">{post.category.name}</span>
//                       <span className="mx-1">.</span>
//                       <span>{new Date(post.created_at).toLocaleDateString()}</span>
//                     </div>
//                     <h2 className="mb-2"><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
//                     <span className="author mb-3 d-block">{post.user.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

//  export default TechnologySection;



import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../mycss.css';
import '../../../myvariable.css';
import { Link } from 'react-router-dom';
import { Skeleton } from '@nextui-org/react';

function TechnologySection() {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/section')
      .then(response => {
        setSections(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the sections!', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="category-section">
        <div className="container">
          <div className="section-header d-flex justify-content-between align-items-center mb-5">
            <h2>Loading...</h2>
            <div><a href="/category/technology" className="more">See All Technology</a></div>
          </div>
          <div className="row g-5">
            <div className="col-lg-4">
              <Skeleton height={400} width="100%" color="black" />
              <Skeleton height={100} width="100%" className="mt-4" />
              <Skeleton height={100} width="100%" className="mt-4" />
            </div>
            <div className="col-lg-8">
              <Skeleton height={300} width="100%" />
              <Skeleton height={300} width="100%" className="mt-4" />
              <Skeleton height={300} width="100%" className="mt-4" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      {Object.keys(sections).map((categorySlug, index) => (
        <section key={index} className="category-section">
          <div className="container" data-aos="fade-up">
            <div className="section-header d-flex justify-content-between align-items-center mb-5">
              <h2>{sections[categorySlug][0]?.category.name}</h2>
              <div><a href={`/category/${categorySlug}`} className="more">See All {sections[categorySlug][0]?.category.name}</a></div>
            </div>

            <div className="row g-5">
              <div className="col-lg-4">
                {sections[categorySlug][0] && (
                  <div className="post-entry-1 lg">
                    <Link to={`/posts/${sections[categorySlug][0].id}`}>
                      <img src={sections[categorySlug][0].image} alt="" className="img-fluid" />
                    </Link>
                    <div className="post-meta">
                      <span className="date">{sections[categorySlug][0].category.name}</span>
                      <span className="mx-1">&bullet;</span>
                      <span>{new Date(sections[categorySlug][0].created_at).toLocaleDateString()}</span>
                    </div>
                    <h2><Link to={`/posts/${sections[categorySlug][0].id}`}>{sections[categorySlug][0].title}</Link></h2>
                    <p className="mb-4 d-block">{sections[categorySlug][0].description}</p>
                    <div className="d-flex align-items-center author">
                      <div className="photo">
                        <img src={sections[categorySlug][0].user.avatar} alt="" className="img-fluid" />
                      </div>
                      <div className="name">
                        <h3 className="m-0 p-0">{sections[categorySlug][0].user.name}</h3>
                      </div>
                    </div>
                  </div>
                )}

                {sections[categorySlug].slice(1, 3).map(post => (
                  <div key={post.id} className="post-entry-1 border-bottom">
                    <div className="post-meta">
                      <span className="date">{post.category.name}</span>
                      <span className="mx-1">&bullet;</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <h2 className="mb-2"><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
                    <span className="author mb-3 d-block">{post.user.name}</span>
                  </div>
                ))}
              </div>

              <div className="col-lg-8">
                <div className="row g-5">
                  {sections[categorySlug].slice(3, 12).map((post, index) => (
                    <div key={post.id} className={`col-lg-4 ${index % 3 !== 0 ? 'border-start custom-border' : ''}`}>
                      <div className="post-entry-1">
                        <Link to={`/posts/${post.id}`}>
                          <img src={post.image} alt="" className="img-fluid" />
                        </Link>
                        <div className="post-meta">
                          <span className="date">{post.category.name}</span>
                          <span className="mx-1">&bullet;</span>
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                        <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
                      </div>
                    </div>
                  ))}

                  <div className="col-lg-4">
                    {sections[categorySlug].slice(12, 15).map(post => (
                      <div key={post.id} className="post-entry-1 border-bottom">
                        <div className="post-meta">
                          <span className="date">{post.category.name}</span>
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
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default TechnologySection;
