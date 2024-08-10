import { useGetAllTransactionsQuery } from "@/api-services/transactionsService";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import Pagination from "@/components/common/Pagination";
import React, { FC, useEffect, useState } from "react";
import TripChargesTableRow from "./TableRows/TripChargesTableRow";

const headCellData = [
  { title: "Transaction ID", flex: 1 },
  { title: "Trip ID", flex: 2 },
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
}

const TripChargesTable: FC<Props> = ({order, dateStart, dateEnd, minAmount, setTotalWithdrawal}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isError, refetch } = useGetAllTransactionsQuery(
    {
      limit: pageSize,
      page: currentPage,
      search: search,
      filter: "trip_charges_to_kabukabu",
      order,
      dateStart,
      dateEnd,
      minAmount
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
        rowComponent={(rows) => <TripChargesTableRow data={rows} />}
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

export default TripChargesTable;
