import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-2); // Go back to the previous page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">401 - Unauthorized</h1>
        <p className="text-lg text-gray-700 mb-6">
          You do not have the necessary permissions to access this page.
        </p>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
