import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import React, { FC } from "react";
import TripsTableHeadRow from "./TripsTableHeadRow";
import TripsTableRow from "./TripsTableRow";
import { tripsRowMockData } from "../../../constants";

const headCellData = [
  { title: "ID", flex: 1 },
  { title: "Origin/Destination", flex: 2 },
  { title: "Rider", flex: 1 },
  { title: "Driver", flex: 1 },
  { title: "Car", flex: 1 },
  { title: "Status", flex: 1 },
];

const ActiveTripsTable: FC = () => {
  return (
    <EnhancedTable
      TableHeadComponent={<TripsTableHeadRow headCellData={headCellData} />}
      maxWidth="100vw"
      rowComponent={(row, index) => <TripsTableRow data={row} index={index} />}
      rowData={tripsRowMockData}
    />
  );
};

export default ActiveTripsTable;
