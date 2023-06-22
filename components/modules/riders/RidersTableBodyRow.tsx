import React, { FC } from "react";
import Avatar from "@/components/common/Avatar";
import { RidersTableBodyData } from "@/models/Riders";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/riders/${riderId}`)}
      className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
    >
      <div style={{ flex: 1 }} className="flex items-center">
        <Link href={`/riders/${riderId}`}>
          <p className="text-xs font-bold cursor-pointer">{riderId}</p>
        </Link>
      </div>
      <div style={{ flex: 2 }} className="flex items-center gap-2">
        <div>
          <Avatar fallBack={fullName[0]} imageUrl={imageUrl} size="sm" allowEnlarge={false}/>
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
        <p className="text-xs font-bold">{walletBalance ? `${walletBalance.toLocaleString()}`: `N/A`}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{status}</p>
      </div>
    </div>
  );
};

export default RidersTableBodyRow;
