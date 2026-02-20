import React, { FC } from "react";
import { useRouter } from "next/router";

import Button from "@/components/ui/Button/Button";
import RatingIcon from "@/components/icons/RatingIcon";
import Skeleton from "react-loading-skeleton";
import Avatar from "@/components/common/Avatar";
import useUserPermissions from "@/hooks/useUserPermissions";
import { capitalizeAllFirstLetters } from "@/utils";

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

  const normalizeText = (value?: string | number) => {
    if (value === undefined || value === null) return "";
    const text = String(value).trim();
    if (!text) return "";
    if (/^(undefined|null)(\s+(undefined|null))*$/i.test(text)) return "";
    return text;
  };

  const occupantName = normalizeText(capitalizeAllFirstLetters(name));
  const occupantLocation = normalizeText(capitalizeAllFirstLetters(location));
  const normalizedCarModel = normalizeText(carModel);
  const normalizedPlateNumber = normalizeText(carPlateNumber);
  const tripCountValue =
    tripCount !== undefined && tripCount !== null
      ? `${tripCount} ${tripCount === 1 ? "trip" : "trips"}`
      : "";

  return (
    <div className="p-4 bg-[#FFFFFF] rounded-lg">
      <p className="font-bold mb-2">
        {isRider ? "Rider's Details" : "Driver's Details"}
      </p>
      <div className="flex gap-3">
        <div style={{ flex: 1 }}>
          <div className="relative overflow-hidden">
            {name && <Avatar imageUrl={imageUri} fallBack={name[0]} />}
          </div>
        </div>
        <div style={{ flex: 4 }}>
          <p className="text-xs mb-2 font-bold">
            {occupantName || (isLoading ? <Skeleton enableAnimation={isLoading} /> : "-")}
          </p>
          <div className="flex gap-2 mb-2">
            <p className="text-xs">
              {occupantLocation || (isLoading ? <Skeleton enableAnimation={isLoading} /> : "-")}
            </p>
            <p className="text-xs flex text-center items-center">
              <img src="/ellipse.png" alt="" className="text-xs flex text-center items-center" />
            </p>
            <p className="text-xs">
              {tripCountValue || (isLoading ? <Skeleton enableAnimation={isLoading} /> : "-")}
            </p>
          </div>
          <div className="text-xs mb-2 flex items-center gap-2">
            <RatingIcon /> {rating ?? (isLoading ? <Skeleton enableAnimation={isLoading} /> : "-")}
          </div>

          {!isRider && (
            <div>
              <p className="text-xs mb-2 border-t border-[#E6E6E6] w-fit pt-3">
                {normalizedCarModel || (isLoading ? <Skeleton enableAnimation={isLoading} /> : "-")}
              </p>
              <p className="text-xs bg-[#FFF5D8] px-3 py-2 rounded-md w-fit">
                {normalizedPlateNumber || (isLoading ? <Skeleton enableAnimation={isLoading} /> : "-")}
              </p>
            </div>
          )}
        </div>
        <div className="mt-4" style={{ flex: 2 }}>
          {userPermissions &&
          (userPermissions[permissionKey].read ||
            userPermissions[permissionKey].write) &&
          viewProfileLink && (
            <Button
              title={'View Profile'}
              onClick={() => router.push(viewProfileLink)}
              className="text-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CarOccupantDetailsCard;
