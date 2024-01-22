import React, { FC } from "react";

import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import SharpCarsTableBodyRow from "./SharpCarsTableBodyRow";
import SharpCarsTableHeadRow from "./SharpCarsTableHeadRow";
import { SharpCarsTableBodyData } from "@/models/SharpCars";
import SharpCarsDeliveryTableBodyRow from "./SharpCarDeliveryTableBodyRow";

interface Props {
  data?: any;
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
}

const headCellData = [
  { title: "Delivery ID", flex: 1 },
  { title: "Delivery Hub", flex: 1 },
  { title: "Hub Inspector", flex: 1 },
  { title: "Total Cars", flex: 1 },
  { title: "Estimated Delivery", flex: 1 },
  { title: "Date & Time Created", flex: 1 },
  { title: "Status", flex: 1 }
];

const SharpCarsDeliveryTable: FC<Props> = ({ data, isLoading, isError, refetch }) => {
  return (
    <EnhancedTable
      TableHeadComponent={<SharpCarsTableHeadRow headCellData={headCellData} />}
      rowComponent={(rows) => <SharpCarsDeliveryTableBodyRow data={rows} />}
      rowData={data}
      maxWidth="100vw"
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      headCellData={headCellData}
    />
  );
};

export default SharpCarsDeliveryTable;
