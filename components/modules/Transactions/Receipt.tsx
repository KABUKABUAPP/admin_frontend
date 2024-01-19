import React, { FC, useEffect } from "react";
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
import { useGetSingleTransactionQuery } from "@/api-services/transactionsService";
import Loader from "@/components/ui/Loader/Loader";
import { capitalizeAllFirstLetters } from "@/utils";

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
  narrationId?: string;
  narration?: string;
  id?: string;
  theModalData?: any;
}

const getFormattedTimeDate = (utcDate: any) => {
  const theDate = new Date(utcDate);
  const year = theDate.getFullYear();
  const month = String(theDate.getMonth() + 1).padStart(2, '0');
  const day = String(theDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${String(theDate.getHours()).padStart(2, '0')}:${String(theDate.getMinutes()).padStart(2, '0')}:${String(theDate.getSeconds()).padStart(2, '0')}`;

  return { formattedDate, formattedTime }
}

interface RatingProps {
  rating: number;
}

const ShowRating: FC<any> = (rating: any) => {
  let ratingEl = Array.from({ length: rating.rating }, (_, index) => (
    <div key={index}>
      <RatingIcon fill="#1FD11B" />
    </div>
  ));

  let ratingElOp = Array.from({ length: 5 - rating.rating }, (_, index) => (
    <div key={index}>
      <RatingIcon fill="#F6F6F6" />
    </div>
  ));

  return (
    <>
      {ratingEl}
      {ratingElOp}
    </>
  )
  
}


const Receipt: FC<Props> = (props) => {

  const { data, isLoading, isError, refetch } = useGetSingleTransactionQuery(
    { narration: props.narration, narration_id: props.narrationId, id: props.id },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const ref = useClickOutside<HTMLDivElement>(() => props.handleClose());

  return (
    <Card elevation={true} maxWidth="400px" maxHeight="95vh">
      {
        isLoading ?
        <>
          <Loader />
        </> :
        <>
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
                  <p className="text-sm font-semibold">{`${data?.origin?.street}, ${data?.origin?.state}`}</p>
                </div>

                <div className="flex items-center gap-3">
                  <DestinationAltIcon />
                  <div>
                    <p className="text-sm font-semibold">{`${data?.destination?.street}, ${data?.destination?.state}`}</p>
                    <p className="text-xs text-[#9A9A9A]">
                      {props.destinationBottom}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between gap-2 items-center border-b border-b-[#9A9A9A] pb-4">
                  <p className="text-xs text-[#9A9A9A]">{`${getFormattedTimeDate(data?.time).formattedDate} at ${getFormattedTimeDate(data?.time).formattedTime}`}</p>
                  <div className="flex gap-2 items-center ">
                    <WalletIcon />
                    <p className="text-xs text-[#9A9A9A]">{capitalizeAllFirstLetters(data?.payment_type)}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <p className="text-lg font-semibold">₦{data?.price_breakdown?.total_charge}</p>
                </div>

                <div className="flex flex-col gap-4 pb-6 border-b border-b-[#9A9A9A]">
                  <div className="flex justify-between items-center gap-3">
                    <p className="text-xs text-[#9A9A9A]">Base Fare</p>
                    <p className="text-xs font-semibold">₦{data?.price_breakdown?.base_fare}</p>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <p className="text-xs text-[#9A9A9A]">Distance</p>
                    <p className="text-xs font-semibold">₦{data?.price_breakdown?.distace}</p>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <p className="text-xs text-[#9A9A9A]">Time</p>
                    <p className="text-xs font-semibold">₦{data?.price_breakdown?.time}</p>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <p className="text-xs text-[#9A9A9A]">LASG Levy</p>
                    <p className="text-xs font-semibold">₦{data?.price_breakdown?.state_levy}</p>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <p className="text-xs text-[#9A9A9A]">Booking Fee</p>
                    <p className="text-xs font-semibold">₦{data?.price_breakdown?.booking_fee}</p>
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
                    <p className="text-sm font-semibold">{`${capitalizeAllFirstLetters(data?.car?.brand_name)}, ${capitalizeAllFirstLetters(data?.car?.model)}, ${capitalizeAllFirstLetters(data?.car?.year)}`}</p>
                    <p className="text-xs">{capitalizeAllFirstLetters(data?.car?.color)}</p>
                    <PlateNumber
                      plateNumber={data?.car?.plate_number}
                      bg="#E5EDFF"
                      color="#2C3FEF"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Avatar fallBack="J" size="sm" />
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-bold">{capitalizeAllFirstLetters(data?.driver?.full_name)}</p>
                    <div className="flex gap-2 items-center">
                      {data?.driver?.average_rating?.value}
                      <ShowRating rating={data?.driver?.average_rating?.value} />
                    </div>
                    <p className="text-xs font-semibold">
                      {data?.driver?.total_trips} Total trip(s)
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>
      }
      
    </Card>
  );
};

export default Receipt;
