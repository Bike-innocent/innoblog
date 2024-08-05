import React from 'react';
import axiosInstance from '../../../axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';
import Avatar from './Avatar.jsx';
import { Link } from 'react-router-dom';
import MyPost from '../../dashboard/my-post/MyPost.jsx';

const fetchUserProfile = async () => {
  const response = await axiosInstance.get(`/profile/user`);
  return response.data;
};

const Profile = () => {
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['profile2'],
    queryFn: fetchUserProfile,
  });

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
    return <div>Error fetching profile: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg flex flex-row">
        <Avatar currentAvatar={user.avatar} userName={user.name} placeholderColor={user.placeholder_color} />
        <div className='ml-3'>
          <h1 className="text-3xl font-bold mb-1 mt-3">{user.name}</h1>
          <p>{user.username}</p>
          
          <Link to={`/profile/edit`} className='text-blue-500 mt-2'>edit</Link>
        </div>
      </div>
      <MyPost/>
    </div>
  );
};

export default Profile;
