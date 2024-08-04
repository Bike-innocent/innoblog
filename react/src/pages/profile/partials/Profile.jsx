import React from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';

const fetchUserProfile = async (username) => {
  const response = await axiosInstance.get(`/${username}`);
  return response.data;
};

const Profile = () => {
  const { username } = useParams();

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['userprofile', username],
    queryFn: () => fetchUserProfile(username),
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
      <div className="bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-1 mt-3">{user.name}</h1>
        <h2  style={{ backgroundColor: user.placeholder_color }}>@{user.username}</h2>
        <div className="relative">
          <img
            src={user.avatar_url}
            alt={`${user.username}'s avatar`}
            className="w-full h-64 md:h-96 object-cover mb-4"
            style={{ borderColor: user.placeholder_color }}
          />
        </div>

        {/* Add other profile details here */}
      </div>
    </div>
  );
};

export default Profile;
