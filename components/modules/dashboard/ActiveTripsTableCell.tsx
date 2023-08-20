import { capitalizeAllFirstLetters } from "@/utils";
import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

interface Props {
  title?: string;
  body?: string;
}

const ActiveTripsTableCell: FC<Props> = ({ title, body }) => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-none h-14">
      <p className="text-xs text-[#9A9A9A] mb-3 h-2">{capitalizeAllFirstLetters(title) || <Skeleton />}</p>
      <div className="overflow-y-auto">
        <p className="text-xs font-bold w-full break-words h-8">
          {capitalizeAllFirstLetters(body) || <Skeleton />}
        </p>
      </div>
    </div>
  );
};

export default ActiveTripsTableCell;
