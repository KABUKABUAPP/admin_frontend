import React, { FC, useEffect } from "react";
import Image from "next/image";

import Button from "@/components/ui/Button/Button";
import CheckIcon from "@/components/icons/CheckIcon";
import TimesIcon from "@/components/icons/TimesIcon";
import { MappedDocument } from "@/models/Drivers";
import { useInspectDocumentMutation } from "@/api-services/driversService";
import Loader from "@/components/ui/Loader/Loader";
import { toast } from "react-toastify";

interface Props extends MappedDocument {
  id: string
}

const ActionDocumentCard: FC<Props> = ({ docId, docImage, title, status, id }) => {
  const cardBg: Record<string, string> = {
    PENDING: "#F8F8F8",
    DECLINED: "#FEE2E9",
  };

  const [inspectDocument, { isLoading, isError, isSuccess, error }] =
    useInspectDocumentMutation();

  useEffect(()=>{
    if(error && "data" in error){
      const { status }:any = error.data
      toast.error(status)
    }
  },[error])

  return (
    <div
      className="rounded-lg p-4 flex justify-between items-center gap-16"
      style={{
        backgroundColor:
          status && status in cardBg ? cardBg[status] : "#E3FFE2",
      }}
    >
      <div style={{ flex: 1 }}>
        {docImage && (
          <div className="relative h-[80px] w-full">
            <Image src={docImage} layout="fill" objectFit="cover" />
          </div>
        )}
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-[#9A9A9A]">{docId}</p>
      </div>
      <div className="flex flex-col gap-4" style={{ flex: 1 }}>
        {!isLoading && status === "PENDING" && (
          <>
            <Button
              title="Approve"
              className="!bg-transparent border !border-[#161616]"
              startIcon={<CheckIcon fill="#161616" />}
              onClick={() => {
                if (docId) {
                  inspectDocument({ docId: id, status: "APPROVED" });
                }
              }}
            />
            <Button
              title="Decline"
              className="!bg-transparent border !border-[#EF2C5B] !text-[#EF2C5B]"
              startIcon={<TimesIcon fill="#EF2C5B" />}
              onClick={() => {
                if (docId) {
                  inspectDocument({ docId, status: "DECLINED" });
                }
              }}
            />
          </>
        )}
        {!isLoading && status !== "PENDING" && (
          <>
            <div>
              {status === "APPROVED" ? (
                <div className="flex items-center gap-3">
                  <CheckIcon fill="#1FD11B"/> <p className="text-[#1FD11B]">Approved</p>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <TimesIcon fill="#EF2C5B"/> <p className="text-[#EF2C5B]">Declined</p> 
                </div>
              )}
            </div>
          </>
        )}
        {isLoading && (
          <div className="flex justify-center w-full">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionDocumentCard;
