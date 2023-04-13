import React, { FC } from "react";

import StaffTableBodyRow from "./StaffTableBodyRow";
import StaffTableHeadRow from "./StaffTableHeadRow";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import { StaffsTableData } from "@/models/Staffs";

interface Props {
    data: StaffsTableData[]
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

const StaffTable:FC<Props> = ({ data }) => {
  return (
    <EnhancedTable
      TableHeadComponent={<StaffTableHeadRow headCellData={headCellData} />}
      rowComponent={(row)=><StaffTableBodyRow data={row}/>}
      rowData={data}
      maxWidth="100vw"
    />
  );
};

export default StaffTable;
