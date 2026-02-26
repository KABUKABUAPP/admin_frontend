import React, { FC } from "react";
import DestinationCell from "../../common/DestinationCell";
import OriginCell from "../../common/OriginCell";
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
    reason: string;
  };
  index: number;
  currentPage: number;
}

const ScheduledTripsTableRow: FC<Props> = ({
  data: {
    id,
    origin,
    destination,
    rider,
    driver,
    carModel,
    plateNumber,
    status,
    reason,
  },
  index,
  currentPage
}) => {
  const router = useRouter();
  const { tab } = useRouter().query

  return (
    <div
      onClick={() => router.push(`/trips/${id}?tab=${tab}&reason=${reason}&current_page=${currentPage}`)}
      className="flex p-3 gap-6 border-b border-b[#E6E6E6] cursor-pointer text-center"
      key={index}
    >
      <div style={{ flex: 1 }} className="flex items-center justify-center break-all">
        <Link href={`/trips/${id}`}>
          <p className="text-xs font-bold">{id.substring(0, 6)}</p>
        </Link>
      </div>

      <div className="flex items-center justify-center" style={{ flex: 3 }}>
        <OriginCell origin={origin} />
      </div>

      <div className="flex items-center justify-center" style={{ flex: 3 }}>
        <DestinationCell destination={destination} />
      </div>

      <div style={{ flex: 1 }} className="flex items-center justify-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(rider)}</p>
      </div>

      <div style={{ flex: 1 }} className="flex flex-col gap-3 justify-center items-center text-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(carModel)}</p>
        <p className="text-xs text-[#667085]">{plateNumber}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center justify-center">
        <p className="text-xs font-bold bg-[#FEE2E9] text-[#B2183E] px-2 py-1 rounded-full text-center">{reason}</p>
      </div>
    </div>
  );
};

export default ScheduledTripsTableRow;
