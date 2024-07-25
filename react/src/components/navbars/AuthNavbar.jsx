import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@nextui-org/react';
import axiosInstance from '../../axiosInstance'; // Adjust the path as needed
import { SearchIcon } from '../../pages/dashboard/SearchIcon';
import { CancelIcon } from '../../pages/dashboard/CancelIcon'; // Assume you have a CancelIcon component

function AuthNavbar({ isSidebarOpen, toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to manage search input visibility

  const navigate = useNavigate();

  const fetchUserData = async () => {
    const response = await axiosInstance.get('/profile/user');
    return response.data.user;
  };

  const { data: user, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserData,
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  if (error) {
    console.error('Error fetching user data:', error);
  }

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div>
      <nav className="bg-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isSidebarOpen ? 'hidden' : 'block'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <NavLink
                to="/home"
                className="hidden sm:flex flex-shrink-0 items-center text-white text-xl font-bold"
              >
                Innoblog
              </NavLink>
              <div className="flex justify-center items-center flex-1 sm:ml-6 w-24 relative">
                <div className="hidden sm:block">
                  <Input
                    isClearable
                    fullWidth
                    radius="md"
                    size="md"
                    classNames={{
                      label: "text-black/50 dark:text-white/90",
                      input: [
                        "bg-transparent",
                        "text-black dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                      ],
                      innerWrapper: "bg-transparent",
                      inputWrapper: [
                        "bg-gray-100",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focus=true]:bg-default-200/50",
                        "dark:group-data-[focus=true]:bg-default/60",
                        "!cursor-text",
                      ],
                    }}
                    placeholder="Type to search..."
                    startContent={
                      <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 pointer-events-none flex-shrink-0" />
                    }
                  />
                </div>
                <div className="block sm:hidden">
                  {isSearchOpen ? (
                    <div className="absolute inset-0 z-50 flex items-center bg-gray-800 p-2 rounded-lg">
                      <Input
                        isClearable
                        radius="md"
                        size="md"
                        classNames={{
                          label: "text-black/50 dark:text-white/90",
                          input: [
                            "bg-transparent",
                            "text-black dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                          ],
                          innerWrapper: "bg-transparent",
                          inputWrapper: [
                            "bg-gray-100",
                            "dark:bg-default/60",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-default-200/70",
                            "dark:hover:bg-default/70",
                            "group-data-[focus=true]:bg-default-200/50",
                            "dark:group-data-[focus=true]:bg-default/60",
                            "!cursor-text",
                          ],
                        }}
                        placeholder="Type to search..."
                        startContent={
                          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 pointer-events-none flex-shrink-0" />
                        }
                        endContent={
                          <button onClick={handleSearchToggle}>
                            <CancelIcon className="text-black/50 dark:text-white/90 pointer-events-none flex-shrink-0" />
                          </button>
                        }
                      />
                    </div>
                  ) : (
                    <button onClick={handleSearchToggle}>
                      <SearchIcon className="text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
              >
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.003 6.003 0 00-4-5.659V4a2 2 0 10-4 0v1.341C8.67 6.165 8 7.482 8 9v5.159c0 .538-.214 1.055-.595 1.436L6 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    {user?.avatar ? (
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user.avatar}
                        alt=""
                      />
                    ) : (
                      <span className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-500 text-white">
                        {getUserInitial(user?.name)}
                      </span>
                    )}
                  </button>
                </div>
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <NavLink
                      to="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-1"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AuthNavbar;
