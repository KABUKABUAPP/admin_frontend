import { capitalizeAllFirstLetters } from "@/utils";
import React, { FC, useEffect } from "react";

interface Props {
  handleClick?: () => void;
  data: {
    amount_type?: string;
    promoCode?: string;
    amount?: number;
    promo_type?: boolean;
    createdAt?: string;
    expiry_date?: string;
    totalSubscribers: number;
    promotionType?: string;
    id?: string;
    name?: string;
  };
}

const PromotionItem: FC<Props> = ({ handleClick, data }) => {
  return (
    <>
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
          <p className="text-2xl font-semibold">{capitalizeAllFirstLetters(data.name)}</p>
        )}
        {/*data.promoCode && (
          <p className="text-2xl font-semibold">{data.promoCode}</p>
        )*/}
        {data.amount && <p className="text-base font-medium">{data.amount_type === 'fixed' && '₦'}{data.amount}{data.amount_type === 'percentage' && '%'}</p>}
        {data.promo_type && <p className="text-sm font-medium">{data.promo_type}</p>}
        {data.expiry_date && data.createdAt && (
          <p className="text-sm break-words text-[#9A9A9A]">
            Created {new Date(data.createdAt).toLocaleDateString()} | Expires{" "}
            {new Date(data.expiry_date).toLocaleDateString()}
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
      </>
  );
};

export default PromotionItem;
