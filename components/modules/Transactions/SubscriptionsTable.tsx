import React, { FC, useEffect, useState } from "react";

import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import { useGetAllTransactionsQuery } from "@/api-services/transactionsService";
import Pagination from "@/components/common/Pagination";
import SubscriptionsTableRow from "./TableRows/SubscriptionsTableRow";

const headCellData = [
  { title: "Transaction ID", flex: 1 },
  { title: "User", flex: 2 },
  { title: "Type", flex: 1 },
  { title: "Narration", flex: 1 },
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
}

const SubscriptionsTable: FC<Props> = ({order, dateStart, dateEnd, minAmount, setTotalWithdrawal, transactionStatus, search}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch } = useGetAllTransactionsQuery(
    {
      limit: pageSize,
      page: currentPage,
      search: search,
      filter: "driver_trip_charges",
      order,
      dateStart,
      dateEnd,
      minAmount,
      transactionStatus
    },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  return (
    <>
      <EnhancedTable
        headCellData={headCellData}
        generic={true}
        maxWidth="100vw"
        isLoading={isLoading}
        refetch={refetch}
        isError={isError}
        rowComponent={(rows)=><SubscriptionsTableRow data={rows}/>}
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

export default SubscriptionsTable;
