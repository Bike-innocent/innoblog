import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { BsThreeDotsVertical, BsBookmark, BsBookmarkFill, BsShare, BsExclamationCircle, BsFlag } from 'react-icons/bs';
import axiosInstance from '../../../axiosInstance'; // Ensure axiosInstance is correctly set up

const PostDropdown = ({ post }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Fetch the initial saved state when the component mounts
    const fetchSavedState = async () => {
      try {
        const response = await axiosInstance.get(`posts/${post.slug}/is-saved`);
        setIsSaved(response.data.is_saved);
      } catch (error) {
        console.error('Error fetching saved state:', error);
      }
    };

    fetchSavedState();
  }, [post.slug]);

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post(`posts/${post.slug}/save`);
      console.log('Save/Unsave response:', response.data);

      // Update the saved state based on the response
      setIsSaved(response.data.is_saved);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleShare = () => {
    console.log('Share post:', post.slug);
    // Add your share logic here
  };

  const handleNotInterested = () => {
    console.log('Not Interested in post:', post.slug);
    // Add your not interested logic here
  };

  const handleReport = () => {
    console.log('Report post:', post.slug);
    // Add your report logic here
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="text-gray-500 hover:text-gray-700">
          <BsThreeDotsVertical size={24} />
        </button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="save" onClick={handleSave}>
          <div className="flex items-center">
            {isSaved ? (
              <>
                <BsBookmarkFill className="text-blue-500 mr-2" /> Saved
              </>
            ) : (
              <>
                <BsBookmark className="mr-2" /> Save
              </>
            )}
          </div>
        </DropdownItem>
        <DropdownItem key="share" onClick={handleShare}>
          <div className="flex items-center">
            <BsShare className="mr-2" /> Share
          </div>
        </DropdownItem>
        {/* <DropdownItem key="not-interested" onClick={handleNotInterested}>
          <div className="flex items-center">
            <BsExclamationCircle className="mr-2" /> Not Interested
          </div>
        </DropdownItem> */}
        <DropdownItem key="report" onClick={handleReport}>
          <div className="flex items-center">
            <BsFlag className="mr-2" /> Report
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostDropdown;
