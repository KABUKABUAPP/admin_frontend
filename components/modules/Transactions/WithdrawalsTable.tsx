import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import React, { FC } from "react";

const headCellData = [
  { title: "Transaction ID", flex: 1 },
  { title: "User", flex: 2 },
  { title: "User Type", flex: 2 },
  { title: "Type", flex: 1 },
  { title: "Narration", flex: 1 },
  { title: "Price", flex: 1 },
  { title: "Date", flex: 1 },
];

const WithdrawalsTable: FC = () => {
  return (
    <EnhancedTable
      headCellData={headCellData}
      generic={true}
      maxWidth="100vw"
    />
  );
};

export default WithdrawalsTable;
