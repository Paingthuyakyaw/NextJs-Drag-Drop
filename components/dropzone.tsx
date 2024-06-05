import React from "react";

const DropZone = ({
  beforeId,
  column,
}: {
  beforeId: string | null;
  column: string;
}) => {
  return (
    <div
      className=" w-full h-2 bg-red-500"
      data-before={beforeId}
      data-column={column}
    >
      {""}
    </div>
  );
};

export default DropZone;
