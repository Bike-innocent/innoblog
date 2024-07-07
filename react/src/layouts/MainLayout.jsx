import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import Auth from '../components/navbars/Auth';

function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
     <Auth/>
      <main className="flex-1 ">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2024 Your Company
      </footer>
    </div>
  );
}

export default MainLayout;
