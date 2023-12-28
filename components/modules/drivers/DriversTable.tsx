import React, { FC } from "react";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import DriversTableBodyRow from "./DriversTableBodyRow";
import DriversTableHeadRow from "./DriversTableHeadRow";
import { DriversTableBodyData } from "@/models/Drivers";

interface Props {
  tableData?: DriversTableBodyData[];
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  subPath: string;
  headBg?: string;
  currentPage?: number;
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
  ];

const DriversTable: FC<Props> = ({ tableData, isLoading, isError, refetch, subPath, headBg, currentPage }) => {
  return (
    <EnhancedTable
      headBg={headBg}
      TableHeadComponent={<DriversTableHeadRow headCellData={subPath !== 'pending' ? headCellData : headCellData.concat({ title: "Onboard Step", flex: 1 })}/>}
      rowComponent={(rows) => <DriversTableBodyRow data={rows} subPath={subPath} currentPage={currentPage} />}
      rowData={tableData}
      maxWidth="100vw"
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      headCellData={headCellData}
    />
  );
};

export default DriversTable;
