import React, { FC } from "react";

import TransactionsTableHeadRow from "./TransactionsTableHeadRow";
import TransactionsTableRow from "./TransactionsTableRow";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import { TransactionsModel } from "@/models/Transactions";

const headCellData = [
  { title: "Transaction ID", flex: 1 },
  { title: "User", flex: 2 },
  { title: "Type", flex: 1 },
  { title: "Narration", flex: 1 },
  { title: "Price", flex: 1 },
  { title: "Date", flex: 1 },
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
