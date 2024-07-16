


import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Processing from '../../../components/Processing';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const queryClient = useQueryClient();

    // Fetch user profile data query
    const { data: userProfile } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const response = await axiosInstance.get('/profile/user');
            return response.data.user;
        },
    });

    // Mutation to update user profile data
    const updateUserProfile = useMutation({
        mutationFn: (newUserData) => axiosInstance.patch('/profile/update', newUserData),
        onSuccess: () => {
            queryClient.invalidateQueries(['userProfile']); // Invalidate cache to refetch data
        },
    });

    const [data, setData] = useState({
        name: '',
        email: '',
    });

    useEffect(() => {
        if (userProfile) {
            setData({
                name: userProfile.name || '',
                email: userProfile.email || '',
            });
        }
    }, [userProfile]);

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            await updateUserProfile.mutateAsync(data);
            setRecentlySuccessful(true);
            setTimeout(() => setRecentlySuccessful(false), 3000);
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error updating profile:', error);
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
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>

                {mustVerifyEmail && data.email && !userProfile?.email_verified_at && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <button
                                type="button"
                                onClick={() => axiosInstance.post('/verification/send')}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </button>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

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
