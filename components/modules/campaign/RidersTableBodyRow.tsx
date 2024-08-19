import React, { FC } from "react";
import Avatar from "@/components/common/Avatar";
import { RidersTableBodyData } from "@/models/Riders";
import Link from "next/link";
import { useRouter } from "next/router";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  data: RidersTableBodyData;
  currentPage: number;
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
    phoneNumber,
    email
  },
  currentPage
}) => {
  const router = useRouter();

  return (
    <div className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6]">
      <div style={{ flex: 2 }} className="flex items-center gap-2">
        <div>
          <Avatar fallBack={fullName[0]} imageUrl={imageUrl} size="sm" allowEnlarge={false}/>
        </div>
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(fullName)}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(location)}</p>
      </div>
      {/*<div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{totalTrips}</p>
      </div>*/}
      <div style={{ flex: 2 }} className="flex items-center">
        <p className="text-xs font-bold">{phoneNumber}</p>
      </div>
      <div style={{ flex: 2 }} className="flex items-center">
        <p className="text-xs font-bold">{email}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{status}</p>
      </div>
    </div>
  );
};

export default RidersTableBodyRow;
