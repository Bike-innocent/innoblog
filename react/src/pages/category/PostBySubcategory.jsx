import React from 'react';
import { Link } from 'react-router-dom';

const PostBySubcategory = ({ post, subcategoryName }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/posts/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <p className="mt-2 text-gray-600">{post.content}</p>
        <p className="mt-2 text-gray-500">Subcategory: {subcategoryName}</p>
      </Link>
    </div>
  );
};

export default PostBySubcategory;
