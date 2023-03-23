import React, { FC } from "react";

interface Props {
  rowData: any[];
  rowComponent: (row: any, idx: number) => React.ReactNode;
}

const EnhancedTableBody: FC<Props> = ({ rowData, rowComponent }) => {
  return (
    <div
      className="w-full bg-[#FFFFFF]"
    >
      {rowData.map((item, idx) => {
        return rowComponent(item, idx);
      })}
    </div>
  );
};

export default EnhancedTableBody;
