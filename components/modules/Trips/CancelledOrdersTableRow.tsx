import React, { FC } from "react";
import OriginDestinationCell from "../../common/OriginDestinationCell";
import Link from "next/link";
import { useRouter } from "next/router";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  data: {
    id: string;
    origin: string;
    destination: string;
    rider: string;
    status: string;
    reason: string;
  };
  index: number;
  currentPage: number;
}

const CancelledOrdersTableRow: FC<Props> = ({
  data: {
    id,
    origin,
    destination,
    rider,
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
      className="flex p-3 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
      key={index}
    >
      <div style={{ flex: 1 }} className="flex items-center break-all">
        <Link href={`/trips/${id}`}>
          <p className="text-xs font-bold">{id}</p>
        </Link>
      </div>

      <div style={{ flex: 2 }}>
        <OriginDestinationCell destination={destination} origin={origin} />
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(rider)}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(status)}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold ">{reason}</p>
      </div>
    </div>
  );
};

export default CancelledOrdersTableRow;
