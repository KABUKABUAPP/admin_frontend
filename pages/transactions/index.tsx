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
import UsersWalletTable from "@/components/modules/Transactions/UsersWalletTable";
import Cookies from "js-cookie";
import { USER_TOKEN } from "@/constants";


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
  const [userType, setUserType] = useState<string>("");
  const dropDownOptions = [
    { label: "Newest First", value: "newest_first", default: true },
    { label: "Oldest First", value: "oldest_first", default: false },
  ];
  const tripPaymentOptions = [
    { label: "All", value: "trip_payment", default: false },
    { label: "Regular", value: "REGULAR_TRIP_PAYMENT", default: true },
    { label: "SUV", value: "SUV_TRIP_PAYMENT", default: false },
    { label: "Tricycle", value: "TRICYCLE_TRIP_PAYMENT", default: false },
    { label: "Dispatch", value: "DISPATCH_TRIP_PAYMENT", default: false },
    { label: "Haulage", value: "HAULAGE_TRIP_PAYMENT", default: false }
  ];
  const [tripPaymentView, setTripPaymentsView] = useState(false);
  const [tripPaymentOptionsSelected, setTripPaymentOptionsSelected] = useState<string>(
    tripPaymentOptions.find((opt) => opt.default === true)?.value || "REGULAR_TRIP_PAYMENT"
  );
  const [selectedDropDown, setSelectedDropDown] = useState<string>(
    dropDownOptions.find((opt) => opt.default === true)?.value || "newest_first"
  );
  const [minAmount, setMinAmount] = useState(0);
  const [dateStart, setDateStart] = useState<any>();
  const [dateEnd, setDateEnd] = useState<any>();
  const [totalWithdrawal, setTotalWithdrawal] = useState(1);
  const [transactionFilter, setTransactionFilter] = useState('');
  const [summationView, setSummationView] = useState('credit');
  const [userRole, setUserRole] = useState('');

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
    wallets = "wallets",
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

  const transactionStatusOptions = [
    { label: "Success", value: "success", default: true },
    { label: "Pending", value: "pending", default: false },
    { label: "Failed", value: "failed", default: false },
    { label: "Reversed", value: "reversed", default: false }
  ];

  const [transactionStatusFilter, setTransactionStatusFilter] = useState<string>(
    transactionStatusOptions.find((opt) => opt.default === true)?.value || "success"
  );

  const handleTransactionStatusDropdown = (val: any) => {
    setTransactionStatusFilter(val);
  }

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
    if (!router.query.tab || router.query.tab === '') {
      setTransactionFilter(``);
    }

    if (router.query.tab && router.query.tab === 'trip_payments') {
      setTransactionFilter(`REGULAR_TRIP_PAYMENT`);
    }

    if (router.query.tab && router.query.tab === 'trip_charges') {
      setTransactionFilter(`TRIP_CHARGES_TO_KABUKABU`);
    }

    if (router.query.tab && router.query.tab === 'top_up') {
      setTransactionFilter(`WALLET_TOPUP`);
    }

    if (router.query.tab && router.query.tab === 'withdrawals') {
      setTransactionFilter(`DRIVER_WALLET_WITHDRAWAL`);
    }

    if (router.query.tab && router.query.tab === 'manual_credit') {
      setTransactionFilter(`CREDIT_USER_WALLET_FROM_ADMIN`);
    }

    if (router.query.tab && router.query.tab === 'subscriptions') {
      setTransactionFilter(`DRIVER_TRIP_CHARGES`);
    }

    if (router.query.tab && router.query.tab === 'sharp_payments') {
      setTransactionFilter(`SHARP_PAYMENT_TO_KABUKABU`);
    }
  }, [router.query.tab]);

  const { data, isLoading, isError, refetch } = useGetAllTransactionsQuery(
    {
      limit: pageSize,
      page: currentPage,
      search: search,
      filter: transactionFilter,
      order: selectedDropDown,
      dateStart,
      dateEnd,
      minAmount,
      transactionStatus: transactionStatusFilter
    },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  useEffect(() => {
    const storedToken = Cookies.get(USER_TOKEN);

    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      setUserRole(parsedToken.role)
    }
  }, [])


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
        {transactionCard && userRole === 'principal' && (
          <AccountBalanceCardContainer
            data={transactionCard}
            handleClick={(title) => {}}
            totalWithdrawal={totalWithdrawal}
            range={statusFilter}
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
          transactionStatus={transactionStatusFilter}
          transactionStatusDropdown={transactionStatusOptions}
          handleTransactionStatusDropdown={handleTransactionStatusDropdown}
          showUserTypeFilter={String(tab) === Tab.wallets ? true : false}
          setUserTypeFilter={setUserType}
        />

          {
            router.query.tab !== 'wallets' &&
            <div className="z-20 rounded-lg bg-[#FFF] my-5 p-4">
                <div className="flex w-auto justify-center items-center sm:justify-start gap-3">
                  <div className={`cursor-pointer w-auto ${summationView === 'credit' && 'font-semibold'}`} onClick={() => {
                    setSummationView('credit')
                  }}>Credit</div>
                  <div className="w-auto">|</div>
                  <div className={`cursor-pointer w-auto ${summationView === 'debit' && 'font-semibold'}`} onClick={() => {
                    setSummationView('debit')
                  }}>Debit</div>
                </div>

                {
                  summationView === 'credit' && data &&
                  <div className="flex flex-col sm:flex-row gap-3 my-3">
                    <div className="rounded-md w-full sm:w-1/6 bg-[#EFEFEF] flex flex-col p-2">
                      <p className={`font-bold transition-all text-xl`}>
                        N{data?.summation?.credit?.failed.toLocaleString()}
                      </p>
                      <p className="text-xs font-semibold">{'Failed'}</p>
                    </div>
                    
                    <div className="rounded-md w-full sm:w-1/6 bg-[#EFEFEF] flex flex-col p-2">
                      <p className={`font-bold transition-all text-xl`}>
                        N{data?.summation?.credit?.pending.toLocaleString()}
                      </p>
                      <p className="text-xs font-semibold">{'Pending'}</p>
                    </div>
                    
                    <div className="rounded-md w-full sm:w-1/6 bg-[#EFEFEF] flex flex-col p-2">
                      <p className={`font-bold transition-all text-xl`}>
                        N{data?.summation?.credit?.reversal.toLocaleString()}
                      </p>
                      <p className="text-xs font-semibold">{'Reversals'}</p>
                    </div>
                    
                    <div className="rounded-md w-full sm:w-1/6 bg-[#EFEFEF] flex flex-col p-2">
                      <p className={`font-bold transition-all text-xl`}>
                        N{data?.summation?.credit?.success.toLocaleString()}
                      </p>
                      <p className="text-xs font-semibold">{'Successful'}</p>
                    </div>
                    
                    <div className="rounded-md w-full sm:w-1/6 bg-[#EFEFEF] flex flex-col p-2">
                      <p className={`font-bold transition-all text-xl`}>
                        N{data?.summation?.credit?.other.toLocaleString()}
                      </p>
                      <p className="text-xs font-semibold">{'Others'}</p>
                    </div>
                    
                    <div className="rounded-md w-full sm:w-1/6 bg-[#EFEFEF] flex flex-col p-2">
                      <p className={`font-bold transition-all text-xl`}>
                        N{data?.summation?.credit?.total.toLocaleString()}
                      </p>
                      <p className="text-xs font-semibold">{'Total'}</p>
                    </div>
                  </div>
                }

                {
                  summationView === 'debit' && data &&
                  <div className="flex flex-col sm:flex-row gap-3 my-3">
                    <div className="rounded-md w-full sm:w-1/6 bg-[#EFEFEF] flex flex-col p-2">
                      <p className={`font-bold transition-all text-xl`}>
                        N{data?.summation?.debit?.failed.toLocaleString()}
                      </p>
                      <p className="text-xs font-semibold">{'Failed'}</p>
                    </div>
                    
                    <div className="rounded-md w-full sm:w-1/6 bg-[#EFEFEF] flex flex-col p-2">
                      <p className={`font-bold transition-all text-xl`}>
                        N{data?.summation?.debit?.pending.toLocaleString()}
                      </p>
                      <p className="text-xs font-semibold">{'Pending'}</p>
                    </div>
                    
                    <div className="rounded-md w-full sm:w-1/6 bg-[#EFEFEF] flex flex-col p-2">
                      <p className={`font-bold transition-all text-xl`}>
                        N{data?.summation?.debit?.reversal.toLocaleString()}
                      </p>
                      <p className="text-xs font-semibold">{'Reversals'}</p>
                    </div>
                    
                    <div className="rounded-md w-full sm:w-1/6 bg-[#EFEFEF] flex flex-col p-2">
                      <p className={`font-bold transition-all text-xl`}>
                        N{data?.summation?.debit?.success.toLocaleString()}
                      </p>
                      <p className="text-xs font-semibold">{'Successful'}</p>
                    </div>
                    
                    <div className="rounded-md w-full sm:w-1/6 bg-[#EFEFEF] flex flex-col p-2">
                      <p className={`font-bold transition-all text-xl`}>
                        N{data?.summation?.debit?.other.toLocaleString()}
                      </p>
                      <p className="text-xs font-semibold">{'Others'}</p>
                    </div>
                    
                    <div className="rounded-md w-full sm:w-1/6 bg-[#EFEFEF] flex flex-col p-2">
                      <p className={`font-bold transition-all text-xl`}>
                        N{data?.summation?.debit?.total.toLocaleString()}
                      </p>
                      <p className="text-xs font-semibold">{'Total'}</p>
                    </div>
                  </div>
                }
            </div>
          }

        {String(tab) === Tab.all_transactions && (
          <AllTransactionsTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} transactionStatus={transactionStatusFilter} search={search} />
        )}
        {String(tab) === Tab.sharp_payments && (
          <SharpPaymentsTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} transactionStatus={transactionStatusFilter} search={search} />
        )}

        {String(tab) === Tab.subscriptions && (
          <SubscriptionsTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} transactionStatus={transactionStatusFilter} search={search} />
        )}

        {String(tab) === Tab.top_up && <TopUpTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} transactionStatus={transactionStatusFilter} search={search} />}

        {String(tab) === Tab.trip_charges && (
          <TripChargesTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} transactionStatus={transactionStatusFilter} search={search} />
        )}

        {String(tab) === Tab.trip_payments && (
          <TripPaymentsTable order={selectedDropDown} paymentType={tripPaymentOptionsSelected} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} transactionStatus={transactionStatusFilter} search={search} />
        )}

        {String(tab) === Tab.withdrawals && <WithdrawalsTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} transactionStatus={transactionStatusFilter} search={search} />}

        {String(tab) === Tab.manual_credit && <ManualCreditTable order={selectedDropDown} dateStart={dateStart} dateEnd={(dateStart && !dateEnd) ? getYesterdaysDate() : dateEnd} minAmount={minAmount} setTotalWithdrawal={setTotalWithdrawal} transactionStatus={transactionStatusFilter} search={search} />}

        {String(tab) === Tab.wallets && <UsersWalletTable search={search} userType={userType} />}
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
