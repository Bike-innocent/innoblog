import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Dialog } from '@headlessui/react';
import { FaCamera } from 'react-icons/fa';
import Processing from '../../../components/Processing';

const UserAvatar = ({ currentAvatar, userName }) => {
    const [avatar, setAvatar] = useState(currentAvatar);
    const [name, setName] = useState(userName);
    const [showModal, setShowModal] = useState(false);
    const [avatarProcessing, setAvatarProcessing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!avatar) {
            fetchAvatar();
        }
    }, []);

    const fetchAvatar = async () => {
        try {
            const response = await axiosInstance.get('/profile/avatar');
            setAvatar(response.data.avatar);
            setName(response.data.name);
        } catch (error) {
            console.error('Failed to fetch avatar:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleUpload(file);
        }
    };

    const handleUpload = async (file) => {
        setAvatarProcessing(true);
        setError('');

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await axiosInstance.post('/profile/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setAvatar(response.data.avatar);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setError('Failed to update avatar: ' + error.response.data.errors.avatar[0]);
            } else {
                console.error('Failed to update avatar:', error);
                setError('An unexpected error occurred.');
            }
        } finally {
            setAvatarProcessing(false);
        }
    };

    const handleDelete = async () => {
        setAvatarProcessing(true);
        setError('');

        try {
            await axiosInstance.delete('/profile/avatar');
            setAvatar(null);
            setShowModal(false);
        } catch (error) {
            console.error('Failed to delete avatar:', error);
            setError('An unexpected error occurred.');
        } finally {
            setAvatarProcessing(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
                {avatar ? (
                    <img
                        src={avatar}
                        alt={name}
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        No Avatar
                    </div>
                )}
                <label htmlFor="avatar" className="absolute bottom-0 right-0 p-2 bg-gray-700 text-white rounded-full cursor-pointer">
                    <FaCamera />
                </label>
                <input type="file" id="avatar" className="hidden" onChange={handleImageChange} />
            </div>
           
            {avatar && (
                <button
                    onClick={() => setShowModal(true)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                    Delete Avatar
                </button>
            )}
            {error && <p className="mt-2 text-red-500">{error}</p>}

            {showModal && (
                <Dialog open={showModal} onClose={() => setShowModal(false)}>
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white p-4 rounded shadow">
                            <Dialog.Title className="text-lg font-medium text-gray-900">Delete Avatar</Dialog.Title>
                            <Dialog.Description className="mt-2 text-sm text-gray-600">
                                Are you sure you want to delete your avatar?
                            </Dialog.Description>
                            <div className="mt-4 flex space-x-2">
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                    disabled={avatarProcessing}
                                >
                                    {avatarProcessing ? <Processing text="Deleting..." /> : 'Yes, Delete'}
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}
        </div>
    );
};

export default UserAvatar;
