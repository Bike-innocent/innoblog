import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const PostDropdown = ({ onSave, onShare, onNotInterested, onReport }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="text-gray-500 hover:text-gray-700">
          <BsThreeDotsVertical size={24} />
        </button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="save" onClick={onSave}>Save</DropdownItem>
        <DropdownItem key="share" onClick={onShare}>Share</DropdownItem>
        <DropdownItem key="not-interested" onClick={onNotInterested}>Not Interested</DropdownItem>
        <DropdownItem key="report" onClick={onReport}>Report</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostDropdown;
