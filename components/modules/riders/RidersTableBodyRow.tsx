import React, { FC } from "react";
import Avatar from "@/components/common/Avatar";
import { RidersTableBodyData } from "@/models/Riders";

interface Props {
  data: RidersTableBodyData;
}

const RidersTableBodyRow: FC<Props> = ({
  data: {
    riderId,
    fullName,
    location,
    totalTrips,
    walletBalance,
    status,
    imageUrl,
  },
}) => {
  return (
    <div className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6]">
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold cursor-pointer">{riderId}</p>
      </div>
      <div style={{ flex: 2 }} className="flex items-center gap-2">
        <div>
          <Avatar fallBack={fullName[0]} imageUrl={imageUrl} size="sm" />
        </div>
        <p className="text-xs font-bold">{fullName}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{location}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{totalTrips}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">N{walletBalance.toLocaleString()}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{status}</p>
      </div>
    </div>
  );
};

export default RidersTableBodyRow;
