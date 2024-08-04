import React from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance.jsx';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';
import Avatar from './Avatar.jsx';

const fetchUserProfile = async (username) => {
  const response = await axiosInstance.get(`/${username}`);
  return response.data;
};

const fetchAuthUser = async () => {
  const response = await axiosInstance.get(`/profile/user`);
  return response.data;
};

const ProfileUserName = () => {
  const { username } = useParams();

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['userprofile', username],
    queryFn: () => fetchUserProfile(username),
  });

  const { data: authUser, isLoading: authLoading, isError: authError } = useQuery({
    queryKey: ['authUser'],
    queryFn: fetchAuthUser,
  });

  if (isLoading || authLoading) {
    return (
      <div className="mx-auto">
        <div className="bg-gray-200 rounded-lg p-4 h-64 md:h-96 mt-5">
          <Skeleton height="500px" width="70%" className="mb-4" />
        </div>
      </div>
    );
  }

  if (isError || authError) {
    return <div>Error fetching profile: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg flex flex-row">
        <Avatar username={username} currentAvatar={user.avatar} userName={user.name} placeholderColor={user.placeholder_color} />
        <div className='ml-3'>
          <h1 className="text-3xl font-bold mb-1 mt-3">{user.name}</h1>
          <p>@{user.username}</p>
          {authUser.username === username && (
            <Link to={`/profile/edit`} className='text-blue-500 mt-2'>edit</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUserName;
