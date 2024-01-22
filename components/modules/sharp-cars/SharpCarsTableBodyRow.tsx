import { SharpCarsTableBodyData } from "@/models/SharpCars";
import Link from "next/link";
import React, { FC } from "react";
import { useRouter } from "next/router";

interface Props {
  data: SharpCarsTableBodyData;
  currentPage?: any;
}

const SharpCarsTableBodyRow: FC<Props> = ({
  data: { carBrandModel, carId, dateTimeAdded, driver, licenseNumber },
  currentPage
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.query.tab && router.query.tab === 'pending' ? router.push(`/sharp-cars/pending/${carId}?current_page=${currentPage}`) : router.push(`/sharp-cars/${driver}?current_page=${currentPage}`)}
      className="flex p-3 py-8 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
    >
      <div style={{ flex: 1 }} className="flex items-center">
          <p className="text-xs font-bold cursor-pointer">{carId}</p>
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
