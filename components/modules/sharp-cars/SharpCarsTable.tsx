import React, { FC } from "react";

import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import SharpCarsTableBodyRow from "./SharpCarsTableBodyRow";
import SharpCarsTableHeadRow from "./SharpCarsTableHeadRow";
import { SharpCarsTableBodyData } from "@/models/SharpCars";

interface Props {
    data: SharpCarsTableBodyData[]
}

const headCellData = [
    { title: "Car ID", flex: 1 },
    { title: "Car Brand & Model", flex: 1 },
    { title: "Driver", flex: 1 },
    { title: "License Number", flex: 1 },
    { title: "Date & Time Added", flex: 1 },
  ];

const SharpCarsTable: FC<Props> = ({ data }) => {
  return (
    <EnhancedTable
      TableHeadComponent={<SharpCarsTableHeadRow headCellData={headCellData}/>}
      rowComponent={(rows) => <SharpCarsTableBodyRow data={rows} />}
      rowData={data}
      maxWidth="100vw"
    />
  );
};

export default SharpCarsTable;
