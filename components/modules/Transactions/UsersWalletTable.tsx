import { useGetAllTransactionsQuery } from "@/api-services/transactionsService";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import React, { FC, useEffect, useState } from "react";
import TopUpTableRow from "./TableRows/TopUpTableRow";
import Pagination from "@/components/common/Pagination";
import { useGetUsersWalletBalancesQuery } from "@/api-services/walletService";
import UsersWalletTableRow from "./TableRows/UsersWalletTableRow";

const headCellData = [
  { title: "Name", flex: 2 },
  { title: "User Email", flex: 2 },
  { title: "User Type", flex: 1 },
  { title: "Current Balance", flex: 1 }
];

interface Props {
  search: string;
}

const UsersWalletTable: FC<Props> = ({search}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch } = useGetUsersWalletBalancesQuery(
    {
      limit: pageSize,
      page: currentPage,
      search: search
    },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  useEffect(() => {
    if (data) {
        console.log({data})
    }
  }, [data])

  return (
    <>
      <EnhancedTable
        headCellData={headCellData}
        generic={true}
        maxWidth="100vw"
        isLoading={isLoading}
        refetch={refetch}
        isError={isError}
        rowComponent={(rows)=> <UsersWalletTableRow data={rows} />}
        rowData={data?.data?.data}
      />
      {data && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data?.data?.pagination?.total}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
};

export default UsersWalletTable;
