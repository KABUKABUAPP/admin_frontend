import { SharpCarsTableBodyData } from "@/models/SharpCars";
import Link from "next/link";
import React, { FC } from "react";
import { useRouter } from "next/router";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  data: any;
  currentPage?: any;
  innerFilterValue?: string;
}

const CarOwnersTableBodyRow: FC<Props> = ({
  data,
  currentPage,
  innerFilterValue
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>  router.push(`/car-owners/${data?._id}/?current_page=${currentPage}`)}
      className="flex p-3 py-8 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
    >
      <div style={{ flex: 1 }} className="flex items-center">
          <p className="text-xs font-bold cursor-pointer">{data?._id}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(data?.full_name)}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(data?.address)}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{data?.total_cars}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{data?.active_cars}</p>
      </div>
      {/*<div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{}</p>
      </div>*/}
    </div>
  );
};

export default CarOwnersTableBodyRow;
