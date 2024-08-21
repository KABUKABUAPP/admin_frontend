import { useGetAllTransactionsQuery } from "@/api-services/transactionsService";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import Pagination from "@/components/common/Pagination";
import React, { FC, useEffect, useState } from "react";
import TripPaymentsTableRow from "./TableRows/TripPaymentsTableRow";

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
  paymentType: string;
  dateStart?: any;
  dateEnd?: any;
  minAmount?: any;
  setTotalWithdrawal: any;
  transactionStatus: any;
  search: string;
  timeline: string;
}

const TripPaymentsTable: FC<Props> = ({order, paymentType, dateStart, dateEnd, minAmount, setTotalWithdrawal, transactionStatus, search, timeline}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch } = useGetAllTransactionsQuery(
    {
      limit: pageSize,
      page: currentPage,
      search: search,
      filter: paymentType,
      order,
      dateStart,
      dateEnd,
      minAmount,
      transactionStatus,
      timeline
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
        isError={isError}
        refetch={refetch}
        rowComponent={(rows)=><TripPaymentsTableRow data={rows}/>}
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

export default TripPaymentsTable;
