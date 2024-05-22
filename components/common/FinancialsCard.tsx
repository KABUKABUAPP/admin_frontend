import React, { FC } from "react";
import { useRouter } from "next/router";

import Card from "@/components/common/Card";
import Button from "@/components/ui/Button/Button";

interface Props {
  walletBalance?: string | number;
  total?: string | number;
  subscriptionDue?: string | number;
  bg?: string;
}

const FinancialsCard: FC<Props> = ({
  walletBalance,
  total,
  subscriptionDue,
  bg = "#FFFFFF",
}) => {
  const router = useRouter();
  const isDeleted = router.pathname.includes("deleted");

  return (
    <Card bg={bg}>
      <div className={`flex flex-col gap-4 ${isDeleted ? '!text-[#9A9A9A]' : ''}`}>
        <div className="flex items-center justify-between">
          <p className={"text-lg font-semibold"}>Financials</p>
          <Button
            title="View Transaction History"
            color="tetiary"
            variant="text"
            disabled={true}
            className={`${isDeleted ? '!text-[#9A9A9A]' : ''}`}
            onClick={() => {
              console.log('transaction history')
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
  );
};

export default FinancialsCard;
