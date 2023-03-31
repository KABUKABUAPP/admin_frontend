import React, { FC } from "react";
import AccountBalanceCard from "./AccountBalanceCard";

interface Props {
  data: {
    title: string;
    amount: number;
    isActive: boolean;
  }[];
  handleClick: (title: string) => any;
}

const AccountBalanceCardContainer: FC<Props> = ({ data, handleClick }) => {
  return (
    <div className="flex gap-8 flex-wrap py-3 max-md:justify-center">
      {data.map((item, idx) => (
        <AccountBalanceCard {...item} key={idx} handleClick={(title)=>handleClick(title)}/>
      ))}
    </div>
  );
};

export default AccountBalanceCardContainer;
