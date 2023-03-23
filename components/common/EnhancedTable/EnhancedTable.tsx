import React, { FC } from "react";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableBody from "./EnhancedTableBody";

interface Props {
  TableHeadComponent: React.ReactNode;
  maxWidth?: string;
  rowData: any[];
  rowComponent: (row: any, idx: number) => React.ReactNode;
}

const EnhancedTable: FC<Props> = ({
  TableHeadComponent,
  maxWidth = "768px",
  rowData,
  rowComponent,
}) => {
  return (
    <div
      className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
    scrollbar-thumb-gray-900 scrollbar-track-gray-300"
      style={{ maxWidth: maxWidth }}
    >
      <div className=" bg-transparent  min-w-[800px]">
        <EnhancedTableHead TableHeadComponent={TableHeadComponent} />
        <EnhancedTableBody
          rowData={rowData}
          rowComponent={(row, index) => rowComponent(row, index)}
        />
      </div>
    </div>
  );
};

export default EnhancedTable;
