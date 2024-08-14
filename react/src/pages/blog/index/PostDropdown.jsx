import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { BsThreeDotsVertical, BsBookmark, BsBookmarkFill, BsShare, BsFlag } from 'react-icons/bs';
import axiosInstance from '../../../axiosInstance'; // Ensure axiosInstance is correctly set up
import Report from './Report'; // Import the Report modal component

const PostDropdown = ({ post }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

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

  const handleReport = () => {
    setIsReportOpen(true);
  };

  const closeReportModal = () => {
    setIsReportOpen(false);
  };

  return (
    <>
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

          <DropdownItem key="report" onClick={handleReport}>
            <div className="flex items-center">
              <BsFlag className="mr-2" /> Report
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Report Modal */}
      <Report postId={post.id} isOpen={isReportOpen} onClose={closeReportModal} />
    </>
  );
};

export default PostDropdown;
