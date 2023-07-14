import React, { FC } from "react";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import DriversTableBodyRow from "./DriversTableBodyRow";
import DriversTableHeadRow from "./DriversTableHeadRow";
import { DriversTableBodyData } from "@/models/Drivers";
import DeletedDriversTableBodyRow from "./DeletedDriversTableBodyRow";

interface Props {
  tableData?: DriversTableBodyData[];
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  subPath: string;
  headBg?: string;
}

const headCellData = [
    { title: "Driver ID", flex: 2 },
    { title: "Full Name", flex: 2 },
    { title: "Location", flex: 1 },
    { title: "Total Trips", flex: 1 },
    { title: "Reason", flex: 1 },
    { title: "Driver Type", flex: 1 },
    { title: "Date Deleted", flex: 1 },
  ];

const DeletedDriversTable: FC<Props> = ({ tableData, isLoading, isError, refetch, subPath, headBg }) => {
  return (
    <EnhancedTable
      headBg={headBg}
      TableHeadComponent={<DriversTableHeadRow headCellData={headCellData}/>}
      rowComponent={(rows) => <DeletedDriversTableBodyRow data={rows} subPath={subPath}/>}
      rowData={tableData}
      maxWidth="100vw"
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      headCellData={headCellData}
    />
  );
};

export default DeletedDriversTable;
