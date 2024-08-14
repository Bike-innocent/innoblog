import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { BsThreeDotsVertical, BsBookmarkFill, BsShare } from 'react-icons/bs';
import axiosInstance from '../../axiosInstance'; // Ensure axiosInstance is correctly set up

const PostDropdown = ({ post, onRemove }) => {
  const handleRemoveFromSave = async () => {
    try {
      const response = await axiosInstance.delete(`posts/${post.slug}/remove-save`);
      console.log('Remove from save response:', response.data);

      if (onRemove) {
        onRemove(); // Simply trigger the refetch in the parent component
      }
    } catch (error) {
      console.error('Error removing post from saved:', error);
    }
  };

  const handleShare = () => {
    console.log('Share post:', post.slug);
    // Add your share logic here
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="text-gray-500 hover:text-gray-700">
          <BsThreeDotsVertical size={24} />
        </button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="remove-save" onClick={handleRemoveFromSave} textValue="Remove from Save">
          <div className="flex items-center">
            <BsBookmarkFill className="text-red-500 mr-2" /> Remove from Save
          </div>
        </DropdownItem>
        <DropdownItem key="share" onClick={handleShare} textValue="Share">
          <div className="flex items-center">
            <BsShare className="mr-2" /> Share
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostDropdown;
