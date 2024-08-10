import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AppLayout from "@/layouts/AppLayout";
import AccountBalanceCardContainer from "@/components/modules/Transactions/AccountBalanceCardContainer";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import TransactionsTable from "@/components/modules/Transactions/TransactionsTable";
import {
  useGetAllTransactionsQuery,
  useGetTransactionsCardQuery,
} from "@/api-services/transactionsService";
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
import ManualCreditTable from "@/components/modules/Transactions/ManualCreditTable";
import DropDown from "@/components/ui/DropDown";
import AppHead from "@/components/common/AppHead";


function getYesterdaysDate() {
  // Get today's date
  const today = new Date();

  // Subtract one day (in milliseconds)
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  // Get the day, month, and year
  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based
  const year = today.getFullYear();

  // Format day and month to always have two digits
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Return the formatted date string
  return `${formattedMonth}-${formattedDay}-${year}`;
}


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
  const tripPaymentOptions = [
    { label: "All", value: "trip_payment", default: true },
    { label: "Regular", value: "REGULAR_TRIP_PAYMENT", default: false },
    { label: "SUV", value: "SUV_TRIP_PAYMENT", default: false },
    { label: "Tricycle", value: "TRICYCLE_TRIP_PAYMENT", default: false },
    { label: "Dispatch", value: "DISPATCH_TRIP_PAYMENT", default: false },
    { label: "Haulage", value: "HAULAGE_TRIP_PAYMENT", default: false }
  ];
  const [tripPaymentView, setTripPaymentsView] = useState(false);
  const [tripPaymentOptionsSelected, setTripPaymentOptionsSelected] = useState<string>(
    tripPaymentOptions.find((opt) => opt.default === true)?.value || "trip_payment"
  );
  const [selectedDropDown, setSelectedDropDown] = useState<string>(
    dropDownOptions.find((opt) => opt.default === true)?.value || "newest_first"
  );
  const [minAmount, setMinAmount] = useState(1);
  const [dateStart, setDateStart] = useState<any>();
  const [dateEnd, setDateEnd] = useState<any>();
  const [totalWithdrawal, setTotalWithdrawal] = useState(1)

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
    if (String(tab) === 'trip_payments') setTripPaymentsView(true);
    if (String(tab) !== 'trip_payments') setTripPaymentsView(false);
  }, [tab]);

  enum Tab {
    all_transactions = "undefined",
    trip_payments = "trip_payments",
    trip_charges = "trip_charges",
    top_up = "top_up",
    withdrawals = "withdrawals",
    manual_credit = "manual_credit",
    subscriptions = "subscriptions",
    sharp_payments = "sharp_payments",
  }

  const statusFilterOptions = [
    { label: "Today", value: "today", default: false },
    { label: "Yesterday", value: "yesterday", default: false },
    { label: "This Week", value: "this_week", default: true },
    // { label: "Yesterday", value: "yesterday", default: false },
  ];

  const [statusFilter, setStatusFilter] = useState<string>(
    statusFilterOptions.find((opt) => opt.default === true)?.value || "today"
  );

  const {
    data: transactionCard,
    isLoading: transactionCardLoading,
    error: transactionCardError,
    refetch: refetchTransactionCard,
  } = useGetTransactionsCardQuery(
    { range: statusFilter },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (transactionCard) console.log({transactionCard})
  }, [transactionCard])

  return (
    <>
      <AppHead title="Kabukabu | Transactions" />
      <AppLayout>
        <div className="text-xs flex items-center mb-2">
          <span>Show transactions of:</span>
          <DropDown
            left={0}
            placeholder="Filter"
            options={statusFilterOptions}
            value={statusFilter}
            handleChange={(val) => {
              setStatusFilter(String(val));
            }}
          />
        </div>
        {transactionCard && (
          <AccountBalanceCardContainer
            data={transactionCard}
            handleClick={(title) => {}}
            totalWithdrawal={totalWithdrawal}
          />
        )}
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
          tripPaymentView={tripPaymentView}
          tripPaymentOptions={tripPaymentOptions}
          tripPaymentOptionsSelected={tripPaymentOptionsSelected}
          handleTripPayments={(val) => {
            setTripPaymentOptionsSelected(String(val));
          }}
          setDateStart={setDateStart}
          setDateEnd={setDateEnd}
          setMinAmount={setMinAmount}
        />
        {String(tab) === Tab.all_transactions && (
          <AllTransactionsTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} />
        )}
        {String(tab) === Tab.sharp_payments && (
          <SharpPaymentsTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} />
        )}

        {String(tab) === Tab.subscriptions && (
          <SubscriptionsTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} />
        )}

        {String(tab) === Tab.top_up && <TopUpTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} />}

        {String(tab) === Tab.trip_charges && (
          <TripChargesTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} />
        )}

        {String(tab) === Tab.trip_payments && (
          <TripPaymentsTable order={selectedDropDown} paymentType={tripPaymentOptionsSelected} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} />
        )}

        {String(tab) === Tab.withdrawals && <WithdrawalsTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} />}

        {String(tab) === Tab.manual_credit && <ManualCreditTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} />}
      </AppLayout>
    </>
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
