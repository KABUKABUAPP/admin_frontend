import { SharpCarsTableBodyData } from "@/models/SharpCars";
import Link from "next/link";
import React, { FC } from "react";
import { useRouter } from "next/router";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  data: any;
  currentPage?: any;
  innerFilterValue?: string;
  status?: string;
}

const PendingRequestsTableBodyRow: FC<Props> = ({
  data,
  currentPage,
  innerFilterValue,
  status
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>  {
        router.push(`/car-owners/car/${data?.car?._id}?${status === 'pending' ? 'approveRequest=yes&' : ''}fallbackUrl=${router.pathname}?currentPage=${currentPage}`)
    }}
      className="flex p-3 py-8 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
    >
      <div style={{ flex: 1 }} className="flex items-center">
          <p className="text-xs font-bold cursor-pointer">{data?.car?._id}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(data?.user?.full_name)}</p>
      </div>
      {/*<div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(data?.address)}</p>
      </div>*/}
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{`${capitalizeAllFirstLetters(data?.car?.brand_name)} ${capitalizeAllFirstLetters(data?.car?.model)} ${data?.car?.year}`}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(data?.status)}</p>
      </div>
      {/*<div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{}</p>
      </div>*/}
    </div>
  );
};

export default PendingRequestsTableBodyRow;
