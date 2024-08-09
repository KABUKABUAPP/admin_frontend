import React, { FC, useEffect } from "react";
import AccountBalanceCard from "./AccountBalanceCard";
import { useRouter } from "next/router";
import { useGetWalletBalancesQuery } from "@/api-services/walletService";
import { FALSE } from "sass";

interface Props {
  data: {
    title: string;
    amount: number;
    isActive: boolean;
  }[];
  handleClick: (title: string) => any;
  totalWithdrawal?: any;
}

const AccountBalanceCardContainer: FC<Props> = ({ data, handleClick, totalWithdrawal }) => {
  const router = useRouter();
  const tab = router.query.tab;

  const { data: walletData, isLoading, isError, refetch } = useGetWalletBalancesQuery(
    {},
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  useEffect(() => {
    if (walletData) console.log({walletData})
  }, [walletData])

  return (
    <>
      {
        walletData &&
        <div className="flex gap-8 flex-wrap py-3 max-md:justify-center">
          <AccountBalanceCard title="Wallet Balance(Total)" amount={walletData?.data?.total} isActive={false} key={'total_withdrawals'} handleClick={(title)=>handleClick(title)}/>
          <AccountBalanceCard title="Wallet Balance(Driver)" amount={walletData?.data?.driver} isActive={false} key={'total_withdrawals'} handleClick={(title)=>handleClick(title)}/>
          <AccountBalanceCard title="Wallet Balance(Rider)" amount={walletData?.data?.rider} isActive={false} key={'total_withdrawals'} handleClick={(title)=>handleClick(title)}/>
          <AccountBalanceCard title="Wallet Balance(Sharp)" amount={walletData?.data?.sharp} isActive={false} key={'total_withdrawals'} handleClick={(title)=>handleClick(title)}/>
          <AccountBalanceCard title="Wallet Balance(Other)" amount={walletData?.data?.other} isActive={false} key={'total_withdrawals'} handleClick={(title)=>handleClick(title)}/>
        </div>
      }
      <div className="flex gap-8 flex-wrap py-3 max-md:justify-center">
        {(!tab || (tab !== 'withdrawals' && tab !== 'manual_credit')) && data.map((item, idx) => (
          <AccountBalanceCard {...item} key={idx} handleClick={(title)=>handleClick(title)}/>
        ))}

        {
          tab && (tab === 'withdrawals') &&
          <AccountBalanceCard title="Total Withdrawal" amount={totalWithdrawal} isActive={true} key={'total_withdrawals'} handleClick={(title)=>handleClick(title)}/>
        }

        {
          tab && (tab === 'manual_credit') &&
          <AccountBalanceCard title="Total Credited" amount={totalWithdrawal} isActive={true} key={'total_withdrawals'} handleClick={(title)=>handleClick(title)}/>
        }
      </div>
    </>
  );
};

export default AccountBalanceCardContainer;
