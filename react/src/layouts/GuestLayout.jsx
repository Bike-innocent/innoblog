import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import Auth from '../components/navbars/Auth';


function GuestLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
   <Auth/>
      <main className="w-full max-w-md p-6 bg-white rounded shadow-md mx-auto">
        <Outlet />
     
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2024 Your Company
      </footer>
    </div>
  );
}

export default GuestLayout;
