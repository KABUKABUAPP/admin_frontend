import React, { FC } from "react";

import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import InspectorsTableBodyRow from "./InspectorsTableBodyRow";
import InspectorsTableHeadRow from "./InspectorsTableHeadRow";
import { InspectorsTableBodyData } from "@/models/Inspectors";

interface Props {
  data?: InspectorsTableBodyData[];
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
    title: "Location",
    flex: 1,
  },
  {
    title: "Hub",
    flex: 1,
  },
  {
    title: "Cars in Hub",
    flex: 1,
  },
  {
    title: "Total Cars Processed",
    flex: 1,
  },
];

const InspectorsTable: FC<Props> = ({ data }) => {
  return (
    <EnhancedTable
      TableHeadComponent={
        <InspectorsTableHeadRow headCellData={headCellData} />
      }
      rowComponent={(rows) => <InspectorsTableBodyRow data={rows} />}
      maxWidth="100vw"
      rowData={data}
    />
  );
};

export default InspectorsTable;
