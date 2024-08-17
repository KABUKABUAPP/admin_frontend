import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Card from "@/components/common/Card";
import Button from "@/components/ui/Button/Button";
import TimesIconRed from "../icons/TimesIconRed";
import {
  useGetAllTransactionsQuery
} from "@/api-services/transactionsService";
import Pagination from "./Pagination";
import Loader from "../ui/Loader/Loader";
import TextField from "../ui/Input/TextField/TextField";
import ArrowDownToLine from "../icons/ArrowDownToLine";
import ArrowUpToLine from "../icons/ArrowUpToLine";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  walletBalance?: string | number;
  total?: string | number;
  subscriptionDue?: string | number;
  bg?: string;
}

const getFormattedTimeDate = (utcDate: any) => {
  const theDate = new Date(utcDate);
  const year = theDate.getFullYear();
  const month = String(theDate.getMonth() + 1).padStart(2, '0');
  const day = String(theDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${String(theDate.getHours()).padStart(2, '0')}:${String(theDate.getMinutes()).padStart(2, '0')}`; //:${String(theDate.getSeconds()).padStart(2, '0')}`;

  return { formattedDate, formattedTime }
}

const FinancialsCard: FC<Props> = ({
  walletBalance,
  total,
  subscriptionDue,
  bg = "#FFFFFF",
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isDeleted = router.pathname.includes("deleted");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [theActive, setTheActive] = useState<string>('all');
  const [transactionFilter, setTransactionFilter] = useState('')

  useEffect(() => {
    if (theActive === 'all') setTransactionFilter('')
    if (theActive === 'top-up') setTransactionFilter('WALLET_TOPUP')
    if (theActive === 'withdrawal') setTransactionFilter('DRIVER_WALLET_WITHDRAWAL')
    if (theActive === 'repayment') setTransactionFilter('CAR_REPAIR_LOAN_PAYMENT')
  }, [theActive])

  const { data, isLoading, isError, refetch } = useGetAllTransactionsQuery(
    {
      limit: pageSize,
      page: currentPage,
      search: `${router.query.id}`,
      filter: transactionFilter,
      order: 'newest_first',
      transactionStatus: 'success' 
    },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  return (
    <>
      <Card bg={bg}>
        <div className={`flex flex-col gap-4 ${isDeleted ? '!text-[#9A9A9A]' : ''}`}>
          <div className="flex items-center justify-between">
            <p className={"text-lg font-semibold"}>Financials</p>
            <Button
              title="View Transaction History"
              color="tetiary"
              variant="text"
              //disabled={true}
              className={`${isDeleted ? '!text-[#9A9A9A]' : ''}`}
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </div>

          <div className="border-b border-b-[#D4D4D4] flex py-4">
            <div className="pr-3 border-r border-r-[#D4D4D4]">
              <p className="text-2xl font-semibold">N{walletBalance}</p>
              <p className="text-lg text-[#9A9A9A]">Wallet Balance</p>
            </div>

            <div className="pl-3">
              <p className="text-2xl font-semibold">N{total}</p>
              <p className="text-lg text-[#9A9A9A]">Total amount earned</p>
            </div>
          </div>

          <div>
            <p className="text-2xl font-semibold">N{subscriptionDue}</p>
            <p className="text-lg text-[#9A9A9A]">Kabukabu Subscription Due</p>
          </div>
        </div>
      </Card>
      <div className={`text-[#000] w-100 ${isOpen ? 'block' : 'hidden'} fixed inset-y-0 right-0 z-10`}>
        <Card height="100vh" rounded="rounded-tl-lg rounded-bl-lg">
          <div className="flex justify-between mt-3 mb-5">
            <div className="cursor-pointer mx-2" onClick={() => setIsOpen(false)}><TimesIconRed /></div>
            <div className="font-bold mx-2">
              Transaction History
            </div>
          </div>

          {/*<p className="font-semi-bold">Search by a single date or a date range</p>
          <div className="w-full flex gap-2">
            <TextField
              label="Date From"
              placeholder=""
              type="date"
            />
            <TextField
              label="Date To"
              placeholder=""
              type="date"
            />
            </div>*/}

            <div className="flex gap-2 w-full mb-5">
              <p className={`text-xs p-2 cursor-pointer rounded-md w-auto bg-[#E6E6E6] border ${theActive === 'all' ? 'border-[#FFBF00]' : 'border-[#E6E6E6]'}`} onClick={() => setTheActive('all')}>All</p>
              <p className={`text-xs p-2 cursor-pointer rounded-md w-auto bg-[#E6E6E6] border ${theActive === 'top-up' ? 'border-[#FFBF00]' : 'border-[#E6E6E6]'}`} onClick={() => setTheActive('top-up')}>Top Up</p>
              <p className={`text-xs p-2 cursor-pointer rounded-md w-auto bg-[#E6E6E6] border ${theActive === 'withdrawal' ? 'border-[#FFBF00]' : 'border-[#E6E6E6]'}`} onClick={() => setTheActive('withdrawal')}>Withdrawal</p>
              <p className={`text-xs p-2 cursor-pointer rounded-md w-auto bg-[#E6E6E6] border ${theActive === 'repayment' ? 'border-[#FFBF00]' : 'border-[#E6E6E6]'}`} onClick={() => setTheActive('repayment')}>Repayment</p>
            </div>
          
          {
            isLoading ?
            <Loader /> :
            data?.data?.map((transaction: any) => (
              <div className="flex gap-2 justify-center items-center rounded-md p-3 border border-[#E6E6E6] my-3">
                <div className="flex justify-center items-center w-[5%]">{transaction.type === 'DR' ? <ArrowDownToLine /> : <ArrowUpToLine />}</div>
                <div className="flex flex-col justify-start w-[75%] gap-2">
                  <p className="font-bold text-sm">{capitalizeAllFirstLetters(transaction.narration.replace(/_/g, ' ').toLowerCase())}</p>
                  <p className="text-xs text-[#9A9A9A]">{`${getFormattedTimeDate(transaction.date).formattedDate} at ${getFormattedTimeDate(transaction.date).formattedTime}`}</p>
                </div>
                <div className={`flex justify-start w-[20%] ${transaction.type === 'DR' ? 'text-[#EF2C5B]' : 'text-[#000]'} text-xs`}>{transaction.price}</div>
              </div>
            ))
          }

          {data && (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={data.totalCount}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </Card>
      </div>
    </>
  );
};

export default FinancialsCard;
