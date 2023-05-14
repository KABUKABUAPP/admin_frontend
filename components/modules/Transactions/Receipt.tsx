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
}

const Receipt: FC<Props> = (props) => {
  const ref = useClickOutside<HTMLDivElement>(() => props.handleClose());

  return (
    <Card elevation={true} maxWidth="400px" maxHeight="95vh">
      <div className="p-4 overflow-x-hidden relative" ref={ref}>
        <p className="text-center font-semibold text-sm mb-6">View Receipt</p>
        <span className="absolute top-4 right-4 cursor-pointer" onClick={props.handleClose}><CloseIcon /></span>
        <Card elevation={true}>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-2xl">Kabukabu</p>
            <p className="font-semibold text-sm">Here are your trip details</p>

            <div className="flex items-center gap-3">
                <OriginAltIcon />
                <p className="text-sm font-semibold">Kuvuki Land</p>
            </div>

            <div className="flex items-center gap-3">
                <DestinationAltIcon />
                <div>
                    <p className="text-sm font-semibold">Filmhouse Cinemas IMAX Lekki</p>
                    <p className="text-xs text-[#9A9A9A]">22, Ozumba Mbadiwe Street, Lekki, Lagos</p>
                </div>
            </div>

            <div className="flex justify-between gap-2 items-center border-b border-b-[#9A9A9A] pb-4">
                <p className="text-xs text-[#9A9A9A]">20 January, 2023 at 3:30pm</p>
                <div className="flex gap-2 items-center ">
                    <WalletIcon />
                    <p className="text-xs text-[#9A9A9A]">Wallet Payment</p>
                </div>
            </div>

            <div className="flex justify-end">
                <p className="text-lg font-semibold">₦1,300</p>
            </div>

            <div className="flex flex-col gap-4 pb-6 border-b border-b-[#9A9A9A]">
                <div className="flex justify-between items-center gap-3">
                    <p className="text-xs text-[#9A9A9A]">Base Fare</p>
                    <p className="text-xs font-semibold">₦500</p>
                </div>
                <div className="flex justify-between items-center gap-3">
                    <p className="text-xs text-[#9A9A9A]">Distance</p>
                    <p className="text-xs font-semibold">₦500</p>
                </div>
                <div className="flex justify-between items-center gap-3">
                    <p className="text-xs text-[#9A9A9A]">Time</p>
                    <p className="text-xs font-semibold">₦500</p>
                </div>
                <div className="flex justify-between items-center gap-3">
                    <p className="text-xs text-[#9A9A9A]">LASG Levy</p>
                    <p className="text-xs font-semibold">₦500</p>
                </div>
                <div className="flex justify-between items-center gap-3">
                    <p className="text-xs text-[#9A9A9A]">Booking Fee</p>
                    <p className="text-xs font-semibold">₦500</p>
                </div>
            </div>

            <div className="flex justify-between gap-4 items-center pb-6 border-b border-b-[#9A9A9A]">

                <div className="relative h-[100px] -translate-x-4" style={{flex: 1}}>
                    <Image layout="fill" objectFit="contain" alt="taxi" src={'/transactions/taxi.png'}/>
                </div>

                <div className="flex flex-col gap-2 items-end" style={{flex: 1}}>
                    <p className="text-sm font-semibold">Toyota Corolla</p>
                    <p className="text-xs">Black</p>
                    <PlateNumber plateNumber="ABC 123 CYZ" bg="#E5EDFF" color="#2C3FEF"/>
                </div>

            </div>

            <div className="flex gap-2">
                <Avatar fallBack="J" size="sm"/>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-bold">John Doe</p>
                    <div className="flex gap-2 items-center">
                        <RatingIcon fill="#1FD11B"/>
                        <RatingIcon fill="#1FD11B"/>
                        <RatingIcon fill="#1FD11B"/>
                    </div>
                    <p className="text-xs font-semibold">20 Total trips</p>
                </div>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default Receipt;
