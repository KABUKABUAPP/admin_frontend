import React, { FC } from "react";

import FarePricesTableBodyRow from "./FarePricesTableBodyRow";
import FarePricesTableHeadRow from "./FarePricesTableHeadRow";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import { FarePricesTableData } from "@/models/FarePrices";

const headCellData = [
  {
    title: "Profile ID",
    flex: 1,
  },
  // {
  //   title: "City",
  //   flex: 1,
  // },
  {
    title: "State & Country",
    flex: 1,
  },
  {
    title: "Total Fares",
    flex: 1,
  },
  {
    title: "Date Created",
    flex: 1,
  },
];

interface Props {
  data?: FarePricesTableData[];
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  currentTab: string;
}

const FarePricesTable: FC<Props> = ({ data, isLoading, isError, refetch, currentTab }) => {
  
  return (
    <EnhancedTable
      TableHeadComponent={
        <FarePricesTableHeadRow headCellData={headCellData} />
      }
      rowComponent={(row) => <FarePricesTableBodyRow data={row} currentTab={currentTab} />}
      rowData={data}
      maxWidth="100vw"
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      headCellData={headCellData}
    />
  );
};

export default FarePricesTable;
