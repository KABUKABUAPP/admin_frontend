import React, { FC } from "react";
import OriginDestinationCell from "@/components/common/OriginDestinationCell";
import Link from "next/link";
import { useRouter } from "next/router";

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
    raisedBy: string;
    reason: string;
  };
  index: number;
  currentPage?: number;
}

const SosTableRow: FC<Props> = ({
  data: {
    id,
    origin,
    destination,
    rider,
    driver,
    carModel,
    plateNumber,
    status,
    raisedBy,
    reason,
  },
  index,
  currentPage
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/trips/${id}?current_page=${currentPage}`)}
      className="flex p-3 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
      key={index}
    >
      <div style={{ flex: 2 }} className="flex items-center cursor-pointer">
        <Link href={`/trips/${id}`}>
          <p className="text-xs font-bold">{id}</p>
        </Link>
      </div>

      <div style={{ flex: 2 }}>
        <OriginDestinationCell destination={destination} origin={origin} />
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{rider}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{driver}</p>
      </div>

      <div style={{ flex: 1 }} className="flex flex-col gap-3 justify-center">
        <p className="text-xs font-bold">{carModel}</p>
        <p className="text-xs font-bold">{plateNumber}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{status}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{raisedBy}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{reason}</p>
      </div>
    </div>
  );
};

export default SosTableRow;
