import React, { FC } from "react";

import TransactionsTableHeadRow from "./TransactionsTableHeadRow";
import TransactionsTableRow from "./TransactionsTableRow";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import { transactionsMockData } from "@/constants";
import { TransactionsModel } from "@/models/Transactions";

const headCellData = [
  { title: "Transaction ID", flex: 2 },
  { title: "Origin/Destination", flex: 2 },
  { title: "Rider/Driver", flex: 1 },
  { title: "Car", flex: 1 },
  { title: "Status", flex: 1 },
  { title: "Price", flex: 1 },
];

interface Props {
  tableData?: TransactionsModel
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
}

const TransactionsTable: FC<Props> = ({ tableData, isError, isLoading, refetch }) => {
  return (
    <EnhancedTable
      TableHeadComponent={
        <TransactionsTableHeadRow headCellData={headCellData} />
      }
      rowComponent={(rows) => <TransactionsTableRow data={rows} />}
      rowData={tableData?.data}
      maxWidth="100vw"
      isError={isError}
      isLoading={isLoading}
      headCellData={headCellData}
      refetch={refetch}
    />
  );
};

export default TransactionsTable;
