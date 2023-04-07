import React, { FC } from "react";
import { DriversTableBodyData } from "@/models/Drivers";
import Avatar from "@/components/common/Avatar";
import Link from "next/link";

interface Props {
  data: DriversTableBodyData;
}

const DriversTableBodyRow: FC<Props> = ({
  data: {
    driverId,
    fullName,
    imageUrl,
    location,
    driverType,
    status,
    totalTrips,
    walletBalance,
  },
}) => {
  return (
    <div className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6]">
      <div style={{ flex: 1 }} className="flex items-center">
        <Link href={`/drivers/${driverId}`}>
          <p className="text-xs font-bold cursor-pointer">{driverId}</p>
        </Link>
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
        <p className="text-xs font-bold">N{walletBalance}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{driverType}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{status}</p>
      </div>
    </div>
  );
};

export default DriversTableBodyRow;
