import React, { FC } from "react";

import Card from "@/components/common/Card";
import Avatar from "@/components/common/Avatar";
import Skeleton from "react-loading-skeleton";
import PlateNumber from "@/components/common/PlateNumber";
import Button from "@/components/ui/Button/Button";

interface Props {
  isLoading?: boolean;
  carImages?: string[];
  carModel?: string;
  carColor?: string;
  plateNumber?: string;
  bg?: string
}

const CarDetailsCard: FC<Props> = ({
  carImages,
  carModel,
  isLoading,
  carColor,
  plateNumber,
  bg='#FFFFFF'
}) => {
  return (
    <Card bg={bg}>
      <div className="flex flex-col gap-3">
        <p className="text-lg font-semibold">Car Details</p>

        <div className="flex max-w-[300px] overflow-x-auto scrollbar-none gap-2">
          {carImages?.map((image) => {
            return (
              <div>
                <Avatar imageUrl={image} fallBack="" shape="square" size="lg" />
              </div>
            );
          })}
        </div>
        <p className="text-lg font-semibold">
          {carModel || <Skeleton enableAnimation={isLoading} />}
        </p>
        <p className="text-sm text-[#9A9A9A]">
          {carColor || <Skeleton enableAnimation={isLoading} />}
        </p>
        {plateNumber ? (
          <PlateNumber plateNumber={plateNumber} />
        ) : (
          <Skeleton enableAnimation={isLoading} />
        )}

        <Button
          title="View Location History"
          variant="text"
          color="tetiary"
          className="w-fit"
        />
      </div>
    </Card>
  );
};

export default CarDetailsCard;
