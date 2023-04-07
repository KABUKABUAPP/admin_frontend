import React, { FC } from "react";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import DriversTableBodyRow from "./DriversTableBodyRow";
import DriversTableHeadRow from "./DriversTableHeadRow";
import { DriversTableBodyData } from "@/models/Drivers";

interface Props {
  tableData: DriversTableBodyData[];
}

const headCellData = [
    { title: "Driver ID", flex: 1 },
    { title: "Full Name", flex: 2 },
    { title: "Location", flex: 1 },
    { title: "Total Trips", flex: 1 },
    { title: "Wallet Balance", flex: 1 },
    { title: "Driver Type", flex: 1 },
    { title: "Status", flex: 1 },
  ];

const DriversTable: FC<Props> = ({ tableData }) => {
  return (
    <EnhancedTable
      TableHeadComponent={<DriversTableHeadRow headCellData={headCellData}/>}
      rowComponent={(rows) => <DriversTableBodyRow data={rows} />}
      rowData={tableData}
      maxWidth="100vw"
    />
  );
};

export default DriversTable;
