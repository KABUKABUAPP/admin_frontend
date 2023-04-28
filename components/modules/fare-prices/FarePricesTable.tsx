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
  {
    title: "City",
    flex: 1,
  },
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
    data?: FarePricesTableData[]
}

const FarePricesTable: FC<Props> = ({ data }) => {
  return (
    <EnhancedTable
      TableHeadComponent={
        <FarePricesTableHeadRow headCellData={headCellData} />
      }
      rowComponent={(row) => <FarePricesTableBodyRow data={row} />}
      rowData={data}
      maxWidth="100vw"
    />
  );
};

export default FarePricesTable;
