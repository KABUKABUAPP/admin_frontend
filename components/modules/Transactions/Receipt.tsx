import React, { FC } from "react";
import Image from "next/image";

import Card from "@/components/common/Card";
import useClickOutside from "@/hooks/useClickOutside";
import OriginAltIcon from "@/components/icons/OriginAltIcon";
import DestinationAltIcon from "@/components/icons/DestinationAltIcon";
import WalletIcon from "@/components/icons/WalletIcon";
import PlateNumber from "@/components/common/PlateNumber";
import Avatar from "@/components/common/Avatar";
import RatingIcon from "@/components/icons/RatingIcon";
import CloseIcon from "@/components/icons/CloseIcon";

interface Props {
  handleClose: () => void;
  total?: number;
  baseFare?: number;
  distance?: number;
  time?: number;
  levy?: number;
  bookingFee?: number;
  origin?: string;
  destinationTop?: string;
  destinationBottom?: string;
  date?: string;
  paymentMethod?: string;
  carModel?: string;
  carColor?: string;
  plateNumber?: string;
  riderFullName?: string;
  totalTrips?: number;
  rating?: number;
}

const Receipt: FC<Props> = (props) => {
  const ref = useClickOutside<HTMLDivElement>(() => props.handleClose());

  return (
    <Card elevation={true} maxWidth="400px" maxHeight="95vh">
      <div className="p-4 overflow-x-hidden relative" ref={ref}>
        <p className="text-center font-semibold text-sm mb-6">View Receipt</p>
        <span
          className="absolute top-4 right-4 cursor-pointer"
          onClick={props.handleClose}
        >
          <CloseIcon />
        </span>
        <Card elevation={true}>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-2xl">Kabukabu</p>
            <p className="font-semibold text-sm">Here are your trip details</p>

            <div className="flex items-center gap-3">
              <OriginAltIcon />
              <p className="text-sm font-semibold">{props.origin}</p>
            </div>

            <div className="flex items-center gap-3">
              <DestinationAltIcon />
              <div>
                <p className="text-sm font-semibold">{props.destinationTop}</p>
                <p className="text-xs text-[#9A9A9A]">
                  {props.destinationBottom}
                </p>
              </div>
            </div>

            <div className="flex justify-between gap-2 items-center border-b border-b-[#9A9A9A] pb-4">
              <p className="text-xs text-[#9A9A9A]">{props.date}</p>
              <div className="flex gap-2 items-center ">
                <WalletIcon />
                <p className="text-xs text-[#9A9A9A]">{props.paymentMethod}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <p className="text-lg font-semibold">₦{props.total}</p>
            </div>

            <div className="flex flex-col gap-4 pb-6 border-b border-b-[#9A9A9A]">
              <div className="flex justify-between items-center gap-3">
                <p className="text-xs text-[#9A9A9A]">Base Fare</p>
                <p className="text-xs font-semibold">₦{props.baseFare}</p>
              </div>
              <div className="flex justify-between items-center gap-3">
                <p className="text-xs text-[#9A9A9A]">Distance</p>
                <p className="text-xs font-semibold">₦{props.distance}</p>
              </div>
              <div className="flex justify-between items-center gap-3">
                <p className="text-xs text-[#9A9A9A]">Time</p>
                <p className="text-xs font-semibold">₦{props.time}</p>
              </div>
              <div className="flex justify-between items-center gap-3">
                <p className="text-xs text-[#9A9A9A]">LASG Levy</p>
                <p className="text-xs font-semibold">₦{props.levy}</p>
              </div>
              <div className="flex justify-between items-center gap-3">
                <p className="text-xs text-[#9A9A9A]">Booking Fee</p>
                <p className="text-xs font-semibold">₦{props.bookingFee}</p>
              </div>
            </div>

            <div className="flex justify-between gap-4 items-center pb-6 border-b border-b-[#9A9A9A]">
              <div
                className="relative h-[100px] -translate-x-4"
                style={{ flex: 1 }}
              >
                <Image
                  layout="fill"
                  objectFit="contain"
                  alt="taxi"
                  src={"/transactions/taxi.png"}
                />
              </div>

              <div
                className="flex flex-col gap-2 items-end"
                style={{ flex: 1 }}
              >
                <p className="text-sm font-semibold">Toyota Corolla</p>
                <p className="text-xs">{props.carColor}</p>
                <PlateNumber
                  plateNumber={props.plateNumber}
                  bg="#E5EDFF"
                  color="#2C3FEF"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Avatar fallBack="J" size="sm" />
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">{props.riderFullName}</p>
                <div className="flex gap-2 items-center">
                  {props.rating}
                  <RatingIcon fill="#1FD11B" />
                </div>
                <p className="text-xs font-semibold">
                  {props.totalTrips} Total trip(s)
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default Receipt;
