import React, { FC } from "react";

interface Props {
  title: string;
  date: string;
}

const ActivityLogItem: FC<Props> = ({ title, date }) => {
  return (
    <div className="flex justify-between max-sm:flex-col-reverse items-center max-sm:items-start gap-2 py-3 border-b border-b-[#9A9A9A]">
      <p className="text-base font-semibold">{title}</p>
      <p className="text-sm text-[#9A9A9A]">{date}</p>
    </div>
  );
};

export default ActivityLogItem;
