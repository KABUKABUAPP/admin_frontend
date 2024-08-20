import { useGetAllTransactionsQuery } from "@/api-services/transactionsService";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import React, { FC, useEffect, useState } from "react";
import TopUpTableRow from "./TableRows/TopUpTableRow";
import Pagination from "@/components/common/Pagination";
import { useGetUsersWalletBalancesQuery, walletApi } from "@/api-services/walletService";
import UsersWalletTableRow from "./TableRows/UsersWalletTableRow";
import { useRouter } from "next/router";

const headCellData = [
  { title: "Name", flex: 2 },
  { title: "User Email", flex: 2 },
  { title: "User Type", flex: 1 },
  { title: "Current Balance", flex: 1 }
];

interface Props {
  search: string;
  userType: string;
}

const UsersWalletTable: FC<Props> = ({search, userType}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError, refetch } = useGetUsersWalletBalancesQuery(
    {
      limit: pageSize,
      page: currentPage,
      search: search,
      userType
    },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  /*useEffect(() => {
    if (data) console.log('senth wallet', {data});
  }, [data])*/

  return (
    <>
      <EnhancedTable
        headCellData={headCellData}
        generic={true}
        maxWidth="100vw"
        isLoading={isLoading}
        refetch={refetch}
        isError={isError}
        rowComponent={(rows)=> <UsersWalletTableRow data={rows} currentPage={currentPage} />}
        rowData={data?.data?.data}
      />
      {data && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data?.data?.pagination?.total}
          pageSize={pageSize}
          onPageChange={(page) => {
            setCurrentPage(page)
          }}
        />
      )}
    </>
  );
};

export default UsersWalletTable;
