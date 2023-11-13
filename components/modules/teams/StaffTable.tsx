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
    title: "Team ID",
    flex: 1,
  },
  {
    title: "Team Name",
    flex: 1,
  },
  {
    title: "Total Members",
    flex: 1,
  },
  {
    title: "Audience Type",
    flex: 1,
  },
  {
    title: "Users Onboarded",
    flex: 1,
  },
  {
    title: "Date Created",
    flex: 1,
  }
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
