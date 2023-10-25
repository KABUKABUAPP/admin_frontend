import React, { FC } from "react";

import Card from "@/components/common/Card";

interface Props {
  disputesRaised: number;
  pendingDisputes: number;
}

const SummaryCard: FC<Props> = ({ disputesRaised, pendingDisputes }) => {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Summary</p>
        </div>

        <div className="flex py-4 border-b border-b-[#D4D4D4]">
          <div className="pr-3 border-r border-r-[#D4D4D4]">
            <p className="text-2xl font-semibold">{disputesRaised}</p>
            <p className="text-lg text-[#9A9A9A]">Total disputes raised</p>
          </div>

          <div className="pl-3">
            <p className="text-2xl font-semibold">{pendingDisputes}</p>
            <p className="text-lg text-[#9A9A9A]">Total disputes pending</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SummaryCard;
