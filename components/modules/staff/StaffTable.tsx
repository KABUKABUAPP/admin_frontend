import React, { FC } from "react";

import StaffTableBodyRow from "./StaffTableBodyRow";
import StaffTableHeadRow from "./StaffTableHeadRow";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import { StaffsTableData } from "@/models/Staffs";

interface Props {
    data?: StaffsTableData[]
    isError: boolean;
    isLoading: boolean;
    refetch: ()=>void;
    headBg: string;
    currentPage?: number;
}

const headCellData = [
  {
    title: "Staff ID",
    flex: 1,
  },
  {
    title: "Full Name",
    flex: 1,
  },
  {
    title: "Role",
    flex: 1,
  },
  {
    title: "Location",
    flex: 1,
  },
  {
    title: "Status",
    flex: 1,
  },
];

const StaffTable:FC<Props> = ({ data, isError, isLoading, refetch, headBg, currentPage }) => {
  return (
    <EnhancedTable
      TableHeadComponent={<StaffTableHeadRow headCellData={headCellData} />}
      rowComponent={(row)=><StaffTableBodyRow data={row} currentPage={currentPage} />}
      rowData={data}
      maxWidth="100vw"
      isError={isError}
      isLoading={isLoading}
      refetch={refetch}
      headCellData={headCellData}
      headBg={headBg}
    />
  );
};

export default StaffTable;
