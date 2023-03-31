import React, { FC } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Button from "@/components/ui/Button/Button";
import RatingIcon from "@/components/icons/RatingIcon";

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
    <div className="p-4 bg-[#FFFFFF] rounded-lg">
      <p className="font-bold mb-2">
        {isRider ? "Rider's Details" : "Driver's Details"}
      </p>
      <div className="flex ">
        <div style={{ flex: 1 }}>
          <div className="relative overflow-hidden w-10 h-10 rounded-full">
            <Image
              layout="fill"
              src={imageUri}
              style={{ objectFit: "contain" }}
              alt="user image"
            />
          </div>
        </div>
        <div style={{ flex: 4 }}>
          <p className="text-xs mb-2 font-bold">{name}</p>
          <p className="text-xs mb-2">{location}</p>
          <p className="text-xs mb-2">
            {tripCount} {tripCount === 1 ? "trip" : "trips"}
          </p>
          <div className="text-xs mb-2 flex items-center gap-2">
            <RatingIcon /> {rating}
          </div>

          {!isRider && (
            <div>
              <p className="text-xs mb-2 border-t border-[#E6E6E6] w-fit pt-3">
                {carModel}
              </p>
              <p className="text-xs bg-[#FFF5D8] px-3 py-2 rounded-md w-fit">
                {carPlateNumber}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Button
          title={buttonTitle}
          onClick={() => router.push(viewProfileLink)}
        />
      </div>
    </div>
  );
};

export default CarOccupantDetailsCard;
