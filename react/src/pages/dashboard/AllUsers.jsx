import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import SuccessMessage from '../../components/SuccessMessage';
import Loader from '../../components/Loader';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const fetchUsers = async (page) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/all-users?page=${page}`);
            console.log('Response data:', response.data); // Debugging line
            setUsers(response.data.data || []);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">All Users</h1>
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('')} />
            {loading ? (
                <Loader />
            ) : (
                <>
                    {users.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        <>
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Roles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{index + 1 + (currentPage - 1) * 10}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.roles.join(', ')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center mt-4">
                                {/* Pagination for Desktop */}
                                <div className="hidden sm:flex">
                                    {Array.from({ length: lastPage }, (_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                                {/* Pagination for Mobile */}
                                <div className="flex sm:hidden">
                                    <button
                                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                        className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700"
                                        disabled={currentPage === 1}
                                    >
                                        &larr; Previous
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(Math.min(currentPage + 1, lastPage))}
                                        className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700"
                                        disabled={currentPage === lastPage}
                                    >
                                        Next &rarr;
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default AllUsers;
