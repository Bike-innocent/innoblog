import React from 'react';
import { Chip } from "@nextui-org/react";

const StatusChip = ({ status }) => {
  const statusColorMap = {
    1: "success",  // Published
    0: "warning"   // Unpublished
  };
  const statusText = status === 1 ? "Published" : "Unpublished";

  return (
    <Chip
      className="capitalize"
      color={statusColorMap[status]}
      size="sm"
      variant="dot"
      border={statusColorMap[status]}
    >
      {statusText}
    </Chip>
  );
};

export default StatusChip;
