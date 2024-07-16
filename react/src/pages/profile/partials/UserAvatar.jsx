import React, { useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog } from '@headlessui/react';
import { FaCamera } from 'react-icons/fa';
import Processing from '../../../components/Processing';

const fetchAvatar = async () => {
    const response = await axiosInstance.get('/profile/avatar');
    return response.data;
};

const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await axiosInstance.post('/profile/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

const deleteAvatar = async () => {
    await axiosInstance.delete('/profile/avatar');
};

const UserAvatar = ({ currentAvatar, userName }) => {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    const { data, isError, error: fetchError, isLoading } = useQuery({
        queryKey: ['avatar'],
        queryFn: fetchAvatar,
        initialData: { avatar: currentAvatar, name: userName },
    });

    const uploadMutation = useMutation({
        mutationFn: uploadAvatar,
        onSuccess: (data) => {
            queryClient.setQueryData(['avatar'], data);
        },
        onError: (error) => {
            if (error.response && error.response.data && error.response.data.errors) {
                setError('Failed to update avatar: ' + error.response.data.errors.avatar[0]);
            } else {
                console.error('Failed to update avatar:', error);
                setError('An unexpected error occurred.');
            }
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteAvatar,
        onSuccess: () => {
            queryClient.setQueryData(['avatar'], { avatar: null, name: data.name });
            setShowModal(false);
        },
        onError: (error) => {
            console.error('Failed to delete avatar:', error);
            setError('An unexpected error occurred.');
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadMutation.mutate(file);
        }
    };

    const handleDelete = () => {
        deleteMutation.mutate();
    };

    if (isLoading) {
        return <Processing text="Loading avatar..." />;
    }

    if (isError) {
        return <p className="text-red-500">Failed to load avatar: {fetchError.message}</p>;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
                {data.avatar ? (
                    <img
                        src={data.avatar}
                        alt={data.name}
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
           
            {data.avatar && (
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
                                    disabled={deleteMutation.isLoading}
                                >
                                    {deleteMutation.isLoading ? <Processing text="Deleting..." /> : 'Yes, Delete'}
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
