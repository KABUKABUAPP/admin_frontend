import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import Card from "@/components/common/Card";
import Avatar from "@/components/common/Avatar";
import Skeleton from "react-loading-skeleton";
import Button from "../ui/Button/Button";
import InfoIcon from "../icons/InfoIcon";
import CheckIcon from "../icons/CheckIcon";
import TimesIcon from "../icons/TimesIcon";
import { useModalContext } from "@/contexts/ModalContext";
import ViewGuarantorCard from "../modules/drivers/ViewGuarantorCard";

interface Props {
  image?: string;
  fullname?: string;
  relationship?: string;
  address?: string;
  phone?: string;
  isLoading?: boolean;
  bg?: string;
  responded?: boolean;
  responseStatus?: "pending" | "approved" | "declined";
}

const GuarantorDetailsCard: FC<Props> = ({
  image,
  isLoading,
  fullname,
  relationship,
  address,
  phone,
  responded,
  responseStatus,
  bg = "#FFFFFF",
}) => {
  const router = useRouter();
  const { setModalContent } = useModalContext()
  const [showGuarantorStatus, setShowGuarantorStatus] =
    useState<boolean>(false);

  useEffect(() => {
    if (router.pathname && router.pathname.includes("pending")) {
      setShowGuarantorStatus(true);
    }
  }, [router.pathname]);

  const statusBg: Record<string, string> = {
    pending: "#FFFFFF",
    declined: "#FEE2E9",
    approved: "#E3FFE2",
  };

  return (
    <Card bg={!showGuarantorStatus ? bg : statusBg[`${responseStatus}`]}>
      <p className="text-lg font-semibold">Guarantor Details</p>
      <div className="flex gap-2 mt-2">
        <div>
          <div className="w-[80px] h-[80px]">
            {fullname ? (
              <Avatar imageUrl={image} fallBack={fullname[0]} size="md" />
            ) : (
              <Skeleton
                enableAnimation={isLoading}
                className="w-[80px] h-[80px] pt-2"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">{fullname}</p>
          <p className="text-sm text-[#9A9A9A]">{relationship}</p>
          <p className="text-sm text-[#9A9A9A]">{address}</p>
          <p className="text-sm text-[#9A9A9A]">{phone}</p>
        </div>
      </div>
      {responseStatus === "pending" && showGuarantorStatus ? (
        responded === false ? (
          <p className="text-base font-semibold mt-3">
            Guarantor has not responded
          </p>
        ) : (
          <>
            <div className="flex items-center gap-3 mt-3 mb-1">
              <InfoIcon />
              <p className="text-base font-semibold">Guarantor has responded</p>
            </div>
            <Button title="Click to view" variant="text" onClick={()=>{
              setModalContent(<ViewGuarantorCard />)
            }}/>
          </>
        )
      ) : null}
      {responseStatus === "approved" && showGuarantorStatus ? (
        <div className="flex items-center gap-3 mt-3">
          <CheckIcon fill="#1FD11B" />
          <p className="text-[#1FD11B] font-semibold">Approved</p>
        </div>
      ) : null}

      {responseStatus === "declined" && showGuarantorStatus ? (
        <div className="flex items-center gap-3 mt-3">
          <TimesIcon fill="#EF2C5B" />
          <p className="text-[#EF2C5B] font-semibold">Declined</p>
        </div>
      ) : null}
    </Card>
  );
};

export default GuarantorDetailsCard;
