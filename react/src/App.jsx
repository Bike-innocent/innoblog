import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import GuestLayout from './layouts/GuestLayout';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';
import Category from './pages/Category';


import CreatePost from './pages/dashboard/CreatePost';
import AllPosts from './pages/dashboard/all-posts/AllPosts';
import AllUsers from './pages/dashboard/AllUsers';
import Settings from './pages/dashboard/Settings';
import MyPost from './pages/dashboard/my-post/MyPost';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import EditProfile from './pages/profile/EditProfile';
import Index from './pages/blog/Index';

import SinglePost from './pages/singlePost/SinglePost';
import IndexCategory from './pages/dashboard/categories/IndexCategory';
import EditPost from './pages/dashboard/EditPost';
import ViewPost from './pages/dashboard/ViewPost';
import CategoryHome from './pages/CategoryHome';
import SubCategoryHome from './pages/SubCategoryHome';
import Dashboard from './pages/dashboard/Dasboard';
import Profile from './pages/profile/partials/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard />  },
      { path: 'about', element: <About /> },
      { path: 'category', element: <Category /> },
      { path: 'home', element: <Index /> },
      { path: '/posts/:slug', element: <SinglePost /> },
      { path: 'profile', element: <EditProfile /> },
      { path: '/profile/:username', element: <Profile /> },
      { path: 'create-post', element: <CreatePost /> },
      { path: 'all-posts', element: <AllPosts /> },
      { path: 'all-users', element: <AllUsers /> },
      { path: 'settings', element: <Settings /> },
      { path: 'my-post', element: <MyPost /> },
      { path: 'edit-post/:slug', element: <EditPost/> },
      { path: 'view-post/:slug', element: <ViewPost/> },
      { path: 'manage-category', element: <IndexCategory /> },
      { path: 'unauthorized', element: <Unauthorized /> },
      { path: 'not-found', element: <NotFound /> },
      { path: 'category/:categorySlug', element: <CategoryHome /> },
      { path: 'categories/:categorySlug/subcategories/:subcategorySlug', element :<SubCategoryHome />} ,

    ],
  },

]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
