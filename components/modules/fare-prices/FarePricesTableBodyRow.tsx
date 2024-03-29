import React, { FC } from "react";

import { FarePricesTableData } from "@/models/FarePrices";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  data: FarePricesTableData;
  currentTab: string;
}

const FarePricesTableBodyRow: FC<Props> = ({
  data: { profileId, city, stateCountry, totalFares, dateCreated },
  currentTab
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/fare-prices/${profileId}?current_tab=${currentTab}`)}
      className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
    >
      <div style={{ flex: 1 }} className="flex items-center">
        <Link href={`/fare-prices/${profileId}`}>
          <p className="text-xs font-bold cursor-pointer">{profileId}</p>
        </Link>
      </div>

      {/* <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{city}</p>
      </div> */}

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{stateCountry}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{totalFares}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{new Date(dateCreated).toDateString()}</p>
      </div>
    </div>
  );
};

export default FarePricesTableBodyRow;
