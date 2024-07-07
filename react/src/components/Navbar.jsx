import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav>
      <ul>
        {isAuthenticated ? (
          <>
            <header className="bg-blue-500 text-white p-4">
              <nav className="container mx-auto flex space-x-3">
                <Link to="/dashboard" className="hover:bg-blue-800 p-2">Dashboard</Link>
                <button onClick={handleLogout} className="hover:bg-blue-800 p-2">Logout</button>
              </nav>
            </header>
          </>
        ) : (
          <>
           <header className="bg-blue-500 text-white p-4">
        <nav className="container mx-auto flex space-x-3">
          <Link to="/register" className="hover:bg-blue-800 p-2">Register</Link>
          <Link to="/login" className="hover:bg-blue-800 p-2">Login</Link>
        </nav>
      </header>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
