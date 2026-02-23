import React, { FC } from "react";
import OriginCell from "../../common/OriginCell";
import DestinationCell from "../../common/DestinationCell";
import Link from "next/link";
import { useRouter } from "next/router";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  data: {
    id: string;
    origin: string;
    destination: string;
    rider: string;
    driver: string;
    carModel: string;
    plateNumber: string;
    status: string;
  };
  index: number;
  currentPage: number;
}

const TripsTableRow: FC<Props> = ({
  data: {
    id,
    origin,
    destination,
    rider,
    driver,
    carModel,
    plateNumber,
    status,
  },
  index,
  currentPage
}) => {
  const router = useRouter()
  const { tab } = router.query
  const tabUrl = tab ? `tab=${tab}` : '';
  const isActiveTrip = tab === "active" || status?.toLowerCase() === "started" || status?.toLowerCase() === "active";
  const statusBadgeClassName = isActiveTrip
    ? "text-xs font-bold bg-[#EAF0FF] text-[#2B3DDE] rounded-full px-2 py-1 text-center"
    : "text-xs font-bold bg-[#F7F7F7] rounded-full px-2 py-1 text-center";

  return (
    <div onClick={()=>router.push(`/trips/${id}?${tabUrl}&current_page=${currentPage}`)} className="flex p-3 gap-6 border-b border-b[#E6E6E6] cursor-pointer" key={index}>
      <div style={{ flex: 1 }} className="flex items-center">
        <Link href={`/trips/${id}`}>
          <p className="text-xs font-bold cursor-pointer">{id.substring(0, 6)}</p>
        </Link>
      </div>

      <div className="flex items-center" style={{ flex: 3 }}>
        <OriginCell origin={origin} />
      </div>

      <div className="flex items-center" style={{ flex: 3 }}>
        <DestinationCell destination={destination} />
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(rider)}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(driver)}</p>
      </div>

      <div style={{ flex: 2 }} className="flex flex-col gap-3 justify-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(carModel)}</p>
        <p className="text-xs text-[#667085]">{plateNumber}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className={statusBadgeClassName}>{capitalizeAllFirstLetters(status)}</p>
      </div>
    </div>
  );
};

export default TripsTableRow;
