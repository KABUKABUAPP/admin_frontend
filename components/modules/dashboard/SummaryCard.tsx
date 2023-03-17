import React, { FC, ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBg?: string;
}

const SummaryCard: FC<Props> = ({ title, value, icon, iconBg = "#FFBF00" }) => {
  return (
    <div className="bg-[#FDFDFD] w-full max-w-[210px] flex gap-5 p-4 rounded-lg items-center">
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-lg`}
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
      <div>
        <p className="font-bold">{value}</p>
        <p className="text-xs">{title}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
