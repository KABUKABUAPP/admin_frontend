import React, { FC, useEffect, useState } from "react";

import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import { useGetAllTransactionsQuery } from "@/api-services/transactionsService";
import Pagination from "@/components/common/Pagination";
import AllTransactionsTableRow from "./TableRows/AllTransactionsTableRow";

const headCellData = [
  { title: "Transaction ID", flex: 1 },
  { title: "User", flex: 2 },
  { title: "Type", flex: 1 },
  { title: "Narration", flex: 2 },
  { title: "Price", flex: 1 },
  { title: "Date", flex: 1 },
  { title: "Status", flex: 1 },
];

interface Props {
  order: string;
  dateStart?: any;
  dateEnd?: any;
  minAmount?: any;
  setTotalWithdrawal: any;
  transactionStatus: any;
  search: string;
  timeline: string;
}

const AllTransactionsTable: FC<Props> = ({ order, dateStart, dateEnd, minAmount, setTotalWithdrawal, transactionStatus, search, timeline }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch } = useGetAllTransactionsQuery(
    { limit: pageSize, page: currentPage, search: search, filter: "", order, dateStart, dateEnd, minAmount, timeline },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );
  
  return (
    <>
      <EnhancedTable
        headCellData={headCellData}
        generic={true}
        maxWidth="100vw"
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
        rowComponent={(rows) => <AllTransactionsTableRow data={rows}/>}
        rowData={data?.data}
      />
      {data && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.totalCount}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
};

export default AllTransactionsTable;
