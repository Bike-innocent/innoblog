import React from 'react';
import UsersList from '../components/UsersList';
import PostsList from '../components/PostsList';

function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
      <p className="text-lg">This is a protected area. Only logged-in users can see this.</p>
      {/* <UsersList /> */}
      <PostsList />
    </div>
  );
}

export default Dashboard;
