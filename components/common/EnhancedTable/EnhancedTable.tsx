import React, { FC } from "react";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableBody from "./EnhancedTableBody";
import GenericHeadRowComponent from "./GenericHeadRowComponent";
import DriversTableBodyRow from "@/components/modules/drivers/DriversTableBodyRow";

interface Props {
  TableHeadComponent?: React.ReactNode;
  maxWidth?: string;
  rowData?: any[];
  rowComponent?: (row: any, idx: number) => React.ReactNode;
  headBg?: string;
  generic?: boolean;
  headCellData?: { title: string; flex: number }[];
}

const EnhancedTable: FC<Props> = ({
  TableHeadComponent,
  maxWidth = "768px",
  rowData,
  rowComponent,
  headBg,
  generic = false,
  headCellData,
}) => {
  return (
    <div
      className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
    scrollbar-thumb-gray-900 scrollbar-track-gray-300"
      style={{ maxWidth: maxWidth }}
    >
      <div className=" bg-transparent  min-w-[800px]">
        <EnhancedTableHead
          TableHeadComponent={
            generic && headCellData ? (
              <GenericHeadRowComponent headCellData={headCellData} />
            ) : (
              TableHeadComponent
            )
          }
          bgColor={headBg}
        />
        <EnhancedTableBody
          rowData={rowData || []}
          rowComponent={(row, index) =>
            rowComponent ? rowComponent(row, index) : null
          }
        />
      </div>
    </div>
  );
};

export default EnhancedTable;

