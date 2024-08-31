import React, { FC, useEffect } from "react";
import AccountBalanceCard from "./AccountBalanceCard";
import { useRouter } from "next/router";
import { useGetWalletBalancesQuery } from "@/api-services/walletService";
import { FALSE } from "sass";

interface Props {
  data: any;
  handleClick: (title: string) => any;
  totalWithdrawal?: any;
  range?: string;
  summation: any;
}

const AccountBalanceCardContainer: FC<Props> = ({ data, handleClick, totalWithdrawal, range, summation }) => {
  const router = useRouter();
  const tab = router.query.tab;

  const { data: walletData, isLoading, isError, refetch } = useGetWalletBalancesQuery(
    { range },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  console.log('bendtner', {data})

  return (
    <>
      <div className="flex gap-8 flex-wrap py-3 max-md:justify-center">
        {
          !tab && summation &&
          <AccountBalanceCard title="Total Transactions" amount={parseInt(summation.total)} isActive={true} handleClick={(title)=>handleClick(title)}/>
        }
        {(tab && summation && (tab === 'trip_payments' || tab === 'trip_charges' || tab === 'withdrawals' || tab === 'sharp_payments')) && (
          <>
            <AccountBalanceCard title="Total Transactions" amount={parseInt(summation.debit.total)} isActive={true} handleClick={(title)=>handleClick(title)}/>
          </>          
        )}
        
        {(tab && summation && (tab === 'top_up' || tab === 'manual_credit')) && (
          <>
            <AccountBalanceCard title="Total Transactions" amount={parseInt(summation.credit.total)} isActive={true} handleClick={(title)=>handleClick(title)}/>
          </>          
        )}

        {
          data && data.map((t: any) => (
            t.title === 'Net income' &&
            <AccountBalanceCard {...t} handleClick={(title)=>handleClick(title)}/>
          ))
        }

        {/*
          tab && (tab === 'withdrawals') &&
          <AccountBalanceCard title="Total Withdrawal" amount={totalWithdrawal} isActive={true} handleClick={(title)=>handleClick(title)}/>
        }

        {
          tab && (tab === 'manual_credit') &&
          <AccountBalanceCard title="Total Credited" amount={totalWithdrawal} isActive={true} handleClick={(title)=>handleClick(title)}/>
        */}

        {
          walletData && (!tab || tab === 'wallets') &&
          <>
            <AccountBalanceCard title="Wallet Balance(Total)" amount={walletData?.data?.total} isActive={false} handleClick={(title)=>handleClick(title)}/>
            <AccountBalanceCard title="Wallet Balance(Driver)" amount={walletData?.data?.driver} isActive={false} handleClick={(title)=>handleClick(title)}/>
            <AccountBalanceCard title="Wallet Balance(Rider)" amount={walletData?.data?.rider} isActive={false} handleClick={(title)=>handleClick(title)}/>
            <AccountBalanceCard title="Wallet Balance(Sharp)" amount={walletData?.data?.sharp} isActive={false} handleClick={(title)=>handleClick(title)}/>
            <AccountBalanceCard title="Wallet Balance(Other)" amount={walletData?.data?.other} isActive={false} handleClick={(title)=>handleClick(title)}/>
          </>
        }
      </div>
    </>
  );
};

export default AccountBalanceCardContainer;
