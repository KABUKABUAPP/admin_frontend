import React, { FC } from "react";

import Card from "@/components/common/Card";
import Skeleton from "react-loading-skeleton";
import Avatar from "@/components/common/Avatar";
import Image from "next/image";
import RatingIcon from "@/components/icons/RatingIcon";

interface Props {
  fullname?: string;
  address?: string;
  email?: string;
  phone?: string;
  tripCount?: string | number;
  rating?: number;
  image?: string;
  isLoading?: boolean;
  totalCarsProcessed?: number
}

const UserInfoCard: FC<Props> = ({
  fullname,
  address,
  email,
  phone,
  tripCount,
  rating,
  image,
  isLoading,
  totalCarsProcessed
}) => {
  return (
    <Card>
      <div className="flex gap-4">
        <div>
          <div className="w-[80px] h-[80px]">
            {fullname ? (
              <Avatar imageUrl={image} fallBack={fullname[0]} size="lg" />
            ) : (
              <Skeleton
                enableAnimation={isLoading}
                className="w-[80px] h-[80px] pt-2"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {fullname && <p className="text-3xl font-semibold">{fullname}</p>}
          {address && <p className="text-lg font-semibold">{address}</p>}
          {email && <p className="text-sm font-semibold">{email}</p>}
          {phone && <p className="text-sm font-semibold">{phone}</p>}
          {tripCount && (
            <p className="text-sm font-semibold">
              {(tripCount && `${tripCount} trips`) || (
                <Skeleton enableAnimation={isLoading} />
              )}
            </p>
          )}
          {rating && (
            <p className="text-sm font-semibold">
              {rating && (
                <span className="flex items-center gap-1">
                  <RatingIcon /> {rating}
                </span>
              )}
            </p>
          )}
          {totalCarsProcessed && <p className="text-lg font-semibold">{totalCarsProcessed} Car(s) processed</p>}
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
