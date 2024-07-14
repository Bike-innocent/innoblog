import React, { useEffect } from 'react';

const SuccessMessage = ({ message, onClose, isError }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const messageStyles = isError
    ? 'bg-red-100 border border-red-400 text-red-700'
    : 'bg-green-100 border border-green-400 text-green-700';

  return (
    <div className={`${messageStyles} px-4 py-3 rounded relative mb-3 mt-1`}>
      {message}
    </div>
  );
};

export default SuccessMessage;
