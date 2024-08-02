
import React from 'react';
import { Link } from 'react-router-dom';
import { Chip } from '@nextui-org/react';
import PostActions from './PostActions';

const Draft = ({ post, refreshPosts }) => {
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
          <div className="w-10 pt-1">
            {post.status === 1 ? (
              <Chip
                className="capitalize"
                color="success"
                size="sm"
                variant="dot"
                border="success"
              >
              </Chip>
            ) : (
              <Chip
                className="capitalize"
                color="warning"
                size="sm"
                variant="dot"
                border="warning"
              >
              </Chip>
            )}
          </div>
          <div className="flex-1 flex justify-between">
            <Link to={`/posts/${post.slug}`} className="flex-1">
              <h2 className="text-xl font-semibold m-0 p-0 group-hover:underline">
                {post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}
              </h2>
            </Link>
            <PostActions
              postId={post.slug}
              isPublished={post.status === 1}
              refreshPosts={refreshPosts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;
