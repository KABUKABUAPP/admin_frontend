import React, { FC } from "react";

import Avatar from "@/components/common/Avatar";
import PlateNumber from "@/components/common/PlateNumber";

interface Props {
  carModel?: string;
  carColor?: string;
  plateNumber?: string;
  carImage?: string;
  carId?: string;
}

const CarDescriptionItem: FC<Props> = ({
  carColor,
  carImage,
  carModel,
  plateNumber,
  carId,
}) => {
  return (
    <div className="bg-[#F8F8F8] rounded-lg p-2">
      <p className="text-xs text-[#9A9A9A] mb-2">#{carId}</p>
      <div className="flex items-center gap-2">
        <Avatar fallBack="C" shape="square" imageUrl={carImage} size="md" />
        <div>
          <p className="mb-2 text-sm font-semibold">
            {carModel}, {carColor}
          </p>
          <PlateNumber plateNumber={plateNumber} />
        </div>
      </div>
    </div>
  );
};

export default CarDescriptionItem;
