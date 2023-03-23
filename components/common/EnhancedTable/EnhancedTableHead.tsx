import React, { FC } from "react";

interface Props {
  TableHeadComponent: React.ReactNode;
}

const EnhancedTableHead: FC<Props> = ({ TableHeadComponent }) => {
  return (
    <div
      className={`bg-[#FFF5D8] rounded-tr-lg rounded-tl-lg px-3 py-4`}
    >
      {TableHeadComponent}
    </div>
  );
};

export default EnhancedTableHead;
