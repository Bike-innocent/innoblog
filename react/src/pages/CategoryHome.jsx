import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const CategoryHome = () => {
  const { categorySlug } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axiosInstance.get(`/categories/${categorySlug}/subcategories`);
        setSubcategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categorySlug]);

  const fetchPosts = async (subcategorySlug) => {
    try {
      const response = await axiosInstance.get(`/categories/${categorySlug}/subcategories/${subcategorySlug}/posts`);
      setPosts(response.data);
      setSelectedSubcategory(subcategorySlug);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="text-xl font-bold">Loading...</div>
    </div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Subcategories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {subcategories.map((subcategory) => (
          <div key={subcategory.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <button
              onClick={() => fetchPosts(subcategory.slug)}
              className="text-lg font-semibold text-blue-600 hover:text-blue-800"
            >
              {subcategory.name}
            </button>
          </div>
        ))}
      </div>

      {selectedSubcategory && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Posts in {selectedSubcategory}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link to={`/posts/${post.id}`} className="text-lg font-semibold text-blue-600 hover:text-blue-800">
                  {post.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryHome;
