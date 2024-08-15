import { useRouter } from "next/router";
import React, { FC } from "react";

interface Props {
  title: string;
  amount: number;
  isActive: boolean;
  handleClick: (title: string) => any;
}

const AccountBalanceCard: FC<Props> = ({
  title,
  amount,
  isActive,
  handleClick,
}) => {
  const router = useRouter();

  const tab = router.query.tab;

  return (
    <div
      onClick={() => handleClick(title)}
      className={`${isActive || (tab && tab === 'wallets' && title === 'Wallet Balance(Total)') ? "bg-[#FEC319] scale-110" : "bg-[#EFEFEF]"} rounded-lg w-[180px] max-w-[100%] px-8 py-4 transition-all cursor-pointer flex flex-col justify-center`}
    >
      <p className={`font-bold transition-all ${isActive ? "text-2xl" : "text-xl"}`}>
        N{amount?.toLocaleString()}
      </p>
      <p className="text-xs font-semibold">{title}</p>
    </div>
  );
};

export default AccountBalanceCard;
