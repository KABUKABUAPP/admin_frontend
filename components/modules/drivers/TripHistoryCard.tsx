import React, { FC } from "react";

import Card from "@/components/common/Card";
import DropDown from "@/components/ui/DropDown";
import TripHistoryItem from "./TripHistoryItem";

interface Props {
  tripHistoryData?: {
    originTop?: string;
    originBottom?: string;
    destinationTop?: string;
    destinationBottom?: string;
    paymentMethod?: string;
    date?: string;
    amount?: string | number;
    id?: string;
  }[];
}

const TripHistoryCard: FC<Props> = ({ tripHistoryData }) => {
  return (
    <Card>
      <div className="flex justify-between mb-6">
        <p className="font-semibold text-lg">Trip History[50]</p>
        <div className="flex gap-2 items-center">
          <p className="text-sm">Sort:</p>
          <DropDown placeholder="Newest First" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {tripHistoryData?.map((history, idx) => (
          <TripHistoryItem {...history} key={idx} />
        ))}
      </div>
    </Card>
  );
};

export default TripHistoryCard;
