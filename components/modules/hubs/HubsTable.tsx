import React, { FC } from "react";

import HubsTableBodyRow from "./HubsTableBodyRow";
import HubsTableHeadRow from "./HubsTableHeadRow";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import { HubsTableBodyData } from "@/models/Hubs";

const headCellData = [
  {
    title: "Hub ID",
    flex: 1,
  },
  {
    title: "Hub Name",
    flex: 1,
  },
  {
    title: "State & Country",
    flex: 1,
  },
  {
    title: "Inspector",
    flex: 1,
  },
  {
    title: "Total Cars Processed",
    flex: 1,
  },
  {
    title: "Date Created",
    flex: 1,
  },
];

interface Props {
    data: HubsTableBodyData[]
}

const HubsTable: FC<Props> = ({ data }) => {
  return (
    <EnhancedTable
      TableHeadComponent={
        <HubsTableHeadRow headCellData={headCellData} />
      }
      rowComponent={(row) => <HubsTableBodyRow data={row} />}
      rowData={data}
      maxWidth="100vw"
    />
  );
};

export default HubsTable;
