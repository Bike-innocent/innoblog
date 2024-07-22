
import React from 'react';
import { Link } from 'react-router-dom';

const MixedCategorySection = () => {
  return (
    <section id="posts" className="posts">
      <div className="container mx-auto my-4" data-aos="fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Main post */}
          <div className="lg:col-span-1">
            <div className="post-entry-1 lg relative bg-white shadow rounded overflow-hidden">
              <Link to="single-post.html">
                <img src="assets/img/post-landscape-1.jpg" alt="" className="w-full h-60 object-cover" />
              </Link>
              <div className="p-4">
                <div className="post-meta text-gray-500 text-sm">
                  <span className="date">Culture</span> <span className="mx-1">&bullet;</span> <span>Jul 5th '22</span>
                </div>
                <h2 className="text-xl font-semibold">
                  <Link to="single-post.html">bike tech 11 Work From Home Part-Time Jobs You Can Do Now</Link>
                </h2>
                <p className="mb-4 text-gray-700">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos</p>
                <div className="flex items-center mt-4">
                  <img src="assets/img/person-1.jpg" alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold">innoent chibuike</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional posts */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="border-l pl-4">
              <div className="post-entry-1 mb-5">
                <Link to="single-post.html">
                  <img src="assets/img/post-landscape-2.jpg" alt="" className="w-full h-40 object-cover" />
                </Link>
                <div className="post-meta text-gray-500 text-sm">
                  <span className="date">Sport</span> <span className="mx-1">&bullet;</span> <span>Jul 5th '22</span>
                </div>
                <h2 className="text-xl font-semibold">
                  <Link to="single-post.html">innotech Let’s Get Back to Work, New York</Link>
                </h2>
              </div>
              <div className="post-entry-1 mb-5">
                <Link to="single-post.html">
                  <img src="assets/img/post-landscape-5.jpg" alt="" className="w-full h-40 object-cover" />
                </Link>
                <div className="post-meta text-gray-500 text-sm">
                  <span className="date">Food</span> <span className="mx-1">&bullet;</span> <span>Jul 17th '22</span>
                </div>
                <h2 className="text-xl font-semibold">
                  <Link to="single-post.html">How to Avoid Distraction and Stay Focused During Video Calls?</Link>
                </h2>
              </div>
              <div className="post-entry-1">
                <Link to="single-post.html">
                  <img src="assets/img/post-landscape-7.jpg" alt="" className="w-full h-40 object-cover" />
                </Link>
                <div className="post-meta text-gray-500 text-sm">
                  <span className="date">Design</span> <span className="mx-1">&bullet;</span> <span>Mar 15th '22</span>
                </div>
                <h2 className="text-xl font-semibold">
                  <Link to="single-post.html">Why innocent Craigslist Tampa Is One of The Most Interesting Places On the Web?</Link>
                </h2>
              </div>
            </div>
            <div className="border-l pl-4">
              <div className="post-entry-1 mb-5">
                <Link to="single-post.html">
                  <img src="assets/img/post-landscape-3.jpg" alt="" className="w-full h-40 object-cover" />
                </Link>
                <div className="post-meta text-gray-500 text-sm">
                  <span className="date">Business</span> <span className="mx-1">&bullet;</span> <span>Jul 5th '22</span>
                </div>
                <h2 className="text-xl font-semibold">
                  <Link to="single-post.html">6 Easy Steps To Create Your Own Cute Merch For Instagram</Link>
                </h2>
              </div>
              <div className="post-entry-1 mb-5">
                <Link to="single-post.html">
                  <img src="assets/img/post-landscape-6.jpg" alt="" className="w-full h-40 object-cover" />
                </Link>
                <div className="post-meta text-gray-500 text-sm">
                  <span className="date">Tech</span> <span className="mx-1">&bullet;</span> <span>Mar 1st '22</span>
                </div>
                <h2 className="text-xl font-semibold">
                  <Link to="single-post.html">10 Life-Changing Hacks Every Working Mom Should Know</Link>
                </h2>
              </div>
              <div className="post-entry-1">
                <Link to="single-post.html">
                  <img src="assets/img/post-landscape-8.jpg" alt="" className="w-full h-40 object-cover" />
                </Link>
                <div className="post-meta text-gray-500 text-sm">
                  <span className="date">Travel</span> <span className="mx-1">&bullet;</span> <span>Jul 5th '22</span>
                </div>
                <h2 className="text-xl font-semibold">
                  <Link to="single-post.html">5 Great Startup Tips for Female Founders</Link>
                </h2>
              </div>
            </div>

            {/* Trending Section */}
            <div className="border-l pl-4">
              <div className="trending bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-4">Trending</h3>
                <ul className="trending-post">
                  <li className="mb-4">
                    <Link to="single-post.html" className="flex items-start">
                      <span className="number text-2xl font-bold mr-3">1</span>
                      <div>
                        <h3 className="text-lg font-semibold">The Best Homemade Masks for Face (keep the Pimples Away)</h3>
                        <span className="author text-gray-500 text-sm">Jane Cooper</span>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="single-post.html" className="flex items-start">
                      <span className="number text-2xl font-bold mr-3">2</span>
                      <div>
                        <h3 className="text-lg font-semibold">17 Pictures of Medium Length Hair in Layers That Will Inspire Your New Haircut</h3>
                        <span className="author text-gray-500 text-sm">Wade Warren</span>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="single-post.html" className="flex items-start">
                      <span className="number text-2xl font-bold mr-3">3</span>
                      <div>
                        <h3 className="text-lg font-semibold">13 Amazing Poems from Shel Silverstein with Valuable Life Lessons</h3>
                        <span className="author text-gray-500 text-sm">Esther Howard</span>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="single-post.html" className="flex items-start">
                      <span className="number text-2xl font-bold mr-3">4</span>
                      <div>
                        <h3 className="text-lg font-semibold">9 Half-up/half-down Hairstyles for Long and Medium Hair</h3>
                        <span className="author text-gray-500 text-sm">Cameron Williamson</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="single-post.html" className="flex items-start">
                      <span className="number text-2xl font-bold mr-3">5</span>
                      <div>
                        <h3 className="text-lg font-semibold">Life Insurance And Pregnancy: A Working Mom’s Guide</h3>
                        <span className="author text-gray-500 text-sm">Jenny Wilson</span>
                      </div>
                    </Link>
                  </li>
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
