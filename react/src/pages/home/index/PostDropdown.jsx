import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { BsThreeDotsVertical, BsBookmark, BsBookmarkFill, BsShare, BsFlag } from 'react-icons/bs';
import axiosInstance from '../../../axiosInstance';
import Report from './Report';
import Share from './Share';

const PostDropdown = ({ post, setSuccessMessage }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const fetchSavedState = async () => {
      try {
        const response = await axiosInstance.get(`posts/${post.slug}/is-saved`);
        setIsSaved(response.data.is_saved);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error('Too many requests. Please slow down.');
        } else {
          console.error('Error fetching saved state:', error);
        }
      }
    };

    fetchSavedState();
  }, [post.slug]);

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post(`posts/${post.slug}/save`);
      setIsSaved(response.data.is_saved);
      setSuccessMessage(response.data.is_saved ? 'Post saved successfully' : 'Post unsaved successfully');
    } catch (error) {
      console.error('Error saving post:', error);
      setSuccessMessage('An error occurred while saving the post');
    }
  };

  const handleReport = () => {
    setIsReportOpen(true);
  };

  const closeReportModal = () => {
    setIsReportOpen(false);
  };

  const handleShare = () => {
    setIsShareOpen(true);
  };

  const closeShareModal = () => {
    setIsShareOpen(false);
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

      {/* Share Dialog */}
      <Share isOpen={isShareOpen} onClose={closeShareModal} postUrl={`http://localhost:5173/posts/${post.slug}`} />
    </>
  );
};

export default PostDropdown;
