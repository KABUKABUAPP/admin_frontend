import React, { FC } from "react";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import RidersTableHeadRow from "./RidersTableHeadRow";
import RidersTableBodyRow from "./RidersTableBodyRow";
import { RidersTableBodyData } from "@/models/Riders";

interface Props {
  headBg: string;
  ridersData?: RidersTableBodyData[];
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  currentPage?: any;
}

const headCellData = [
  { title: "Full Name", flex: 2 },
  { title: "Location", flex: 1 },
  { title: "Total Trips", flex: 1 },
  { title: "Phone Number", flex: 2 },
  { title: "Email", flex: 2 },
  { title: "Wallet Balance", flex: 1 },
  { title: "Status", flex: 1 },
];

const RidersTable: FC<Props> = ({
  headBg,
  ridersData,
  isLoading,
  isError,
  refetch,
  currentPage
}) => {
  return (
    <EnhancedTable
      TableHeadComponent={<RidersTableHeadRow headCellData={headCellData} />}
      rowComponent={(row) => <RidersTableBodyRow data={row} currentPage={currentPage} />}
      rowData={ridersData}
      headBg={headBg}
      maxWidth="100vw"
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      headCellData={headCellData}
    />
  );
};

export default RidersTable;
