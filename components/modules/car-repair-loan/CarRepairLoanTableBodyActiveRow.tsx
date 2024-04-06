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

const CarRepairLoanTableBodyActiveRow: FC<Props> = ({
  data,
  currentPage,
  innerFilterValue
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>  router.push(`/car-repair-loan/${data?._id}/?current_page=${currentPage}&fallbackUrl=${router.pathname}`)}
      className="flex p-3 py-8 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
    >
      <div style={{ flex: 1 }} className="flex items-center">
          <p className="text-xs font-bold cursor-pointer">{data?._id}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(data?.driver?.full_name)}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(`${data?.driver?.driver?.city}, ${data?.driver?.driver?.state}, ${data?.driver?.driver?.country}`)}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{data?.total_cost}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{data?.total_paid}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{new Date(data?.date_of_initiation).toLocaleDateString()}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{data?.status}</p>
      </div>
    </div>
  );
};

export default CarRepairLoanTableBodyActiveRow;
