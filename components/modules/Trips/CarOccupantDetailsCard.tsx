import React, { FC } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Button from "@/components/ui/Button/Button";
import Rating from "react-star-ratings";

interface Props {
  isRider: boolean;
  name: string;
  imageUri: string;
  rating: number;
  location: string;
  tripCount: number;
  buttonTitle: string;
  viewProfileLink: string;
  carModel?: string;
  carPlateNumber?: string;
}

const CarOccupantDetailsCard: FC<Props> = ({
  isRider,
  name,
  imageUri,
  rating,
  location,
  tripCount,
  buttonTitle,
  carModel,
  carPlateNumber,
  viewProfileLink,
}) => {
  const router = useRouter();

  return (
    <div>
      <p>{isRider ? "Rider's Details" : "Driver's Details"}</p>
      <div>
        <div>image</div>
        <div>
          <p>{name}</p>
          <p>{location}</p>
          <p>
            {tripCount} {tripCount === 1 ? "trip" : "trips"}
          </p>
          <div>
            <Rating
              starDimension="11px"
              starSpacing="1px"
              starRatedColor="#FFBF00"
              rating={1}
            />{" "}
            {rating}
          </div>

          <div>
            <p>{carModel}</p>
            <p>{carPlateNumber}</p>
          </div>
        </div>
      </div>
      <div>
        <Button
          title={buttonTitle}
          onClick={() => router.push(viewProfileLink)}
        />
      </div>
    </div>
  );
};

export default CarOccupantDetailsCard;
