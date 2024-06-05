import React, { FC } from "react";
import { useRouter } from "next/router";

import Card from "@/components/common/Card";
import Avatar from "@/components/common/Avatar";
import { capitalizeAllFirstLetters } from "@/utils";
import { toast } from "react-toastify";

interface Props {
  fullName?: string;
  address?: string;
  email?: string;
  phone?: string;
  tripCount?: string | number;
  carCount?: string | number;
  rating?: number;
  image?: string;
  isLoading?: boolean;
  totalCarsProcessed?: number;
  role?: string;
  bg?: string;
  declineCount?: number;
  declineReason?: string;
  referral_code?: string;
  inspectionCode?: any;
  id?: string;
  approvalStatus?: string;
  statusRemark?: string;
}

function copyToClipboard(text: string) {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = text;

  // Set the textarea to be invisible
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';

  // Append the textarea to the DOM
  document.body.appendChild(textarea);

  // Select the text in the textarea
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  // Execute the copy command using the Clipboard API
  try {
    document.execCommand('copy');
  } catch (err) {
    toast.error('Unable to copy to clipboard:');
  }

  // Remove the temporary textarea from the DOM
  document.body.removeChild(textarea);
}

const UserInfoCard: FC<Props> = ({
  fullName,
  address,
  email,
  phone,
  image,
  role,
  declineCount,
  approvalStatus,
  statusRemark
}) => {
  const router = useRouter();
  const showCarsProcessed = router.pathname.includes("inspector");
  const showTripCount = !router.pathname.includes("inspector");
  const showDeclineCount = router.pathname.includes("pending");
  const showDeclineReason = router.pathname.includes("pending") && (declineCount ? declineCount > 0 : false);
  const showCarCount = router.pathname === "/car-owners/[id]";
  const isDeleted =
    router.pathname.includes("deleted") || router.query.deleted == "true";

  const deletionReason = router.query.deletion_reason;

  return (
    <Card bg={'#F8F8F8'}>
      <div className={`flex gap-4 ${isDeleted ? "!text-[#9A9A9A]" : ""}`}>
        <div>
          <div className="w-[80px] h-[80px]">
            {(image || fullName) && (
              <Avatar
                imageUrl={image}
                fallBack={`${fullName && fullName[0]}`}
                size="lg"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 justify-between">
            {fullName && <p className="text-3xl font-semibold">{capitalizeAllFirstLetters(fullName)}</p>}
          </div>
          {role && <p className="text-lg font-semibold">{capitalizeAllFirstLetters(role)}</p>}
          {address && <p className="text-lg font-semibold">{capitalizeAllFirstLetters(address)}</p>}
          <div className="flex">
            <div>
              {email && (
                <span
                  className={`text-base font-semibold ${
                    isDeleted ? "!text-[#9A9A9A]" : ""
                  }`}
                >
                  {email}
                </span>
              )}
              <br />
              {phone && (
                <span
                  className={`text-base font-semibold ${
                    isDeleted ? "!text-[#9A9A9A]" : ""
                  }`}
                >
                  {phone}
                </span>
              )}
              <br />
              {approvalStatus && (
                <span
                    className={`text-base font-semibold ${
                    isDeleted ? "!text-[#9A9A9A]" : ""
                    }`}
                >
                    {approvalStatus === 'active' ? capitalizeAllFirstLetters(approvalStatus) : `${capitalizeAllFirstLetters(approvalStatus)}(${capitalizeAllFirstLetters(statusRemark)})`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
