import React, { FC } from "react";

import Card from "@/components/common/Card";
import useClickOutside from "@/hooks/useClickOutside";
import { useModalContext } from "@/contexts/ModalContext";
import Button from "@/components/ui/Button/Button";
import UploadDetailsCard from "./UploadDetailsCard";
import CloseIcon from "@/components/icons/CloseIcon";
import DeclineGuarantorReasonCard from "./DeclineGuarantorReasonCard";
import ApproveGuarantorRequestCard from "./ApproveGuarantorRequestCard";
import useUserPermissions from "@/hooks/useUserPermissions";

interface Props {
  driverUpload: {
    title: string;
    fullname: string;
    relationship: string;
    address: string;
    phone: string;
    image: string;
  };
  /*guarantorUpload: {
    title: string;
    fullname: string;
    relationship: string;
    address: string;
    phone: string;
    image: string;
  };*/
}

const ViewGuarantorCard: FC<Props> = ({ driverUpload/*, guarantorUpload*/ }) => {
  const { setModalContent } = useModalContext();
  const { userPermissions } = useUserPermissions();

  return (
    <Card maxWidth="800px">
      <div className="p-8 relative">
        <span
          className="absolute top-9 right-8 cursor-pointer"
          onClick={() => {
            setModalContent(null);
          }}
        >
          <CloseIcon />
        </span>
        <p className="text-base font-semibold text-center mb-4">
          View Guarantor
        </p>
        <p className="text-base font-semibold text-center">
          Verify the guarantor's details with Driver's
        </p>
      </div>
      <div className="my-10 flex gap-6 justify-between max-sm:flex-col">
        <div className="w-full">
          <UploadDetailsCard {...driverUpload} />
        </div>
        {/*<div className="w-full">
          <UploadDetailsCard {...guarantorUpload} />
        </div>*/}
      </div>
      <div className="flex justify-between gap-6 max-sm:flex-col">
        {userPermissions && userPermissions.drivers_permissions.write && (
          <div style={{ flex: 1 }}>
            <Button
              title="Reject Guarantor"
              size="large"
              color="secondary"
              className="!w-full"
              onClick={() => {
                setModalContent(<DeclineGuarantorReasonCard />);
              }}
            />
          </div>
        )}
        {userPermissions && userPermissions.drivers_permissions.write && (
          <div style={{ flex: 1 }}>
            <Button
              title="Approve Guarantor"
              size="large"
              className="!bg-[#1FD11B] !text-[#FFFFFF] !w-full"
              onClick={() => {
                setModalContent(<ApproveGuarantorRequestCard />);
              }}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ViewGuarantorCard;
