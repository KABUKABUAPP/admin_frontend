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
    rating: number;
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
    rating,
  },
  index,
  currentPage
}) => {
  const router = useRouter();
  const { tab } = router.query

  return (
    <div
      onClick={() => router.push(`/trips/${id}?tab=${tab ? tab : ''}&current_page=${currentPage}`)}
      className="flex p-3 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
      key={index}
    >
      <div style={{ flex: 1 }} className="flex items-center cursor-pointer">
        <Link href={`/trips/${id}`}>
          <p className="text-xs font-bold">{id.substring(0, 6)}</p>
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

      <div style={{ flex: 1 }} className="flex flex-col gap-3 justify-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(carModel)}</p>
        <p className="text-xs text-[#667085]">{plateNumber}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold bg-[#E3FFE2] text-[#1A8B18] px-2 py-1 rounded-full text-center">
          {capitalizeAllFirstLetters(status)} <br />
          at {endTime}
        </p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        {rating === 0 ? (
          <p className="text-xs font-bold">0</p>
        ) : (
          <Rating
            rating={rating}
            starDimension="11px"
            starSpacing="1px"
            starRatedColor="#FFBF00"
            numberOfStars={5}
          />
        )}
      </div>
    </div>
  );
};

export default CompletedTripsTableRow;
