import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import AuthNavbar from '../components/navbars/AuthNavbar';
import Footer from '../components/Footer';
import Guest from '../components/navbars/Guest';


function GuestLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
   <Guest/>
      <main className="w-full max-w-md p-6 bg-white rounded shadow-md mx-auto">
        <Outlet />
     
      </main>
      <Footer/>
    </div>
  );
}

export default GuestLayout;
