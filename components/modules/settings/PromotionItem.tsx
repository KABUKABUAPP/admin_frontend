import React, { FC } from "react";

interface Props {
  handleClick?: () => void;
  data: {
    promoCode: string;
    amount: number;
    status: boolean;
    createdDate: string;
    expiryDate: string;
    totalSubscribers: number;
    id: string;
  };
}

const PromotionItem: FC<Props> = ({ handleClick, data }) => {
  return (
    <div
      onClick={() => {
        if (handleClick) handleClick();
      }}
      className="p-4 flex items-center bg-[#E3FFE2] rounded-lg cursor-pointer"
    >
      <div
        style={{ flex: 1 }}
        className="border-r border-r-[#1FD11B] flex flex-col gap-1"
      >
        <p className="text-2xl font-semibold">{data.promoCode}</p>
        <p className="text-base font-medium">₦{data.amount}</p>
        <p className="text-sm font-medium">{data.status}</p>
        <p className="text-sm break-words text-[#9A9A9A]">
          Created {new Date(data.createdDate).toLocaleDateString()} | Expires{" "}
          {new Date(data.expiryDate).toLocaleDateString()}
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <p className="text-2xl font-semibold text-right">
          {data.totalSubscribers}
        </p>
        <p className="text-sm font-medium text-right">Total Subscribers</p>
      </div>
    </div>
  );
};

export default PromotionItem;
