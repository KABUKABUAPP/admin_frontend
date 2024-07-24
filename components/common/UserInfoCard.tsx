import React, { FC, useState } from "react";
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
import TimesIconRed from "../icons/TimesIconRed";

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
  referrer?: any;
  referralHistory?: any;
  totalReferredDrivers?: any;
  totalReferredRiders?: any;
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
  id,
  referrer,
  referralHistory,
  totalReferredDrivers,
  totalReferredRiders
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const showCarsProcessed = router.pathname.includes("inspector");
  const showTripCount = !router.pathname.includes("inspector");
  const showDeclineCount = router.pathname.includes("pending");
  const showDeclineReason = router.pathname.includes("pending") && (declineCount ? declineCount > 0 : false);
  const showCarCount = router.pathname === "/car-owners/[id]";
  const isDeleted =
    router.pathname.includes("deleted") || router.query.deleted == "true";

  const deletionReason = router.query.deletion_reason;

  const toggleSidebar = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex">
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
              {
                referral_code && 
                <div className="mx-1 bg-[#FFF5D8] pr-2 pl-2" style={{borderRadius: '1rem'}}>
                  <span className="flex justify-between">
                    <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                      <small>Your Referral code</small><br />
                      <b>{referral_code}</b><br />
                      <span className="cursor-pointer" onClick={() => {
                        toggleSidebar()
                      }}>
                        <small>View Referral History</small>
                      </span>
                    </span>
                    <span style={{marginLeft: '1vw', marginTop: '3vh', cursor: 'pointer'}}>
                      <Copy handleClick={() => {
                        copyToClipboard(referral_code ? referral_code : '')
                        toast.success("Referral code copied");
                      }} />
                    </span>
                  </span>
                  <span className="flex justify-between text-xs gap-2 py-3">
                    <span className="cursor-pointer" onClick={() => {
                      copyToClipboard(referral_code ? `https://kabukabu.com.ng/ref?code=${referral_code}&type=driver` : '')
                      toast.success("Referral Link copied");
                    }}>Copy Link(Driver)</span>
                    <span className="cursor-pointer" onClick={() => {
                      copyToClipboard(referral_code ? `https://kabukabu.com.ng/ref?code=${referral_code}&type=rider` : '')
                      toast.success("Referral Link copied");
                    }}>Copy Link(Rider)</span>
                  </span>
                </div>
              }

              {
                referrer && 
                <div className="bg-[#F1F1F1] rounded-lg p-2 w-full">
                  <p className="text-xs text-[#000]">Referred by {capitalizeAllFirstLetters(referrer?.full_name)}</p>
                </div>
              }
              
              {
                totalReferredDrivers >= 0 &&
                <div className="bg-[#F1F1F1] rounded-lg p-2 w-full">
                  <p className="text-xs text-[#000]">Total Referred Drivers: {totalReferredDrivers}</p>
                </div>
              }

              {
                totalReferredRiders >= 0 &&
                <div className="bg-[#F1F1F1] rounded-lg p-2 w-full">
                  <p className="text-xs text-[#000]">Total Referred Riders: {totalReferredRiders}</p>
                </div>
              }
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

      <div className={`absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30 ${isOpen ? 'block' : 'hidden'}`}></div>

      <div className={`text-[#000] w-[25vw] ${isOpen ? 'block' : 'hidden'} fixed inset-y-0 right-0 z-50`}>
        <Card height="100vh" rounded="rounded-tl-lg rounded-bl-lg">
          <div className="flex justify-between mt-3 mb-5">
            <div className="font-bold mx-2">
              Referral History
            </div>
            <div className="cursor-pointer mx-2" onClick={() => setIsOpen(false)}><TimesIconRed /></div>
          </div>
          {
            referralHistory && referralHistory.length > 0 &&
            <div className="flex flex-col gap-3 overflow-y-scroll h-[90%]">
              {referralHistory && referralHistory.length > 0 &&
              referralHistory.map((ref: any) => (
                <div className="flex mt-2 mb-2 mx-3 p-4 bg-[#F6F6F6] rounded-lg">
                  <div className="mx-3">
                    <Avatar imageUrl={ref.profile_image} fallBack={ref.full_name[0].toUpperCase()} size="sm" />
                  </div>
                  <div className="mx-3">
                    <p className="mt-1 mb-1">{capitalizeAllFirstLetters(ref.full_name)}</p>
                    <p className="mt-1 mb-1">Onboarding step: {ref.onboarding_step}</p>
                    {
                      ref.is_onboarding_complete &&
                      <p className="mt-1 mb-1 text-xs text-[#9A9A9A]">User has completed onboarding</p>
                    }
                    <p className="mt-1 mb-1 p-2 rounded-lg w-auto font-bold text-sm bg-[#FFF]">{capitalizeAllFirstLetters(ref.type)}</p>
                  </div>
                </div>
              ))}
            </div>
          } 
          

          {
            referralHistory && referralHistory.length === 0 &&
            <p>User referral list is empty</p>
          }
          {
            /*onboardedUserDataLoading ?
            <Loader /> :
            <>
              <div className="flex justify-end mt-3 mb-5">
                <div className="font-bold mx-2">
                  {userTypeText} onboarded {sideHeaderText}
                </div>
                <div className="cursor-pointer mx-2" onClick={() => setIsOpen(false)}><TimesIconRed /></div>
              </div>
              <div className="p-4 bg-[#F6F6F6] rounded-lg">
                <>
                  {onboardedUserData?.length > 0 && onboardedUserData.map((u: any) => (
                    <div className="flex mt-2 mb-2 mx-3">
                      <div className="mx-3">
                        <Avatar imageUrl={u.staff_profile_image} fallBack={u.staff_name[0].toUpperCase()} size="sm" />
                      </div>
                      <div className="mx-3">
                        <p className="mt-1 mb-1">{capitalizeAllFirstLetters(u.staff_name)}</p>
                        <p className="mt-1 mb-1 text-[#9A9A9A]">{u.no_onboarded} Drivers Onboarded</p>
                      </div>
                    </div>
                  ))}
                  {onboardedUserData?.length === 0 && 
                    <p className="justify-center">Data unavailable for this timeline</p>
                  }
                </>
              </div>
            </>*/
          }
        </Card>
      </div>
    </div>
  );
};

export default UserInfoCard;
