import React, { FC, useState, useEffect } from "react";

import Card from "@/components/common/Card";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/router";
import { useGetAllTransactionsQuery } from "@/api-services/transactionsService";
import Loader from "@/components/ui/Loader/Loader";
import ArrowDownToLine from "@/components/icons/ArrowDownToLine";
import ArrowUpToLine from "@/components/icons/ArrowUpToLine";
import Pagination from "@/components/common/Pagination";
import TimesIconRed from "@/components/icons/TimesIconRed";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  walletBalance?: string | number;
  total?: string | number;
  bg?: string
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

const FinancialsCard: FC<Props> = ({ walletBalance, total, bg='#FFFFFF' }) => {
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
    if (theActive === 'trip-payment') setTransactionFilter('TRIP_PAYMENT')
    if (theActive === 'regular-trip-payment') setTransactionFilter('REGULAR_TRIP_PAYMENT')
  }, [theActive])


  const { data, isLoading, isError, refetch } = useGetAllTransactionsQuery(
    {
      limit: pageSize,
      page: currentPage,
      search: `${router.query.id}`,
      filter: transactionFilter,
      order: 'newest_first',
    },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  return (
    <>
      <Card bg={bg}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Financials</p>
            <Button
              title="View Transaction History"
              color="tetiary"
              variant="text"
              className={`${isDeleted ? '!text-[#9A9A9A]' : ''}`}
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </div>

          <div className="flex py-4">
            {walletBalance && (
              <div className="pr-3 border-r border-r-[#D4D4D4]">
                <p className="text-2xl font-semibold">
                  N{Number(walletBalance)?.toLocaleString()}
                </p>
                <p className="text-lg text-[#9A9A9A]">Wallet Balance</p>
              </div>
            )}

            {total && (
              <div className="pl-3">
                <p className="text-2xl font-semibold">
                  N{Number(total)?.toLocaleString()}
                </p>
                <p className="text-lg text-[#9A9A9A]">Total amount spent</p>
              </div>
            )}
          </div>
        </div>
      </Card>
      <div className={`text-[#000] w-100 ${isOpen ? 'block' : 'hidden'} fixed inset-y-0 right-0 z-10`}>
        <Card height="100vh" rounded="rounded-tl-lg rounded-bl-lg">
          <div className="flex justify-center mt-3 mb-5">
            <div className="cursor-pointer mx-2 justify-start flex" onClick={() => setIsOpen(false)}><TimesIconRed /></div>
            <div className="font-bold mx-2 justify-center flex">
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
              <p className={`text-xs p-2 cursor-pointer rounded-md w-auto bg-[#E6E6E6] border ${theActive === 'trip-payment' ? 'border-[#FFBF00]' : 'border-[#E6E6E6]'}`} onClick={() => setTheActive('trip-payment')}>Trip Payment</p>
              <p className={`text-xs p-2 cursor-pointer rounded-md w-auto bg-[#E6E6E6] border ${theActive === 'regular-trip-payment' ? 'border-[#FFBF00]' : 'border-[#E6E6E6]'}`} onClick={() => setTheActive('regular-trip-payment')}>Regular Trip Payment</p>
            </div>
          
          {
            isLoading ?
            <Loader /> :
            data?.data?.map((transaction) => (
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
