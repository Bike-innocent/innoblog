import React from 'react';

const PlaceholderImage = ({ name, avatar }) => {
  console.log('PlaceholderImage props:', { name, avatar }); // Log the props

  if (avatar) {
    return <img src={avatar} alt={`${name}'s avatar`} className="w-10 h-10 rounded-full" />;
  }

  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center">
      {initial}
    </div>
  );
};

export default PlaceholderImage;
