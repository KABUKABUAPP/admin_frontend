import React, { FC } from "react";

import Card from "@/components/common/Card";

interface Props {
  processed: number;
  approved: number;
  declined: number;
}

const SummaryCard: FC<Props> = ({ processed, approved, declined }) => {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Summary</p>
        </div>

        <div className="flex py-4">
          <div className="pr-3 border-r border-r-[#D4D4D4]">
            <p className="text-2xl font-semibold">{processed}</p>
            <p className="text-lg text-[#9A9A9A]">Cars Processed</p>
          </div>

          <div className="px-3 border-r border-r-[#D4D4D4]">
            <p className="text-2xl font-semibold">{approved}</p>
            <p className="text-lg text-[#9A9A9A]">Approved cars</p>
          </div>

          <div className="pl-3">
            <p className="text-2xl font-semibold">{declined}</p>
            <p className="text-lg text-[#9A9A9A]">Declined cars</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SummaryCard;
