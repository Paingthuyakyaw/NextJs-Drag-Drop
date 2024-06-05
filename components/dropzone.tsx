import React from "react";

const DropZone = ({
  beforeId,
  column,
}: {
  beforeId: string | null;
  column: string;
  active?: boolean;
}) => {
  return (
    <div
      className=" w-full h-[2px] "
      data-before={beforeId || "-1"}
      data-column={column}
    >
      {""}
    </div>
  );
};

export default DropZone;
