import React, { FC } from "react";

import { InspectorsTableBodyData } from "@/models/Inspectors";
import Link from "next/link";
import Avatar from "@/components/common/Avatar";
import { useRouter } from "next/router";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  data: InspectorsTableBodyData;
}

const InspectorsTableBodyRow: FC<Props> = ({
  data: {
    inspectorId,
    fullName,
    imageUrl,
    location,
    hub,
    totalCarsProcessed,
  },
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/inspectors/${inspectorId}`)}
      className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
    >
      <div style={{ flex: 1 }} className="flex items-center">
        <Link href={`/inspectors/${inspectorId}`}>
          <p className="text-xs font-bold cursor-pointer break-all">{inspectorId}</p>
        </Link>
      </div>
      <div style={{ flex: 2 }} className="flex items-center gap-2">
        <div>
          <Avatar fallBack={fullName[0]} imageUrl={imageUrl} size="sm" allowEnlarge={false}/>
        </div>
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(fullName)}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(location)}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(hub)}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{totalCarsProcessed}</p>
      </div>
    </div>
  );
};

export default InspectorsTableBodyRow;
