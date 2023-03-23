import React, { FC } from "react";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import TripsTableHeadRow from "./TripsTableHeadRow";
import { completedTripsRowMockData } from "../../../constants";
import CompletedTripsTableRow from "./CompletedTripsTableRow";

const headCellData = [
  { title: "ID", flex: 1 },
  { title: "Origin/Destination", flex: 2 },
  { title: "Rider", flex: 1 },
  { title: "Driver", flex: 1 },
  { title: "Car", flex: 1 },
  { title: "Status", flex: 1 },
  { title: "Price", flex: 1},
  { title: "Rating", flex: 1}
];

const CompletedTripsTable:FC = () => {
  return (
    <EnhancedTable
      TableHeadComponent={<TripsTableHeadRow headCellData={headCellData} />}
      maxWidth="100vw"
      rowComponent={(row, index) => <CompletedTripsTableRow data={row} index={index} />}
      rowData={completedTripsRowMockData}
    />
  )
}

export default CompletedTripsTable