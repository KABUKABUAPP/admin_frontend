import React, { FC } from "react";

interface Props {
  title: string;
  body: string;
}

const ActiveTripsTableCell: FC<Props> = ({ title, body }) => {
  return (
    <div className="flex-1 overflow-hidden h-10">
      <p className="text-xs text-[#9A9A9A] mb-3 h-2">{title}</p>
      <div className="overflow-y-auto scrollbar-none">
        <p className="text-xs font-bold w-full break-words h-8">
          {body}
        </p>
      </div>
    </div>
  );
};

export default ActiveTripsTableCell;
