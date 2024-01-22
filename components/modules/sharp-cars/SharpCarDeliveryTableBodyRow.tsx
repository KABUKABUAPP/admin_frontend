import { SharpCarsTableBodyData } from "@/models/SharpCars";
import Link from "next/link";
import React, { FC } from "react";
import { useRouter } from "next/router";
import { capitalizeAllFirstLetters } from "@/utils";

function formatTime(inputTime: string) {
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedTime = new Date(inputTime).toLocaleDateString('en-US', options);
    return formattedTime;
}

function formatDateTime(inputTime: string) {
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedTime = new Date(inputTime).toLocaleDateString('en-US', options);
  
    // Extracting time part and formatting it
    const timePart = new Date(inputTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  
    return `${formattedTime} at ${timePart}`;
}

interface Props {
  data: any
}

const SharpCarsDeliveryTableBodyRow: FC<Props> = ({data}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/sharp-cars/car-deliveries/${data._id}`)}
      className="flex p-3 py-8 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
    >
      <div style={{ flex: 1 }} className="flex items-center">
        <Link href={`/sharp-cars/car-deliveries/${data._id}`}>
          <p className="text-xs font-bold cursor-pointer">{data._id}</p>
        </Link>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(data?.hub?.name)}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(data?.inspector?.name)}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{data?.total_cars}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{formatTime(data?.estimated_delivery_date)}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{formatDateTime(data?.created_at)}</p>
      </div>
      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(data?.status)}</p>
      </div>
    </div>
  );
};

export default SharpCarsDeliveryTableBodyRow;
