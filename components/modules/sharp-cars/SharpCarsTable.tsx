import React, { FC } from "react";

import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import SharpCarsTableBodyRow from "./SharpCarsTableBodyRow";
import SharpCarsTableHeadRow from "./SharpCarsTableHeadRow";
import { SharpCarsTableBodyData } from "@/models/SharpCars";

interface Props {
  data?: SharpCarsTableBodyData[];
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  currentPage?: any;
  innerFilterValue?: string;
}

const headCellData = [
  { title: "Car ID", flex: 1 },
  { title: "Car Brand & Model", flex: 1 },
  { title: "Driver", flex: 1 },
  { title: "License Number", flex: 1 },
  { title: "Date & Time Added", flex: 1 },
];

const SharpCarsTable: FC<Props> = ({ data, isLoading, isError, refetch, currentPage, innerFilterValue }) => {
  return (
    <EnhancedTable
      TableHeadComponent={<SharpCarsTableHeadRow headCellData={headCellData} />}
      rowComponent={(rows) => <SharpCarsTableBodyRow data={rows} currentPage={currentPage} innerFilterValue={innerFilterValue} />}
      rowData={data}
      maxWidth="100vw"
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      headCellData={headCellData}
    />
  );
};

export default SharpCarsTable;
