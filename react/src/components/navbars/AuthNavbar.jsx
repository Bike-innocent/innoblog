import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineSun, AiOutlineMoon } from 'react-icons/ai';

function AuthNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark'); // Default to dark theme
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div>
      <nav className="bg-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">

          {/*togle button for mobile menu*/}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
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
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
              {/* end togle button for mobile menu*/}

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0">
                {/* Your Company logo or name */}
                <p className="text-white font-bold text-2xl">Innoblog</p>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                <NavLink
                  to="/dashboard/home"
                  className={({ isActive }) => isActive ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/blog"
                  className={({ isActive }) => isActive ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
                >
                  Blog
                </NavLink>
                <NavLink
                  to="/category"
                  className={({ isActive }) => isActive ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
                >
                  Category
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) => isActive ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
                >
                  About
                </NavLink>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Theme toggle button */}
              <button
                type="button"
                className="bg-gray-800 dark:bg-gray-900 text-gray-100 p-1 rounded-full hover:text-white focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <AiOutlineSun className="h-6 w-6" />
                ) : (
                  <AiOutlineMoon className="h-6 w-6" />
                )}
              </button>

              {/* Notification button */}
              <button
                type="button"
                className="relative bg-gray-800 dark:bg-gray-900 text-gray-100 p-1 rounded-full hover:text-white focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900"
              >
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 5a3 3 0 11-6 0 3 3 0 016 0zM5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="bg-gray-800 dark:bg-gray-900 text-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900"
                    id="user-menu-button"
                    aria-expanded={isDropdownOpen ? "true" : "false"}
                    onClick={toggleDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User profile"
                    />
                  </button>
                </div>

                {/* Dropdown menu, show/hide based on dropdown state */}
                {isDropdownOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                      onClick={toggleDropdown}
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                      onClick={toggleDropdown}
                    >
                      Settings
                    </a>
                    <p
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Sign out
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, toggle classes based on menu state */}
        <div
          className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/dashboard/home"  onClick={toggleMobileMenu}
              className={({ isActive }) => isActive ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/blog"  onClick={toggleMobileMenu}
              className={({ isActive }) => isActive ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}
            >
              Blog
            </NavLink>
            <NavLink
              to="/category"  onClick={toggleMobileMenu}
              className={({ isActive }) => isActive ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}
            >
              Category
            </NavLink>
            <NavLink
              to="/about"  onClick={toggleMobileMenu}
              className={({ isActive }) => isActive ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}
            >
              About
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AuthNavbar;
