import React, { FC } from "react";
import AccountBalanceCard from "./AccountBalanceCard";
import { useRouter } from "next/router";

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

  return (
    <div className="flex gap-8 flex-wrap py-3 max-md:justify-center">
      {(!tab || (tab !== 'withdrawals' && tab !== 'manual_credit')) && data.map((item, idx) => (
        <AccountBalanceCard {...item} key={idx} handleClick={(title)=>handleClick(title)}/>
      ))}

      {
        tab && (tab === 'withdrawals' || tab === 'manual_credit') &&
        <AccountBalanceCard title="Total Withdrawal" amount={totalWithdrawal} isActive={true} key={'total_withdrawals'} handleClick={(title)=>handleClick(title)}/>
      }
    </div>
  );
};

export default AccountBalanceCardContainer;
