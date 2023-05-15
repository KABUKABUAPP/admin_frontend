import React, { FC } from "react";

import Card from "@/components/common/Card";
import Button from "@/components/ui/Button/Button";

interface Props {
  walletBalance?: string | number;
  total?: string | number;
}

const FinancialsCard: FC<Props> = ({ walletBalance, total }) => {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Financials</p>
          <Button
            title="View Transaction History"
            color="tetiary"
            variant="text"
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
  );
};

export default FinancialsCard;
