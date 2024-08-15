import React from 'react';
import { Link } from 'react-router-dom';
import PlaceholderImage from './PlaceholderImage';
import PostDropdown from './PostDropdown';

const Post = ({ post, isSaved, onRemove }) => {
  return (
    <div className="w-full group">
      <div className="relative">
        <Link to={`/posts/${post.slug}`} className="block">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[180px] md:h-[250px] object-cover rounded-lg group-hover:opacity-75 transition-opacity"
          />
        </Link>
        <div className="flex pt-2">
          <Link to={`/${post.user.username}`} className="w-14">
            <PlaceholderImage
              name={post.user.name}
              avatar={post.user.avatar_url}
              placeholderColor={post.user.placeholder_color}
            />
          </Link>
          
          <div className="flex-1 flex items-center justify-between">
            <Link to={`/posts/${post.slug}`} className="flex-1">
              <h2 className="text-xl font-semibold m-0 p-0 group-hover:underline">
                {post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}
              </h2>
            </Link>
            <PostDropdown post={post} isSaved={isSaved} onRemove={onRemove} /> {/* Pass onRemove to PostDropdown */}
          </div>
        </div>
        <p className="text-gray-500">{post.user.name}</p>
      </div>
    </div>
  );
};

export default Post;
