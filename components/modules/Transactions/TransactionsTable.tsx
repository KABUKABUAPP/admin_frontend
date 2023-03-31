import React, { FC } from "react";

import TransactionsTableHeadRow from "./TransactionsTableHeadRow";
import TransactionsTableRow from "./TransactionsTableRow";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import { transactionsMockData } from "@/constants";

const headCellData = [
  { title: "Transaction ID", flex: 1 },
  { title: "Origin/Destination", flex: 2 },
  { title: "Rider/Driver", flex: 1 },
  { title: "Car", flex: 1 },
  { title: "Status", flex: 1 },
  { title: "Price", flex: 1 },
];

const TransactionsTable: FC = () => {
  return (
    <EnhancedTable
      TableHeadComponent={
        <TransactionsTableHeadRow headCellData={headCellData} />
      }
      rowComponent={(rows) => <TransactionsTableRow data={rows} />}
      rowData={transactionsMockData}
      maxWidth="100vw"
    />
  );
};

export default TransactionsTable;
