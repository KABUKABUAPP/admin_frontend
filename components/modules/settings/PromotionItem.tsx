import React, { FC } from "react";

interface Props {
  handleClick?: () => void;
}

const PromotionItem: FC<Props> = ({ handleClick }) => {
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
        <p className="text-2xl font-semibold">KAB25DEC</p>
        <p className="text-base font-medium">1200</p>
        <p className="text-sm font-medium">Active</p>
        <p className="text-sm break-words text-[#9A9A9A]">
          Created Dec 11, 2023 | Expires Jan 1, 2024
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <p className="text-2xl font-semibold text-right">209</p>
        <p className="text-sm font-medium text-right">Total Subscribers</p>
      </div>
    </div>
  );
};

export default PromotionItem;
