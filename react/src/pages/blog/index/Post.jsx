import React from 'react';
import { Link } from 'react-router-dom';
import PlaceholderImage from './PlaceholderImage';
import PostDropdown from './PostDropdown';

const Post = ({ post }) => {
  const handleSave = () => {
    console.log('Save post:', post.id);
  };

  const handleShare = () => {
    console.log('Share post:', post.id);
  };

  const handleNotInterested = () => {
    console.log('Not Interested in post:', post.id);
  };

  const handleReport = () => {
    console.log('Report post:', post.id);
  };

  return (
    <div className="w-full group">
      <div className="relative">
        <Link to={`/posts/${post.id}`} className="block">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[180px] md:h-[250px] object-cover rounded-lg group-hover:opacity-75 transition-opacity"
          />
        </Link>
        <div className="flex pt-2">
          <div className="w-14">
            <PlaceholderImage
              name={post.user.name}
              avatar={post.user.avatar_url}
              placeholderColor={post.user.placeholder_color} // Pass the placeholder color
            />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <Link to={`/posts/${post.id}`} className="flex-1">
              <h2 className="text-xl font-semibold m-0 p-0 group-hover:underline">
                {post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}
              </h2>
            </Link>
            <PostDropdown
              onSave={handleSave}
              onShare={handleShare}
              onNotInterested={handleNotInterested}
              onReport={handleReport}
            />
          </div>
        </div>
        <p className="text-gray-500">{post.user.name}</p>
      </div>
    </div>
  );
};

export default Post;
