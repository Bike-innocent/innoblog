// import React from 'react';
// import { useParams } from 'react-router-dom';
// import axiosInstance from '../../../axiosInstance';
// import { useQuery } from '@tanstack/react-query';
// import { Skeleton } from '@nextui-org/react';

// const fetchPost = async (slug) => {
//   const response = await axiosInstance.get(`/blog/show/posts/${slug}`);
//   return response.data;
// };

// const SinglePostHeaderSection = () => {
//   const { slug } = useParams();

//   const { data: post, isLoading, isError, error } = useQuery({
//     queryKey: ['post', slug],
//     queryFn: () => fetchPost(slug),
//   });

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
//   };

//   if (isLoading) {
//     return (
//       <div className="mx-auto">
//         <div className="bg-gray-200 rounded-lg p-4 h-64 md:h-96 mt-5">
//           <Skeleton height="500px" width="70%" className="mb-4" />
          
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return <div>Error fetching post: {error.message}</div>;
//   }

//   if (!post) {
//     return <div>Post not found</div>;
//   }

//   return (
//     <div className="container mx-auto">
//       <div className="bg-white rounded-lg">
//         <h1 className="text-3xl font-bold mb-1 mt-3">{post.title}</h1>
//         <div className="relative">
//           <img
//             src={post.image}
//             alt={post.title}
//             className="w-full h-64 md:h-96 object-cover rounded-lg mb-4"
//           />
//           <div className="absolute top-2 right-2 bg-white bg-opacity-75 text-black text-sm p-1 rounded">
//             {post.category.name} | {formatDate(post.created_at)}
//           </div>
//         </div>
//         <p className="text-gray-700">{post.content}</p>
//       </div>
//     </div>
//   );
// };

// export default SinglePostHeaderSection;









import React from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';

const fetchPost = async (slug) => {
  const response = await axiosInstance.get(`/blog/show/posts/${slug}`);
  return response.data;
};

const SinglePostHeaderSection = () => {
  const { slug } = useParams();

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="mx-auto">
        <div className="bg-gray-200 rounded-lg p-4 h-64 md:h-96 mt-5">
          <Skeleton height="500px" width="70%" className="mb-4" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching post: {error.message}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-1 mt-3">{post.title}</h1>
        <div className="relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover  mb-4"
          />
          <div className="absolute top-2 right-2 bg-white bg-opacity-75 text-black text-sm p-1 rounded">
            {post.category.name} | {formatDate(post.created_at)}
          </div>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
};

export default SinglePostHeaderSection;
