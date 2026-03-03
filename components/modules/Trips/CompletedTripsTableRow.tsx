import React, { FC } from "react";
import DestinationCell from "../../common/DestinationCell";
import Rating from "react-star-ratings";
import Link from "next/link";
import { useRouter } from "next/router";
import { capitalizeAllFirstLetters } from "@/utils";
import OriginCell from "../../common/OriginCell";

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
    endTime: string;
    driverRating: number;
    riderRating: number;
  };
  index: number;
  currentPage: number;
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
    endTime,
    driverRating,
    riderRating,
  },
  index,
  currentPage
}) => {
  const router = useRouter();
  const { tab } = router.query
  const parsedDriverRating = Number(driverRating);
  const normalizedDriverRating = Number.isFinite(parsedDriverRating)
    ? Math.max(0, Math.min(5, parsedDriverRating))
    : 0;
  const parsedRiderRating = Number(riderRating);
  const normalizedRiderRating = Number.isFinite(parsedRiderRating)
    ? Math.max(0, Math.min(5, parsedRiderRating))
    : 0;

  return (
    <div
      onClick={() => router.push(`/trips/${id}?tab=${tab ? tab : ''}&current_page=${currentPage}`)}
      className="flex p-3 gap-6 border-b border-b[#E6E6E6] cursor-pointer text-center"
      key={index}
    >
      <div style={{ flex: 1 }} className="flex items-center justify-center cursor-pointer">
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

      <div style={{ flex: 1 }} className="flex items-center justify-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(driver)}</p>
      </div>

      <div style={{ flex: 1 }} className="flex flex-col gap-3 justify-center items-center text-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(carModel)}</p>
        <p className="text-xs text-[#667085]">{plateNumber}</p>
      </div>

      <div style={{ flex: 1.35 }} className="flex items-center justify-center">
        <p className="text-xs font-bold bg-[#E3FFE2] text-[#1A8B18] px-3 py-1 rounded-md text-center w-full">
          {capitalizeAllFirstLetters(status)} <br />
          at {endTime}
        </p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center justify-center">
        <Rating
          rating={normalizedDriverRating}
          starDimension="11px"
          starSpacing="1px"
          starRatedColor="#FFBF00"
          starEmptyColor="#D9D9D9"
          numberOfStars={5}
        />
      </div>

      <div style={{ flex: 1 }} className="flex items-center justify-center">
        <Rating
          rating={normalizedRiderRating}
          starDimension="11px"
          starSpacing="1px"
          starRatedColor="#FFBF00"
          starEmptyColor="#D9D9D9"
          numberOfStars={5}
        />
      </div>
    </div>
  );
};

export default CompletedTripsTableRow;
