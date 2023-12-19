import { capitalizeAllFirstLetters } from "@/utils";
import React, { FC, useEffect } from "react";

interface Props {
  handleClick?: () => void;
  data: {
    value: number;
    condition_value: number;
    active_status: boolean;
    createdAt: string;
    expiry_date: string;
    user_count: number;
    audience: string;
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
        {data.value && (
          <p className="text-2xl font-semibold">{'₦'}{data.value}</p>
        )}
        {/*data.promoCode && (
          <p className="text-2xl font-semibold">{data.promoCode}</p>
        )*/}
        {data.condition_value && <p className="text-base font-medium">If ride equals {data.condition_value}</p>}
        {data.active_status && <p className="text-sm font-medium">{'Active'}</p>}
        {!data.active_status && <p className="text-sm font-medium">{'Closed'}</p>}
        {data.expiry_date && data.createdAt && (
          <p className="text-sm break-words text-[#9A9A9A]">
            Created {new Date(data.createdAt).toLocaleDateString()} | Expires{" "}
            {new Date(data.expiry_date).toLocaleDateString()}
          </p>
        )}
        <p className="text-sm break-words text-[#9A9A9A]">Automatic Promotion</p>
      </div>
      <div style={{ flex: 1 }}>
        {
          <p className="text-2xl font-semibold text-right">
            {data.user_count}
          </p>
        }
        <p className="text-sm font-medium text-right">Total Subscribers</p>
        <p className="text-sm font-medium text-right">Audience: {data.audience}</p>
      </div>
      </div>
      </>
  );
};

export default PromotionItem;
