import React from 'react';

// Utility function to determine if the color is light or dark
const isColorLight = (color) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
};

const PlaceholderImage = ({ name, avatar, placeholderColor }) => {
  if (avatar) {
    return <img src={avatar} alt={`${name || 'User'}'s avatar`} className="w-8 h-8 ml-5 rounded-full object-cover" />;
  }

  const initial = name ? name.charAt(0).toUpperCase() : '';
  const backgroundColor = placeholderColor || ''; // Default color if none provided
  const textColor = isColorLight(backgroundColor) ? 'text-black' : 'text-white';

  return (
    <div
      className={`w-8 h-8 rounded-full ml-5  ${textColor} flex items-center justify-center`}
      style={{
        backgroundColor,
        fontSize: '1rem', // Adjust this value to fit your needs
        lineHeight: '1' // Ensures initial is centered vertically
      }}
    >
      {initial}
    </div>
  );
};

export default PlaceholderImage;
