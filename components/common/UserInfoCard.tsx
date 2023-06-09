import React, { FC } from "react";
import { useRouter } from "next/router";

import Card from "@/components/common/Card";
import Skeleton from "react-loading-skeleton";
import Avatar from "@/components/common/Avatar";
import Rating from "react-star-ratings";

interface Props {
  fullname?: string;
  address?: string;
  email?: string;
  phone?: string;
  tripCount?: string | number;
  rating?: number;
  image?: string;
  isLoading?: boolean;
  totalCarsProcessed?: number;
  role?: string;
  bg?: string;
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
  totalCarsProcessed,
  role,
  bg = "#FFFFFF",
}) => {
  const router = useRouter();
  const showCarsProcessed = router.pathname.includes("inspector");
  return (
    <Card bg={bg}>
      <div className="flex gap-4">
        <div>
          <div className="w-[80px] h-[80px]">
            {image ? (
              <Avatar
                imageUrl={image}
                fallBack={`${fullname && fullname[0]}`}
                size="lg"
              />
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
          {role && <p className="text-lg font-semibold">{role}</p>}
          {address && <p className="text-lg font-semibold">{address}</p>}
          {email && <p className="text-base font-semibold">{email}</p>}
          {phone && <p className="text-base font-semibold">{phone}</p>}
          {tripCount === 0 ? (
            <p className="text-sm font-semibold">0 trips</p>
          ) : (
            <p className="text-sm font-semibold">
              {(tripCount && `${tripCount} trips`) || (
                <Skeleton enableAnimation={isLoading} />
              )}
            </p>
          )}

          <p className="text-sm font-semibold">
            {rating && (
              <span className="flex items-center gap-1">
                <Rating
                  rating={rating}
                  starDimension="11px"
                  starSpacing="1px"
                  starRatedColor="#FFBF00"
                  numberOfStars={5}
                />
              </span>
            )}
          </p>

          {showCarsProcessed && (
            <p className="text-lg font-semibold">
              {totalCarsProcessed} Car(s) processed
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
