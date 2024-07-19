// SubCategoryHome.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const SubCategoryHome = () => {
  const { categorySlug, subcategorySlug } = useParams();
  const [posts, setPosts] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState('');

  useEffect(() => {
    axiosInstance.get(`/categories/${categorySlug}/subcategories/${subcategorySlug}/posts`)
      .then(response => {
        setPosts(response.data.posts);
        setSubcategoryName(response.data.subcategoryName);
      })
      .catch(error => {
        console.error('There was an error fetching the posts!', error);
      });
  }, [categorySlug, subcategorySlug]);

  return (
    <div>
      <h2 className="text-lg font-semibold">{subcategoryName}</h2>
      <div className="grid gap-4 mt-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-md font-semibold">{post.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryHome;
