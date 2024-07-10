import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; // Import your axios instance

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/forgot-password', { email });
      setMessage(response.data.message);
      setIsSuccess(true);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
      setIsSuccess(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-center ${isSuccess ? 'text-green-700' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ForgotPassword;
