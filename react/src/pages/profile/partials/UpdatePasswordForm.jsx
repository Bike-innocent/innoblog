import React, { useRef, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import Processing from '../../../components/Processing';

export default function UpdatePasswordForm({ className = '' }) {
    const [data, setData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const updatePassword = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const response = await axiosInstance.put('/profile/password/update', data);

            if (response.status === 200) {
                setData({
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                });
                setErrors({});
                setRecentlySuccessful(true);
                setTimeout(() => setRecentlySuccessful(false), 3000);
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error updating password:', error);
                setErrors({ general: 'An unexpected error occurred.' });
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 mt-4">Update Password</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        id="current_password"
                        name="current_password"
                        type="password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={handleChange}
                        className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        autoComplete="current-password"
                    />
                    {errors.current_password && <p className="mt-2 text-sm text-red-600">{errors.current_password}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={handleChange}
                        className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        autoComplete="new-password"
                    />
                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={handleChange}
                        className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>}
                </div>

                <div className="flex items-center gap-1">
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
