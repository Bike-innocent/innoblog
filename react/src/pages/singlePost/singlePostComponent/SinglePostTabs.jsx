


import React from 'react';
import { Tab } from '@headlessui/react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';

const fetchRelatedPosts = async (slug) => {
  const response = await axiosInstance.get(`/blog/related/${slug}`);
  return response.data.relatedPosts || [];
};

function SinglePostTabs() {
  const { slug } = useParams();

  const {
    data: relatedPosts = [],
    isLoading: relatedLoading,
    isError: relatedError,
    error: relatedErrorMessage,
  } = useQuery({
    queryKey: ['relatedPosts', slug],
    queryFn: () => fetchRelatedPosts(slug),
    enabled: !!slug, // Only run query if slug is not null or undefined
  });

  return (
    <Tab.Group>
      <Tab.List className="flex p-1 space-x-1">
        <Tab
          key="related"
          className={({ selected }) =>
            selected
              ? 'w-full py-2.5 text-sm leading-5 font-medium border-b-2 border-blue-500'
              : 'w-full py-2.5 text-sm leading-5 font-medium border-b-2'
          }
        >
          Related Posts
        </Tab>
      </Tab.List>
      <Tab.Panels className="mt-2">
        <Tab.Panel key="related" className="bg-white rounded-xl ">
          {relatedLoading && (
            <>
              <div className="bg-gray-200 h-24 border-b border rounded-lg">
                <Skeleton height="50px" width="100%" className="mb-4" />
              </div>

              <div className="bg-gray-200 h-24 mt-3 border-b border rounded-lg">
                <Skeleton height="50px" width="100%" className="mb-4" />
              </div>
              <div className="bg-gray-200 h-24 mt-3 border-b border rounded-lg">
                <Skeleton height="50px" width="100%" className="mb-4" />
              </div>
              <div className="bg-gray-200 h-24 mt-3 border-b border">
                <Skeleton height="50px" width="100%" className="mb-4" />
              </div>
            </>
          )}
          {relatedError && <div>Error fetching related posts: {relatedErrorMessage.message}</div>}
          {!relatedLoading && !relatedError && relatedPosts.map((post) => (
            <Link to={`/posts/${post.slug}`} key={post.slug} className="block border-b pb-4 mb-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="text-gray-500 text-sm">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                  </div>
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  {post.user && (
                    <div className="text-gray-700 text-sm">{post.user.name}</div>
                  )}
                </div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-24 h-16 object-cover  ml-4 rounded-md"
                />
              </div>
            </Link>
          ))}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default SinglePostTabs;
