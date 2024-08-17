import React from 'react';

const SuccessAlert = ({ message }) => {
  if (!message) return null; // Only render if there's a message

  return (
    <div className="fixed top-0 left-0 w-full bg-green-500 text-white text-center py-2">
      <p>{message}</p>
    </div>
  );
};

export default SuccessAlert;
