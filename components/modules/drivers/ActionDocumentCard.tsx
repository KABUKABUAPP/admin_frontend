import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

import Button from "@/components/ui/Button/Button";
import CheckIcon from "@/components/icons/CheckIcon";
import TimesIcon from "@/components/icons/TimesIcon";
import { MappedDocument } from "@/models/Drivers";
import { useInspectDocumentMutation } from "@/api-services/driversService";
import Loader from "@/components/ui/Loader/Loader";
import { toast } from "react-toastify";
import { useEnlargedImageContext } from "@/contexts/EnlargeImageContext";
import useUserPermissions from "@/hooks/useUserPermissions";
import { useRouter } from "next/router";
import { useModalContext } from "@/contexts/ModalContext";
import Card from "@/components/common/Card";
import TimesIconRed from "@/components/icons/TimesIconRed";
import TextField from "@/components/ui/Input/TextField/TextField";

interface Props extends MappedDocument {
  id: string;
}

const DeclineModal = ({ onClose, onSubmit }: any) => {
  const [reason, setReason] = useState("");

  return (
    <div className="mx-auto w-[90vw] sm:w-[50vw]">
      <Card bg="#FFF">
        <div className="p-2 flex flex-col gap-4">
          <div className="flex justify-end">
            <div className="w-auto cursor-pointer" onClick={onClose}>
              <TimesIconRed />
            </div>
          </div>

          <div className="p-2 flex flex-col gap-2">
            <label htmlFor="reason">Decline Reason</label>
            <input
              placeholder="Enter Reason For Decline Here"
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="rounded-md p-3 border border-[#E0E0E0] focus:outline-none focus:border-[#161616]"
            />
          </div>

          <Button
            title="Decline"
            className="!bg-transparent border !border-[#EF2C5B] !text-[#EF2C5B]"
            startIcon={<TimesIcon fill="#EF2C5B" />}
            onClick={() => onSubmit(reason)}
          />
        </div>
      </Card>
    </div>
  );
};

const ActionDocumentCard: FC<Props> = ({
  docId,
  docImage,
  title,
  status,
  id,
  reason
}) => {
  const cardBg: Record<string, string> = {
    PENDING: "#F8F8F8",
    DECLINED: "#FEE2E9",
  };
  const router = useRouter();
  const { setModalContent } = useModalContext();

  const { setImageUrl } = useEnlargedImageContext();
  const [docStatus, setDocStatus] = useState(status);

  const [inspectDocument, { isLoading, isError, isSuccess, error }] =
    useInspectDocumentMutation();

  const { userPermissions } = useUserPermissions();

  useEffect(() => {
    if (error && "data" in error) {
      const { status }: any = error.data;
      toast.error(status);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Document Approval Successful');
    }
  }, [isSuccess]);

  return (
    <div
      className="rounded-lg p-4 flex justify-between items-center gap-16"
      style={{
        backgroundColor:
        docStatus && docStatus in cardBg ? cardBg[docStatus] : "#E3FFE2",
      }}
    >
      <div style={{ flex: 1 }}>
        {docImage && (
          <div
            className="relative h-[80px] w-full cursor-pointer"
            onClick={() => setImageUrl(docImage)}
          >
            <Image src={docImage} layout="fill" objectFit="cover" />
          </div>
        )}
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-[#9A9A9A]">{docId}</p>
        {
          docStatus === "DECLINED" && reason && 
          <>
            <p className="text-sm text-[#000000] font-bold">{'Decline Reason'}</p>
            <p className="text-sm text-[#9A9A9A]">{reason}</p>
          </>
        }
      </div>
      <div className="flex flex-col gap-4" style={{ flex: 1 }}>
        {userPermissions &&
          userPermissions.drivers_permissions.write &&
          !isLoading &&
          docStatus === "PENDING" && (
            <>
              <Button
                title="Approve"
                className="!bg-transparent border !border-[#161616]"
                startIcon={<CheckIcon fill="#161616" />}
                onClick={() => {
                  if (docId) {
                    inspectDocument({ docId: id, status: "APPROVED", reason: '' });
                    setDocStatus('APPROVED');
                  }
                }}
              />
              <Button
                title="Decline"
                className="!bg-transparent border !border-[#EF2C5B] !text-[#EF2C5B]"
                startIcon={<TimesIcon fill="#EF2C5B" />}
                onClick={() => {
                  setModalContent(
                    <DeclineModal
                      onClose={() => setModalContent(null)}
                      onSubmit={(reason: string) => {
                        if (docId) {
                          inspectDocument({ docId: id, status: "DECLINED", reason });
                          setDocStatus('DECLINED');
                          setModalContent(null);
                        }
                      }}
                    />
                  );
                }}
              />
            </>
        )}
        {!isLoading && docStatus !== "PENDING" && (
          <>
            <div>
              {docStatus === "APPROVED" ? (
                <div className="flex items-center gap-3">
                  <CheckIcon fill="#1FD11B" />{" "}
                  <p className="text-[#1FD11B]">Approved</p>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <TimesIcon fill="#EF2C5B" />{" "}
                  <p className="text-[#EF2C5B]">Declined</p>
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
