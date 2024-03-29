import React, { FC, useEffect } from "react";

interface Props {
  handleClick?: () => void;
  data: {
    amount_type?: string;
    promoCode?: string;
    amount?: number;
    status?: boolean;
    createdDate?: string;
    expiryDate?: string;
    totalSubscribers: number;
    promotionType?: string;
    id?: string;
    name?: string;
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
        {data.name && (
          <p className="text-2xl font-semibold">{data.name}</p>
        )}
        {data.promoCode && (
          <p className="text-2xl font-semibold">{data.promoCode}</p>
        )}
        {data.amount && <p className="text-base font-medium">{data.amount_type === 'fixed' && '₦'}{data.amount}{data.amount_type === 'percentage' && '%'}</p>}
        {data.status && <p className="text-sm font-medium">{data.status}</p>}
        {data.expiryDate && data.createdDate && (
          <p className="text-sm break-words text-[#9A9A9A]">
            Created {new Date(data.createdDate).toLocaleDateString()} | Expires{" "}
            {new Date(data.expiryDate).toLocaleDateString()}
          </p>
        )}
        {data.promotionType && (
          <p className="text-sm break-words text-[#9A9A9A]">
            {data.promotionType} promotion
          </p>
        )}
      </div>
      <div style={{ flex: 1 }}>
        {
          <p className="text-2xl font-semibold text-right">
            {data.totalSubscribers}
          </p>
        }
        <p className="text-sm font-medium text-right">Total Subscribers</p>
      </div>
    </div>
  );
};

export default PromotionItem;
