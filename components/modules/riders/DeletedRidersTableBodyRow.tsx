import React, { FC } from "react";
import { RidersTableBodyData } from "@/models/Riders";
import { useRouter } from "next/router";
import Avatar from "@/components/common/Avatar";

interface Props {
  data: RidersTableBodyData;
}

const DeletedRidersTableBodyRow: FC<Props> = ({
  data: {
    riderId,
    fullName,
    location,
    totalTrips,
    status,
    imageUrl,
    deletedReason,
    dateDeleted
  },
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/riders/${riderId}`)}
      className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
    >
      <div style={{ flex: 1 }} className="flex items-center break-all">
        <p className="text-xs font-bold cursor-pointer">{riderId}</p>
      </div>
      <div style={{ flex: 2 }} className="flex items-center gap-2">
        <div>
          <Avatar
            fallBack={fullName[0]}
            imageUrl={imageUrl}
            size="sm"
            allowEnlarge={false}
          />
        </div>
        <p className="text-xs font-bold">{fullName}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{location}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{totalTrips}</p>
      </div>
      <div style={{ flex: 2 }} className="flex items-center">
        <p className="text-xs font-bold">
          {deletedReason}
        </p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{dateDeleted}</p>
      </div>
    </div>
  );
};

export default DeletedRidersTableBodyRow;
