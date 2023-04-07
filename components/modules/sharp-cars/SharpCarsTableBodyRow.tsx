import { SharpCarsTableBodyData } from "@/models/SharpCars";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  data: SharpCarsTableBodyData;
}

const SharpCarsTableBodyRow: FC<Props> = ({
  data: { carBrandModel, carId, dateTimeAdded, driver, licenseNumber },
}) => {
  return (
    <div className="flex p-3 py-8 gap-6 border-b border-b[#E6E6E6]">
      <div style={{ flex: 1 }} className="flex items-center">
        <Link href={`/sharp-cars/${carId}`}>
          <p className="text-xs font-bold cursor-pointer">{carId}</p>
        </Link>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{carBrandModel}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{driver}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{licenseNumber}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{dateTimeAdded}</p>
      </div>
    </div>
  );
};

export default SharpCarsTableBodyRow;
