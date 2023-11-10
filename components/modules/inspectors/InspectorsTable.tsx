import React, { FC } from "react";

import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import InspectorsTableBodyRow from "./InspectorsTableBodyRow";
import InspectorsTableHeadRow from "./InspectorsTableHeadRow";
import { InspectorsTableBodyData } from "@/models/Inspectors";

interface Props {
  data?: InspectorsTableBodyData[];
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
}

const headCellData = [
  {
    title: "Inspector ID",
    flex: 1,
  },
  {
    title: "Full Name",
    flex: 2,
  },
  {
    title: "Username",
    flex: 1,
  },
  {
    title: "Location",
    flex: 1,
  },
  {
    title: "Hub",
    flex: 1,
  },
  {
    title: "Total Cars Processed",
    flex: 1,
  },
];

const InspectorsTable: FC<Props> = ({ data, isError, isLoading, refetch }) => {
  return (
    <EnhancedTable
      TableHeadComponent={
        <InspectorsTableHeadRow headCellData={headCellData} />
      }
      rowComponent={(rows) => <InspectorsTableBodyRow data={rows} />}
      maxWidth="100vw"
      rowData={data}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      headCellData={headCellData}
    />
  );
};

export default InspectorsTable;
