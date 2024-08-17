

import React from 'react';
import { Link } from 'react-router-dom';
import PostActions from './PostActions';
import PlaceholderImage from './PlaceholderImage';

const Post = ({ post, refreshPosts }) => {
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
                            placeholderColor={post.user.placeholder_color} // Pass the placeholder color
                        />
                    </Link>

                    <div className="flex-1 flex justify-between">
                        <Link to={`/posts/${post.slug}`} className="flex-1">
                            <h2 className="text-xl font-semibold m-0 p-0 group-hover:underline">
                                {post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}
                            </h2>
                        </Link>
                        <PostActions
                            postSlug={post.slug}
                            isPublished={post.status === 1}
                            refreshPosts={refreshPosts}
                        />
                    </div>
                </div>
                <p className="text-gray-500"> {post.user.name}</p>
            </div>
        </div>
    );
};

export default Post;
