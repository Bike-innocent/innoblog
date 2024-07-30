import React from 'react';
import { Link } from 'react-router-dom';
import PostActions from './PostActions';

const Post = ({ post, refreshPosts }) => {
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
          <div className="w-1/5">
            {/* PlaceholderImage component commented out */}
          </div>
          <div className="flex-1 flex items-center justify-between">
            <Link to={`/posts/${post.id}`} className="flex-1">
              <h2 className="text-xl font-semibold m-0 p-0 group-hover:underline">
                {post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}
              </h2>
            </Link>
            <PostActions
              postId={post.id}
              isPublished={post.isPublished}
              refreshPosts={refreshPosts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
