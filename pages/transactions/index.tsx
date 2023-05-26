import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import AccountBalanceCardContainer from "@/components/modules/Transactions/AccountBalanceCardContainer";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import TransactionsTable from "@/components/modules/Transactions/TransactionsTable";
import { useGetAllTransactionsQuery } from "@/api-services/transactionsService";
import Pagination from "@/components/common/Pagination";

const Transactions: NextPage = () => {
  const [accountCardData, setAccountCardData] = useState(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isError, refetch } = useGetAllTransactionsQuery(
    { limit: pageSize, page: currentPage, search: search },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );
  const handleClickAccountCard = (title: string) => {
    const mutated = accountCardData.map((item) => {
      if (item.title === title) return { ...item, isActive: true };
      return { ...item, isActive: false };
    });

    setAccountCardData(mutated);
  };

  const dropDownOptions = [
    { label: "Newest First", value: "", default: true },
    { label: "Oldest First", value: "", default: false },
  ];

  const [selectedDropDown, setSelectedDropDown] = useState<string>(
    dropDownOptions.find((opt) => opt.default === true)?.value || ""
  );

  

  return (
    <AppLayout>
      <AccountBalanceCardContainer
        data={accountCardData}
        handleClick={(title) => {}}
      />
      <SearchFilterBar
        filterOptions={dropDownOptions}
        dropDownOptionSelected={selectedDropDown}
        handleDropDown={(val) => {
          setSelectedDropDown(String(val));
        }}
        searchValue={search}
        handleSearch={(val) => setSearch(val)}
      />
      <TransactionsTable
        isError={isError}
        isLoading={isLoading}
        refetch={refetch}
        tableData={data}
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
    </AppLayout>
  );
};

export default Transactions;

const mockData = [
  {
    title: "Total Transactions",
    amount: 100000000,
    isActive: true,
  },
  {
    title: "Money in escrow",
    amount: 100000000,
    isActive: false,
  },
  {
    title: "Active trip",
    amount: 100000000,
    isActive: false,
  },
  {
    title: "Net income",
    amount: 100000000,
    isActive: false,
  },
];
