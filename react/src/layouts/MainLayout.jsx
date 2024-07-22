import React from 'react';
import { Outlet } from 'react-router-dom';

import AuthNavbar from '../components/navbars/AuthNavbar';
import Footer from '../components/Footer';

import CategoryNav from '../pages/CategoryNav';
import CategoryHome from '../pages/CategoryHome';

function MainLayout() {




  return (
    <div className="min-h-screen flex flex-col justify-between">
      <AuthNavbar />
      <CategoryNav />
      {/* <CategoryHome /> */}

      <main className="flex-1 ">
        <Outlet />
    
      </main>
      {/* <CategoryNav/> */}
      <Footer />
    </div>
  );
}

export default MainLayout;
