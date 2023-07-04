import React, { FC } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Button from "@/components/ui/Button/Button";
import RatingIcon from "@/components/icons/RatingIcon";
import Skeleton from "react-loading-skeleton";
import Avatar from "@/components/common/Avatar";
import useUserPermissions from "@/hooks/useUserPermissions";

interface Props {
  isRider?: boolean;
  name?: string;
  imageUri?: string;
  rating?: number;
  location?: string;
  tripCount?: number;
  buttonTitle: string;
  viewProfileLink?: string;
  carModel?: string;
  carPlateNumber?: string;
  isLoading: boolean;
  permissionKey: "riders_permissions" | "drivers_permissions";
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
  isLoading,
  permissionKey,
}) => {
  const router = useRouter();
  const { userPermissions } = useUserPermissions();
  return (
    <div className="p-4 bg-[#FFFFFF] rounded-lg">
      <p className="font-bold mb-2">
        {isRider ? "Rider's Details" : "Driver's Details"}
      </p>
      <div className="flex gap-3">
        <div style={{ flex: 1 }}>
          <div className="relative overflow-hidden">
            <Avatar imageUrl={imageUri} fallBack="" />
          </div>
        </div>
        <div style={{ flex: 4 }}>
          <p className="text-xs mb-2 font-bold">
            {name || <Skeleton enableAnimation={isLoading} />}
          </p>
          <p className="text-xs mb-2">
            {location || <Skeleton enableAnimation={isLoading} />}
          </p>
          <p className="text-xs mb-2">
            {tripCount} {tripCount === 1 ? "trip" : "trips"}
          </p>
          <div className="text-xs mb-2 flex items-center gap-2">
            <RatingIcon /> {rating ?? <Skeleton enableAnimation={isLoading} />}
          </div>

          {!isRider && (
            <div>
              <p className="text-xs mb-2 border-t border-[#E6E6E6] w-fit pt-3">
                {carModel || <Skeleton enableAnimation={isLoading} />}
              </p>
              <p className="text-xs bg-[#FFF5D8] px-3 py-2 rounded-md w-fit">
                {carPlateNumber || <Skeleton enableAnimation={isLoading} />}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        {userPermissions &&
        (userPermissions[permissionKey].read ||
          userPermissions[permissionKey].write) &&
        viewProfileLink && (
          <Button
            title={buttonTitle}
            onClick={() => router.push(viewProfileLink)}
          />
        )}
      </div>
    </div>
  );
};

export default CarOccupantDetailsCard;
