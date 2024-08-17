import React, { useState } from 'react';
import { Button, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from "@nextui-org/react";
import { Dialog } from '@headlessui/react';
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';
import { VerticalDotsIcon } from "../VerticalDotsIcons";

const PostActions = ({ postSlug, isPublished, refreshPosts }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPublishedState, setIsPublishedState] = useState(isPublished);

  const handleDelete = () => {
    axiosInstance.delete(`/posts/${postSlug}`)
      .then(() => {
        refreshPosts();
        setIsDialogOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
        setIsDialogOpen(false);
      });
  };

  const handlePublishToggle = () => {
    const url = isPublishedState ? `/posts/${postSlug}/unpublish` : `/posts/${postSlug}/publish`;
    axiosInstance.patch(url)
      .then(() => {
        setIsPublishedState(!isPublishedState);
        refreshPosts();
      })
      .catch((error) => {
        console.error('Error toggling publish status:', error);
      });
  };

  const openDeleteDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly radius="full" size="sm" variant="light">
            <VerticalDotsIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>
            <Link to={`/view-post/${postSlug}`} className="block">View</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to={`/edit-post/${postSlug}`} className="block">Edit</Link>
          </DropdownItem>
          <DropdownItem onClick={openDeleteDialog}>Delete</DropdownItem>
          <DropdownItem onClick={handlePublishToggle}>
            {isPublishedState ? "Unpublish" : "Publish"}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
              Confirm Delete
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm ">
                Are you sure you want to delete this post?
              </p>
            </div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <Button auto flat color="error" onClick={() => setIsDialogOpen(false)} className="sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </Button>
              <Button auto onClick={handleDelete} className="mt-3 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm text-white bg-red-500">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PostActions;
