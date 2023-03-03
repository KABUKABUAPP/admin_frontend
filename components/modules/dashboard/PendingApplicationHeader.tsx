import React, { FC } from "react";

interface Props {
  title: string;
}

const PendingApplicationHeader: FC<Props> = ({ title }) => {
  return (
    <div className="p-3 w-full rounded-tr-lg rounded-tl-lg bg-[#FFF5D8]">
      <p className="text-xs font-bold">{title}</p>
    </div>
  );
};

export default PendingApplicationHeader;
