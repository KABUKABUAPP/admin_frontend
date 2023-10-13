import React, { FC } from "react";

interface Props {
  plateNumber?: string;
  bg?: string;
  color?: string
}

const PlateNumber: FC<Props> = ({ plateNumber, bg='#FFF5D8', color="#000000" }) => {
  return (
    <div className="p-2 rounded-lg w-fit" style={{backgroundColor: bg}}>
      <p className="text-sm" style={{color: color}}>{plateNumber}</p>
    </div>
  );
};

export default PlateNumber;
