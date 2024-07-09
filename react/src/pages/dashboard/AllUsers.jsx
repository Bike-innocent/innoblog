import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import SuccessMessage from '../../components/SuccessMessage';
import Loader from '../../components/Loader';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/all-users');
            console.log('Response data:', response.data); // Debugging line
            setUsers(response.data.users || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
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
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{Array.isArray(user.roles) ? user.roles.join(', ') : user.roles}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
};

export default AllUsers;
