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
  currentPage?: number
  onboardStatus?: string;
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
    inspectionCode,
    onlineStatus,
    onboardStep,
    phoneNumber,
    email
  },
  subPath,
  currentPage,
  onboardStatus
}) => {
  const router = useRouter();
  const isStatusRemark = router.pathname.includes("drivers/pending");

  return (
    <div
      className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6]">
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
      {
        !isStatusRemark &&
        <div style={{ flex: 1 }} className="flex items-center">
          <p className="text-xs font-bold">{totalTrips ?? <Skeleton />}</p>
        </div>
      }
      <div style={{ flex: 2 }} className="flex items-center">
        <p className="text-xs font-bold">{phoneNumber ?? <Skeleton />}</p>
      </div>
      <div style={{ flex: 2 }} className="flex items-center">
        <p className="text-xs font-bold">{email ?? <Skeleton />}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{driverType || <Skeleton />}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">
          {isStatusRemark ? statusRemark : status || <Skeleton />}
        </p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">
          {onlineStatus ? onlineStatus : <Skeleton />}
        </p>
      </div>
      {
        isStatusRemark &&
        <div style={{ flex: 1 }} className="flex items-center">
          <p className="text-xs font-bold">
            {onboardStep ? onboardStep : <Skeleton />}
          </p>
        </div>
      }
    </div>
  );
};

export default DriversTableBodyRow;
