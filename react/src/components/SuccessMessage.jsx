// src/components/SuccessMessage.jsx
import React, { useEffect } from 'react';

const SuccessMessage = ({ message, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-3 mt-1">
            {message}
        </div>
    );
};

export default SuccessMessage;
