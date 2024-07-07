import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting, AiOutlineMenu } from 'react-icons/ai';
import { BsPencilSquare, BsPeople, BsJournalText, BsGear, BsBoxArrowRight } from 'react-icons/bs';
import { NavLink, Outlet } from 'react-router-dom';

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col md:w-1/5`}>
                <div className="flex items-center justify-between px-4 py-3 text-white bg-gray-900">
                    <span className="text-xl font-semibold md:hidden">Dashboard</span>
                    <button className="md:hidden bg-gray-900 p-2 rounded" onClick={toggleSidebar}>
                        <AiOutlineMenu size={24} />
                    </button>
                </div>
                <div className="flex flex-col flex-1 mt-2 overflow-y-auto">
                    <nav className="flex-1 mt-4 space-y-2">
                        <NavLink
                            to="/dashboard/home"
                            className={({ isActive }) => isActive ? "flex items-center px-4 py-2 bg-gray-700 text-white" : "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"}
                        >
                            <AiOutlineHome className="mr-2" size={20} /> Home
                        </NavLink>
                        <NavLink
                            to="/dashboard/profile"
                            className={({ isActive }) => isActive ? "flex items-center px-4 py-2 bg-gray-700 text-white" : "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"}
                        >
                            <AiOutlineUser className="mr-2" size={20} /> Profile
                        </NavLink>
                        <NavLink
                            to="/dashboard/create-post"
                            className={({ isActive }) => isActive ? "flex items-center px-4 py-2 bg-gray-700 text-white" : "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"}
                        >
                            <BsPencilSquare className="mr-2" size={20} /> Create Post
                        </NavLink>
                        <NavLink
                            to="/dashboard/all-posts"
                            className={({ isActive }) => isActive ? "flex items-center px-4 py-2 bg-gray-700 text-white" : "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"}
                        >
                            <BsJournalText className="mr-2" size={20} /> All Posts
                        </NavLink>
                        <NavLink
                            to="/dashboard/all-users"
                            className={({ isActive }) => isActive ? "flex items-center px-4 py-2 bg-gray-700 text-white" : "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"}
                        >
                            <BsPeople className="mr-2" size={20} /> All Users
                        </NavLink>
                        <NavLink
                            to="/dashboard/settings"
                            className={({ isActive }) => isActive ? "flex items-center px-4 py-2 bg-gray-700 text-white" : "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"}
                        >
                            <BsGear className="mr-2" size={20} /> Settings
                        </NavLink>
                        <NavLink
                            to="/dashboard/logout"
                            className={({ isActive }) => isActive ? "flex items-center px-4 py-2 bg-gray-700 text-white" : "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"}
                        >
                            <BsBoxArrowRight className="mr-2" size={20} /> Log out
                        </NavLink>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 md:ml-1/5">
                <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white shadow-md md:hidden">
                    <button className="md:hidden" onClick={toggleSidebar}>
                        <AiOutlineMenu size={24} />
                    </button>
                    <span className="text-xl font-semibold">Dashboard</span>
                </header>
                <main className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
