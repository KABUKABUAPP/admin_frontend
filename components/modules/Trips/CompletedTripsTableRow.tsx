import React, { FC } from "react";
import OriginDestinationCell from "../../common/OriginDestinationCell";
import Rating from "react-star-ratings";
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
    price: string;
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
    price,
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
      <div style={{ flex: 2 }} className="flex items-center cursor-pointer">
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
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(driver)}</p>
      </div>

      <div style={{ flex: 1 }} className="flex flex-col gap-3 justify-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(carModel)}</p>
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
