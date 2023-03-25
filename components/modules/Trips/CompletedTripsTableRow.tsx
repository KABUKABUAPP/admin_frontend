import React, { FC } from "react";
import OriginDestinationCell from "./OriginDestinationCell";
import Rating from "react-star-ratings";
import Link from "next/link";

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
    price: string;
    rating: number;
  };
  index: number;
}

const CompletedTripsTableRow: FC<Props> = ({
  data: {
    id,
    origin,
    destination,
    rider,
    driver,
    carModel,
    plateNumber,
    status,
    price,
    rating,
  },
  index,
}) => {
  return (
    <div className="flex p-3 gap-6 border-b border-b[#E6E6E6]" key={index}>
      <div style={{ flex: 1 }} className="flex items-center">
        <Link href={`/trips/${id}/completed`}>
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
        <p className="text-xs font-bold">
          {price && "₦"}
          {price}
        </p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <Rating
          rating={rating}
          starDimension="11px"
          starSpacing="1px"
          starRatedColor="#FFBF00"
        />
      </div>
    </div>
  );
};

export default CompletedTripsTableRow;
