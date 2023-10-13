import React, { FC } from "react";

interface Props {
  TableHeadComponent: React.ReactNode;
  bgColor?: string;
}

const EnhancedTableHead: FC<Props> = ({ TableHeadComponent, bgColor }) => {
  return (
    <div
      className={`rounded-tr-lg rounded-tl-lg px-3 py-4`}
      style={{ backgroundColor: bgColor || '#FFF5D8'}}
    >
      {TableHeadComponent}
    </div>
  );
};

export default EnhancedTableHead;
