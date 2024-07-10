import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance'; // Adjust the import path as necessary
import Modal from '../../../components/Modal';
import Processing from '../../../components/Processing'; // Import the Processing component

const DeleteUserForm = ({ className = '' }) => {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const passwordInput = useRef();
    const navigate = useNavigate();

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const response = await axiosInstance.delete('/profile/delete', {
                data: { password }
            });
            if (response.status === 200) {
                closeModal();
                navigate('/register'); // Redirect to the registration page
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error deleting user:', error);
                setErrors({ general: 'An unexpected error occurred.' });
            }
            passwordInput.current.focus();
        } finally {
            setProcessing(false);
        }
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        setPassword('');
        setErrors({});
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 mt-3">Delete Account</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
                </p>
            </header>

            <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded" onClick={confirmUserDeletion}>Delete Account</button>

            <Modal isOpen={confirmingUserDeletion} closeModal={closeModal} title="Are you sure you want to delete your account?">
                <div className="mt-2">
                    <p className="text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                    </p>
                </div>

                <form onSubmit={deleteUser} className="mt-4">
                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Password"
                        />
                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2" onClick={closeModal}>
                            Cancel
                        </button>
                        <button type="submit" className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded" disabled={processing}>
                            {processing ? <Processing text="Deleting..." /> : 'Delete Account'}
                        </button>
                    </div>
                    {errors.general && <p className="mt-2 text-sm text-red-600">{errors.general}</p>}
                </form>
            </Modal>
        </section>
    );
};

export default DeleteUserForm;
