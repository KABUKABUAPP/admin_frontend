import React, { FC } from "react";

import Link from "next/link";
import { HubsTableBodyData } from "@/models/Hubs";
import { useRouter } from "next/router";

interface Props {
  data: HubsTableBodyData;
}

const HubsTableBodyRow: FC<Props> = ({
  data: {
    hubId,
    hubName,
    stateCountry,
    inspector,
    totalCarsProcessed,
    dateCreated,
  },
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/hubs/${hubId}`)}
      className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
    >
      <div style={{ flex: 1 }} className="flex items-center break-all">
        <Link href={`/hubs/${hubId}`}>
          <p className="text-xs font-bold cursor-pointer">{hubId}</p>
        </Link>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{hubName}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{stateCountry}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{inspector}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{totalCarsProcessed}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{dateCreated}</p>
      </div>
    </div>
  );
};

export default HubsTableBodyRow;
