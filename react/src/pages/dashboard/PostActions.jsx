import React, { useState } from 'react';
import { Button, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Modal, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';
import { VerticalDotsIcon } from "./VerticalDotsIcons";

const PostActions = ({ postId, isPublished, refreshPosts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublishedState, setIsPublishedState] = useState(isPublished);

  const handleDelete = () => {
    axiosInstance.delete(`/posts/${postId}`)
      .then(() => {
        refreshPosts();
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
        setIsModalOpen(false);
      });
  };

  const handlePublishToggle = () => {
    const url = isPublishedState ? `/posts/${postId}/unpublish` : `/posts/${postId}/publish`;
    axiosInstance.patch(url)
      .then(() => {
        setIsPublishedState(!isPublishedState);
        refreshPosts();
      })
      .catch((error) => {
        console.error('Error toggling publish status:', error);
      });
  };

  const openDeleteModal = () => {
    console.log("Opening delete modal");
    setIsModalOpen(true);
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
            <Link to={`/view-post/${postId}`} className="block">View</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to={`/edit-post/${postId}`} className="block">Edit</Link>
          </DropdownItem>
          <DropdownItem onClick={openDeleteModal}>Delete</DropdownItem>
          <DropdownItem onClick={handlePublishToggle}>
            {isPublishedState ? "Unpublish" : "Publish"}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>
          Confirm Delete
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete this post?
        </ModalBody>
        <ModalFooter>
          <Button auto flat color="error" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button auto onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PostActions;
