// src/components/Loader.jsx
import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
    );
};

export default Loader;
