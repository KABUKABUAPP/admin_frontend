import React, { FC, ReactNode } from "react";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  value?: string | number;
  icon?: ReactNode;
  iconBg?: string;
  loading?: boolean
}

const SummaryCard: FC<Props> = ({ title, value, icon, iconBg = "#FFBF00", loading=false }) => {
  const router = useRouter();

  return (
    <div className="bg-[#FDFDFD] w-full flex gap-5 p-4 rounded-lg items-center cursor-pointer" onClick={() => {
      if (title === 'SOS') router.push('/sos');
      if (title === 'Total Earnings') router.push('/transactions');
      if (title === 'Total Riders') router.push('/riders');
    }}>
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-lg`}
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
      <div>
        <p className="font-bold">{loading ? <Skeleton /> : value?.toLocaleString()}</p>
        <p className="text-xs">{title}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
