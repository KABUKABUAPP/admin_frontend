import React, { FC } from "react";

import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import DriverPendingTableBodyRow from "./DriverPendingTableRow";
import DriverPendingTableHead from "./DriverPendingTableHead";

interface Props {
  data?: any;
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  currentPage: any;
  innerFilterValue: string;
}

const headCellData = [
    { title: "Driver ID", flex: 2 },
    { title: "Full Name", flex: 2 },
    { title: "Location", flex: 1 },
    { title: "Total Trips", flex: 1 },
    { title: "Wallet Balance", flex: 1 },
    { title: "Driver Type", flex: 1 },
    { title: "Status", flex: 1 },
    { title: "Online Status", flex: 1 }
]

const DriverPendingTable: FC<Props> = ({ data, isLoading, isError, refetch, 
  currentPage }) => {
  return (
    <EnhancedTable
      TableHeadComponent={<DriverPendingTableHead headCellData={headCellData} />}
      rowComponent={(rows) => <DriverPendingTableBodyRow data={rows} currentPage={currentPage} />}
      rowData={data}
      maxWidth="100vw"
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      headCellData={headCellData}
    />
  );
};

export default DriverPendingTable;
