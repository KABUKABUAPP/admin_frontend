import React, { FC } from "react";
import { useRouter } from "next/router";

import Card from "@/components/common/Card";
import Skeleton from "react-loading-skeleton";
import Avatar from "@/components/common/Avatar";
import Rating from "react-star-ratings";
import RatingIcon from "../icons/RatingIcon";
import Pill from "./Pill";
import { capitalizeAllFirstLetters } from "@/utils";
import Copy from "../icons/Copy";
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
  tripCount,
  carCount,
  rating,
  image,
  isLoading,
  totalCarsProcessed,
  role,
  declineCount,
  declineReason,
  bg = "#FFFFFF",
  referral_code,
  inspectionCode,
  id
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
    <Card bg={bg}>
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
            {isDeleted && <Pill title="Deleted" />}
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
              {id && router.asPath.includes('/car-repair-loan') && (
                <span className={`text-base font-bold cursor-pointer`} onClick={() => {
                  window.open(`/drivers/active/${id}`, '_blank')
                }}>
                  View Driver Details
                </span>
              )}
              <br />
              {inspectionCode && inspectionCode.length > 0 && (
                <span
                  className={`text-base font-semibold ${
                    isDeleted ? "!text-[#9A9A9A]" : ""
                  }`}
                >
                  <b>Inspection Code</b>: {inspectionCode}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {referral_code && role === 'executive marketer' && 
            <div className="mx-1">
              <span className="flex bg-[#FFF5D8] pr-2 pl-2" style={{borderRadius: '1rem'}}>
                <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                  <b>{referral_code}</b><br />
                  <small>Referral code</small>
                </span>
                <span style={{marginLeft: '1vw', marginTop: '3vh', cursor: 'pointer'}}>
                  <Copy handleClick={() => {
                    copyToClipboard(referral_code ? referral_code : '')
                    toast.success("Referral code copied");
                  }} />
                </span>
              </span>
            </div>}

            {referral_code && role === 'executive marketer' && 
            <div className="mx-1">
              <span className="flex bg-[#FFF5D8] px-2 py-3 items-center" style={{borderRadius: '1rem'}}>
                <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                  <small>Copy Referral Link (Rider)</small>
                </span>
                <span style={{marginLeft: '1vw', marginTop: '3vh', cursor: 'pointer'}}>
                  <Copy handleClick={() => {
                    copyToClipboard(referral_code ? `https://kabukabu.com.ng/ref?code=${referral_code}&type=rider` : '')
                    toast.success("Referral Link copied");
                  }} />
                </span>
              </span>
            </div>}

            {referral_code && role === 'executive marketer' && 
            <div className="mx-1">
              <span className="flex bg-[#FFF5D8] px-2 py-3 items-center" style={{borderRadius: '1rem'}}>
                <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                  <small>Copy Referral Link (Driver)</small>
                </span>
                <span style={{marginLeft: '1vw', marginTop: '3vh', cursor: 'pointer'}}>
                  <Copy handleClick={() => {
                    copyToClipboard(referral_code ? `https://kabukabu.com.ng/ref?code=${referral_code}&type=driver` : '')
                    toast.success("Referral Link copied");
                  }} />
                </span>
              </span>
            </div>}
          </div>
          
          {
            showTripCount &&
            (tripCount === 0 ? (
              <p className="text-sm font-semibold">0 trips</p>
            ) : (
              showTripCount && (
                <p className="text-sm font-semibold">
                  {tripCount && `${tripCount} trips`}
                </p>
              )
            ))
          }

          {
            showCarCount &&
            (carCount === 0 ? (
              <p className="text-sm font-semibold">0 cars</p>
            ) : (
              showCarCount && (
                <p className="text-sm font-semibold">
                  {carCount && `${carCount} cars`}
                </p>
              )
            ))
          }

          <p className="text-sm font-semibold">
            {Boolean(rating) &&
              (rating === 0 ? (
                <span className="flex items-center gap-1">
                  <RatingIcon />
                  {rating}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <RatingIcon /> {rating}
                </span>
              ))}
          </p>

          {showCarsProcessed && (
            <p className="text-lg font-semibold">
              {totalCarsProcessed} Car(s) processed
            </p>
          )}

          {showDeclineCount && (
            <>
              <p className="text-lg font-semibold">
                Declined {declineCount} time(s)
              </p>
            </>
          )}

          {showDeclineReason && (
            <p className="text-lg font-semibold">
              Reason: {declineReason}
            </p>
          )}

          {isDeleted && (
            <div>
              <p className="text-[#9A9A9A]">Deleted user</p>
              <p className="text-[#9A9A9A]">[{deletionReason}]</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
