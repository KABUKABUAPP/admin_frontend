import React, { FC, useState } from "react";

import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import { useGetAllTransactionsQuery } from "@/api-services/transactionsService";
import Pagination from "@/components/common/Pagination";
import TopUpTableRow from "./TableRows/TopUpTableRow";

const headCellData = [
  { title: "Transaction ID", flex: 1 },
  { title: "User", flex: 2 },
  { title: "User Type", flex: 2 },
  { title: "Type", flex: 1 },
  { title: "Narration", flex: 1 },
  { title: "Price", flex: 1 },
  { title: "Date", flex: 1 },
  { title: "", flex: 2 },
];

interface Props {
  order: string;
}

const TopUpTable: FC<Props> = ({order}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isError, refetch } = useGetAllTransactionsQuery(
    {
      limit: pageSize,
      page: currentPage,
      search: search,
      filter: "wallet_topup",
      order
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
        rowComponent={(rows)=><TopUpTableRow data={rows}/>}
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

export default TopUpTable;
