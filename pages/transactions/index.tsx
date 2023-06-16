import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AppLayout from "@/layouts/AppLayout";
import AccountBalanceCardContainer from "@/components/modules/Transactions/AccountBalanceCardContainer";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import TransactionsTable from "@/components/modules/Transactions/TransactionsTable";
import { useGetAllTransactionsQuery } from "@/api-services/transactionsService";
import Pagination from "@/components/common/Pagination";
import OptionBar from "@/components/common/OptionsBar";
import { transactionsOptionsBar } from "@/constants";
import AllTransactionsTable from "@/components/modules/Transactions/AllTransactionsTable";
import SharpPaymentsTable from "@/components/modules/Transactions/SharpPaymentsTable";
import SubscriptionsTable from "@/components/modules/Transactions/SubscriptionsTable";
import TopUpTable from "@/components/modules/Transactions/TopUpTable";
import TripChargesTable from "@/components/modules/Transactions/TripChargesTable";
import TripPaymentsTable from "@/components/modules/Transactions/TripPaymentsTable";
import WithdrawalsTable from "@/components/modules/Transactions/WithdrawalsTable";

const Transactions: NextPage = () => {
  const router = useRouter();
  const { tab } = router.query;
  const [accountCardData, setAccountCardData] = useState(mockData);
  const [transactionOptions, setTransactionOptions] = useState(
    transactionsOptionsBar
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState<string>("");
  const dropDownOptions = [
    { label: "Newest First", value: "newest_first", default: true },
    { label: "Oldest First", value: "oldest_first", default: false },
  ];

  const [selectedDropDown, setSelectedDropDown] = useState<string>(
    dropDownOptions.find((opt) => opt.default === true)?.value || "newest_first"
  );

  const { data, isLoading, isError, refetch } = useGetAllTransactionsQuery(
    {
      limit: pageSize,
      page: currentPage,
      search: search,
      filter: "",
      order: selectedDropDown,
    },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );
  const handleClickAccountCard = (title: string) => {
    const mutated = accountCardData.map((item) => {
      if (item.title === title) return { ...item, isActive: true };
      return { ...item, isActive: false };
    });

    setAccountCardData(mutated);
  };

  const handleClickOption = (keyVal: string) => {
    if (keyVal !== "")
      router.push(`/transactions?tab=${keyVal}`, undefined, { shallow: true });
    else router.push(`/transactions`, undefined, { shallow: true });
  };

  const handleActiveTab = (keyVal: string) => {
    const mutatedOptions = transactionOptions.map((item) => {
      return item.keyVal === keyVal
        ? { ...item, isActive: true }
        : { ...item, isActive: false };
    });
    setTransactionOptions(mutatedOptions);
  };

  useEffect(() => {
    let currentKey = "";
    if (tab) {
      const option = transactionOptions.filter((t) => t.keyVal === tab)[0];
      currentKey = option?.keyVal;
    } else {
      currentKey = "";
    }
    handleActiveTab(currentKey);
  }, [tab]);

  enum Tab {
    all_transactions = "undefined",
    trip_payments = "trip_payments",
    trip_charges = "trip_charges",
    top_up = "top_up",
    withdrawals = "withdrawals",
    subscriptions = "subscriptions",
    sharp_payments = "sharp_payments",
  }

  return (
    <AppLayout>
      <AccountBalanceCardContainer
        data={accountCardData}
        handleClick={(title) => {}}
      />
      <OptionBar
        options={transactionOptions}
        handleClickOption={(key) => {
          handleClickOption(key);
        }}
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
      {String(tab) === Tab.all_transactions && <AllTransactionsTable order={selectedDropDown}/>}
      {String(tab) === Tab.sharp_payments && <SharpPaymentsTable order={selectedDropDown}/>}

      {String(tab) === Tab.subscriptions && <SubscriptionsTable order={selectedDropDown}/>}

      {String(tab) === Tab.top_up && <TopUpTable order={selectedDropDown}/>}

      {String(tab) === Tab.trip_charges && <TripChargesTable order={selectedDropDown}/>}

      {String(tab) === Tab.trip_payments && <TripPaymentsTable order={selectedDropDown}/>}

      {String(tab) === Tab.withdrawals && <WithdrawalsTable />}
      {/* <TransactionsTable
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
      )} */}
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
