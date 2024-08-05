import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Processing from '../../../components/Processing';

export default function UpdateProfileInformation({ className = '' }) {
    const queryClient = useQueryClient();

    const { data: userProfile, error } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const response = await axiosInstance.get('/profile/user');
            return response.data;
        },
    });

    const updateUserProfile = useMutation({
        mutationFn: (newUserData) => axiosInstance.patch('/profile/update', newUserData),
        onSuccess: () => {
            queryClient.invalidateQueries(['userProfile']);
        },
    });

    const [data, setData] = useState({ name: '', email: '', username: '' });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    useEffect(() => {
        if (error) {
            console.error('Error fetching user profile:', error);
        }
        if (userProfile) {
            setData({ name: userProfile.name || '', email: userProfile.email || '', username: userProfile.username?.replace(/^@/, '') || '' });
        }
    }, [userProfile, error]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        console.log('Form data before submission:', data);

        try {
            await updateUserProfile.mutateAsync(data);
            console.log('Profile updated successfully');
            setRecentlySuccessful(true);
            setTimeout(() => setRecentlySuccessful(false), 3000);
            setErrors({});
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'An unexpected error occurred.' });
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">Update your account's profile information and email address.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={data.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">@</span>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={data.username}
                            onChange={handleChange}
                            className="pl-8 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
                </div>

                <p className="text-sm text-gray-600">URL: http://innoblog.com/@{data.username}</p>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded text-white ${processing ? 'bg-blue-500' : recentlySuccessful ? 'bg-green-500' : 'bg-blue-500'}`}
                        disabled={processing || recentlySuccessful}
                    >
                        {processing ? <Processing text="Updating..." /> : recentlySuccessful ? 'Saved.' : 'Save'}
                    </button>
                </div>
                {errors.general && <p className="mt-2 text-sm text-red-600">{errors.general}</p>}
            </form>
        </section>
    );
}
