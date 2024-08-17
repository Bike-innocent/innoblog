import React from 'react';
import axiosInstance from '../../../axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';
import Avatar from './Avatar.jsx';
import { Link } from 'react-router-dom';
import MyPost from '../../my-post/MyPost.jsx';

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
        <section id="hero-slider">
        <div className="mx-auto flex flex-row">
            <div className="bg-gray-200  pr-4 rounded-full w-32 h-32 mt-5">
                <Skeleton height="100px" width="70%" className="mb-4" />
            </div>
            <div className="w-2/5 mt-2">

                <div className="bg-gray-200 rounded-lg  ml-3 pl-4 h-8  mt-5">
                    <Skeleton height="100px" width="70%" className="mb-4" />
                </div>
                <div className="bg-gray-200 rounded-lg  ml-3 pl-4 h-8 mt-5">
                    <Skeleton height="100px" width="70%" className="mb-4" />
                </div>
            </div>
        </div>
        <div className="container mx-auto my-4" data-aos="fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <div key={index} className="w-full group">
                        <div className="block">
                            <Skeleton className="w-full h-[180px] md:h-[250px] object-cover rounded-lg" />
                            <div className="flex pt-2">
                                
                                <div className="flex flex-col w-full">
                                    <Skeleton className="h-5 w-full rounded-lg" />
                                    <Skeleton className="h-4 w-3/4 mt-1 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
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
