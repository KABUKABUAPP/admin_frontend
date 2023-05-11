import React, { FC } from "react";

interface Props {
  plateNumber?: string;
}

const PlateNumber: FC<Props> = ({ plateNumber }) => {
  return (
    <div className="p-2 rounded-lg bg-[#FFF5D8] w-fit">
      <p className="text-sm">{plateNumber}</p>
    </div>
  );
};

export default PlateNumber;
