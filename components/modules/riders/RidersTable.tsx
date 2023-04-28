import React, { FC } from "react";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import RidersTableHeadRow from "./RidersTableHeadRow";
import RidersTableBodyRow from "./RidersTableBodyRow";
import { RidersTableBodyData } from "@/models/Riders";

interface Props {
  headBg: string;
  ridersData: RidersTableBodyData[],
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
}

const headCellData = [
  { title: "Rider ID", flex: 1 },
  { title: "Full Name", flex: 2 },
  { title: "Location", flex: 1 },
  { title: "Total Trips", flex: 1 },
  { title: "Wallet Balance", flex: 1 },
  { title: "Status", flex: 1 },
];

const RidersTable: FC<Props> = ({ headBg, ridersData, isLoading, isError, refetch }) => {
  return (
    <EnhancedTable
      TableHeadComponent={<RidersTableHeadRow headCellData={headCellData} />}
      rowComponent={(row) => <RidersTableBodyRow data={row} />}
      rowData={ridersData}
      headBg={headBg}
      maxWidth="100vw"
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    />
  );
};

export default RidersTable;
