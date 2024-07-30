import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { VerticalDotsIcon } from "./VerticalDotsIcons";

const TableActions = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly radius="full" size="sm" variant="light">
          <VerticalDotsIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>View</DropdownItem>
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default TableActions;
