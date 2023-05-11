import WalletIcon from "@/components/icons/WalletIcon";
import React, { FC } from "react";
import OriginAltIcon from "@/components/icons/OriginAltIcon";
import DestinationAltIcon from "@/components/icons/DestinationAltIcon";

interface Props {
  originTop?: string;
  originBottom?: string;
  destinationTop?: string;
  destinationBottom?: string;
  paymentMethod?: string;
  date?: string;
  amount?: string | number;
  id?: string;
}

const TripHistoryItem: FC<Props> = ({
  originBottom,
  originTop,
  date,
  destinationBottom,
  destinationTop,
  amount,
  paymentMethod,
  id,
}) => {
  return (
    <div className="bg-[#F5F5F5] rounded-lg w-full p-2">
      <p className="text-[#9A9A9A] text-xs">#{id}</p>

      <div className="border-t border-t-[#E6E6E6] border-b border-b-[#E6E6E6] py-2 my-2">
        <div className="flex items-center gap-3 mb-10">
          <div>
            <OriginAltIcon />
          </div>
          <div>
            <p className="text-sm font-semibold">{originTop}</p>
            <p className="text-xs text-[#9A9A9A]">{originBottom}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <DestinationAltIcon />
          </div>
          <div>
            <p className="text-sm font-semibold">{destinationTop}</p>
            <p className="text-xs text-[#9A9A9A]">{destinationBottom}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-[#9A9A9A]">{date}</p>
        <p className="text-sm font-semibold">₦{amount}</p>
      </div>

      <div className="flex gap-2">
        <WalletIcon /> <p className="text-xs text-[#9A9A9A]">{paymentMethod}</p>
      </div>
    </div>
  );
};

export default TripHistoryItem;
