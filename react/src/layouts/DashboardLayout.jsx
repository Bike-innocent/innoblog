import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BsPencilSquare, BsJournalText, BsPeople, BsGear, BsBoxArrowRight, BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import AuthNavbar from '../components/navbars/AuthNavbar';
import Footer from '../components/Footer';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';
import axios from 'axios';

function fetchUser() {
  return axiosInstance.get('/profile/user').then((response) => response.data.user);
}

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const handleLogout = async () => {
  //   try {
  //     await axiosInstance.post('/logout'); // Assuming you have a logout endpoint in your API
  //     localStorage.removeItem('authToken');
  //     document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  //     navigate('/login');
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //   }
  // };
  

  const handleLogout = async () => {
      try {
          const response = await axios.post('http://localhost:8000/api/logout', {}, {
              withCredentials: true,
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          console.log('Logged out:', response.data);
          // Handle successful logout here
      } catch (error) {
          console.error('Error logging out:', error);
          // Handle logout error here
      }
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user data</div>;
  }

  return (
    <>
      <AuthNavbar />
      <div className="flex bg-gray-100">
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 shadow-lg transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:sticky md:h-screen md:translate-x-0 md:flex md:flex-col md:w-1/5`}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white bg-gray-900">
            <span className="text-xl font-semibold md:hidden">Dashboard</span>
            <button className="md:hidden bg-gray-900 p-2 rounded" onClick={toggleSidebar}>
              <BsArrowLeft size={24} />
            </button>
          </div>
          <div className="flex flex-col flex-1 mt-2 overflow-y-auto">
            <nav className="flex-1 mt-4 space-y-2">
              <NavLink
                to="/dashboard/home"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center px-4 py-2 bg-blue-500 text-white'
                    : 'flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              >
                <AiOutlineHome className="mr-2" size={20} /> Dashboard
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center px-4 py-2 bg-blue-500 text-white'
                    : 'flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              >
                <AiOutlineUser className="mr-2" size={20} /> Profile
              </NavLink>
              <NavLink
                to="/dashboard/my-post"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center px-4 py-2 bg-blue-500 text-white'
                    : 'flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              >
                <AiOutlineUser className="mr-2" size={20} /> My Post
              </NavLink>
              <NavLink
                to="/dashboard/create-post"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center px-4 py-2 bg-blue-500 text-white'
                    : 'flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              >
                <BsPencilSquare className="mr-2" size={20} /> Create Post
              </NavLink>
              {user && user.roles && user.roles.some((role) => role.name === 'admin') && (
                <>
                  <NavLink
                    to="/dashboard/all-posts"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      isActive
                        ? 'flex items-center px-4 py-2 bg-blue-500 text-white'
                        : 'flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  >
                    <BsJournalText className="mr-2" size={20} /> All Posts
                  </NavLink>
                  <NavLink
                    to="/dashboard/all-users"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      isActive
                        ? 'flex items-center px-4 py-2 bg-blue-500 text-white'
                        : 'flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  >
                    <BsPeople className="mr-2" size={20} /> All Users
                  </NavLink>

                  <NavLink
                    to="/dashboard/manage-category"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      isActive
                        ? 'flex items-center px-4 py-2 bg-blue-500 text-white'
                        : 'flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  >
                    <BsPeople className="mr-2" size={20} /> Manage Category
                  </NavLink>
                </>
              )}
              <NavLink
                to="/dashboard/settings"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center px-4 py-2 bg-blue-500 text-white'
                    : 'flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              >
                <BsGear className="mr-2" size={20} /> Settings
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  toggleSidebar();
                }}
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white w-full"
              >
                <BsBoxArrowRight className="mr-2" size={20} /> Logout
              </button>
            </nav>
          </div>
        </div>

        <div className="flex flex-col flex-1 md:ml-1/5">
          <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white shadow-md md:hidden">
            <button className="md:hidden" onClick={toggleSidebar}>
              <BsArrowRight size={24} />
            </button>
            <span className="text-xl font-semibold">Dashboard</span>
          </header>
          <main className="flex-1 overflow-y-auto p-4 min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardLayout;
