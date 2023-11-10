import React, { FC } from "react";
import { DriversTableBodyData } from "@/models/Drivers";
import Avatar from "@/components/common/Avatar";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  data: DriversTableBodyData;
  subPath: string;
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
    userId,
    statusRemark,
    inspectionCode
  },
  subPath,
}) => {
  const router = useRouter();
  const isStatusRemark = router.pathname.includes("drivers/pending");

  return (
    <div
      className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
      onClick={() => router.push(`/drivers/${subPath}/${userId}?inspection_code=${inspectionCode}`)}
    >
      <div style={{ flex: 2 }} className="flex items-center">
        <Link href={`/drivers/${driverId}`}>
          <p className="text-xs font-bold cursor-pointer">
            {driverId || <Skeleton />}
          </p>
        </Link>
      </div>
      <div style={{ flex: 2 }} className="flex items-center gap-2">
        <div>
          {fullName ? (
            <Avatar
              fallBack={fullName[0]}
              imageUrl={imageUrl}
              size="sm"
              allowEnlarge={false}
            />
          ) : (
            <Skeleton />
          )}
        </div>
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(fullName) || <Skeleton />}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(location) || <Skeleton />}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{totalTrips ?? <Skeleton />}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{walletBalance || <Skeleton />}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{driverType || <Skeleton />}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">
          {isStatusRemark ? statusRemark : status || <Skeleton />}
        </p>
      </div>
    </div>
  );
};

export default DriversTableBodyRow;
