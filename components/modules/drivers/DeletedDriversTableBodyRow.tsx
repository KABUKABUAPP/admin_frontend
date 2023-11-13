import React, { FC } from "react";
import { DriversTableBodyData } from "@/models/Drivers";
import Avatar from "@/components/common/Avatar";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";

interface Props {
  data: DriversTableBodyData;
  subPath: string;
  currentPage?: number;
}

const DeletedDriversTableBodyRow: FC<Props> = ({
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
    deletionReason,
    dateDeleted
  },
  subPath,
  currentPage
}) => {
  const router = useRouter();

  return (
    <div
      className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
      onClick={() => router.push(`/drivers/${subPath}/${userId}?deletion_reason=${deletionReason}&current_page=${currentPage}`)}
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
        <p className="text-xs font-bold">{fullName || <Skeleton />}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{location || <Skeleton />}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{totalTrips ?? <Skeleton />}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{deletionReason || <Skeleton />}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{driverType || <Skeleton />}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">
          {dateDeleted || <Skeleton />}
        </p>
      </div>
    </div>
  );
};

export default DeletedDriversTableBodyRow;
