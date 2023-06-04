import React, { FC } from "react";

import Card from "@/components/common/Card";
import DropDown from "@/components/ui/DropDown";
import TripHistoryItem from "./TripHistoryItem";
import Button from "../ui/Button/Button";

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
  totalCount: number;
  currentCount: number;
  handleViewMore: () => void;
}

const TripHistoryCard: FC<Props> = ({
  tripHistoryData,
  totalCount,
  currentCount,
  handleViewMore,
}) => {
  const unseenHistory = totalCount - currentCount;

  return (
    <Card>
      <div className="flex justify-between mb-6">
        <p className="font-semibold text-lg">Trip History[{totalCount}]</p>
        <div className="flex gap-2 items-center">
          <p className="text-sm">Sort:</p>
          <DropDown placeholder="Newest First" />
        </div>
      </div>
      <div className="flex flex-col gap-4 max-h-[1000px] overflow-auto scrollbar-none">
        {tripHistoryData?.map((history, idx) => (
          <TripHistoryItem {...history} key={idx} />
        ))}
      </div>

      {unseenHistory >= 5 && (
        <div className="py-4">
          <Button
            variant="text"
            title={`View ${unseenHistory} more`}
            onClick={handleViewMore}
          />
        </div>
      )}
    </Card>
  );
};

export default TripHistoryCard;
