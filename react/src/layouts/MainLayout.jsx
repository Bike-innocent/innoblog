import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import AuthNavbar from '../components/navbars/AuthNavbar';
import Footer from '../components/Footer';

function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <AuthNavbar/>
      <main className="flex-1 ">
        <Outlet />
      </main>
     <Footer/>
    </div>
  );
}

export default MainLayout;
