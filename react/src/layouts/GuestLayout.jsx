import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import AuthNavbar from '../components/navbars/AuthNavbar';
import Footer from '../components/Footer';


function GuestLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
   <AuthNavbar/>
      <main className="w-full max-w-md p-6 bg-white rounded shadow-md mx-auto">
        <Outlet />
     
      </main>
      <Footer/>
    </div>
  );
}

export default GuestLayout;
