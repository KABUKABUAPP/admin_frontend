import Card from "@/components/common/Card";
import React, { FC } from "react";

interface Props {
  approved: number;
  declined: number;
  carsInHub: number;
}

const SummaryCard: FC<Props> = ({ approved, declined, carsInHub }) => {
  return <Card>
  <div className="flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <p className="text-lg font-semibold">Summary</p>
    </div>

    <div className="border-b border-b-[#D4D4D4] flex py-4">
      <div className="pr-3 border-r border-r-[#D4D4D4]">
        <p className="text-2xl font-semibold">{approved}</p>
        <p className="text-lg text-[#9A9A9A]">Total approved cars</p>
      </div>

      <div className="pl-3">
        <p className="text-2xl font-semibold">{declined}</p>
        <p className="text-lg text-[#9A9A9A]">Total declined cars</p>
      </div>
    </div>

    <div>
      <p className="text-2xl font-semibold">{carsInHub}</p>
      <p className="text-lg text-[#9A9A9A]">Cars in hub</p>
    </div>
  </div>
</Card>
};

export default SummaryCard;
