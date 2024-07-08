import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import GuestLayout from './layouts/GuestLayout';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import About from './pages/About';
import Category from './pages/Category';
import Blog from './pages/Blog';
import Home from './pages/dashboard/Home';
import Profile from './pages/dashboard/Profile';
import CreatePost from './pages/dashboard/CreatePost';
import AllPosts from './pages/dashboard/AllPosts';
import AllUsers from './pages/dashboard/AllUsers';
import Settings from './pages/dashboard/Settings';
import MyPost from './pages/dashboard/MyPost';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

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
      { path: 'dashboard', element: <DashboardLayout /> },
      { path: 'about', element: <About /> },
      { path: 'category', element: <Category /> },
      { path: 'blog', element: <Blog /> },
      { path: 'unauthorized', element: <Unauthorized /> },
      { path: 'not-found', element: <NotFound /> },
      { path:"*", element: <NotFound /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'profile', element: <Profile /> },
      { path: 'create-post', element: <CreatePost /> },
      { path: 'all-posts', element: <AllPosts/> },
      { path: 'all-users', element: <AllUsers /> },
      { path: 'settings', element: <Settings /> },
      { path: 'my-post', element: <MyPost /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
