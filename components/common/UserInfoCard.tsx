import React, { FC, useEffect, useState } from "react";
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
import { useModalContext } from "@/contexts/ModalContext";
import TextField from "../ui/Input/TextField/TextField";
import {
  useGetNigerianCityByStateQuery,
  useGetNigerianStatesQuery,
} from "@/api-services/geoLocationService";
import SelectField from "../ui/Input/SelectField";
import Button from "../ui/Button/Button";
import { useUpdateDriverDetailsMutation, useViewDriverQuery } from "@/api-services/driversService";

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
  approveDeclineDate?: any;
  approvalStatus?: any;
  city?: string;
  state?: string;
  showEdit?: boolean;
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

const EditBasicDriverDetails = () => {
  const router = useRouter();
  const { setModalContent } = useModalContext();
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [houseAddress, setHouseAddress] = useState('');
  const [selectedStateId, setSelectedStateId] = useState<string>("");
  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [selectedStateLabel, setSelectedStateLabel] = useState<string>("");
  const [selectedCityLabel, setSelectedCityLabel] = useState<string>("");
  
  const [updateDetails, { error, isLoading, isSuccess }] = useUpdateDriverDetailsMutation();
  
  const { id } = router.query;

  const { data: driverData, isLoading: driverLoading, isError: driverError, refetch: driverRefetch } = useViewDriverQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const {
    data: states,
    isLoading: statesLoading,
    error: statesError,
    refetch: refetchStates,
  } = useGetNigerianStatesQuery(null);

  const {
    data: cities,
    isLoading: citiesLoading,
    error: citiesError,
    refetch: refetchCities,
  } = useGetNigerianCityByStateQuery(
    { id: selectedStateId },
    { refetchOnMountOrArgChange: true }
  );

  const handleUpdateSubmit = () => {
    const updateData = {
      fullName,
      emailAddress,
      houseAddress,
      selectedCityLabel,
      selectedStateLabel
    }

    var data = new FormData();
    data.append('full_name', fullName);
    data.append('email', emailAddress);
    data.append('house_address', houseAddress);
    data.append('city', selectedCityLabel);
    data.append('state', selectedStateLabel);
    updateDetails({driverId: String(id), body: data});
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Successfully updated');
      window.location.reload();
    }
  }, [isSuccess]);

  
  useEffect(() => {
    if (error) toast.error('Error encountered');
  }, [error])

  useEffect(() => {
    if (driverData) {
      setFullName(driverData?.driverInfo?.fullName);
      setEmailAddress(driverData?.driverInfo?.email);
      setHouseAddress(driverData?.driverInfo?.address);

      const theCity = cities?.find((city) => {
        return city.label === driverData?.driverInfo?.city
      });
      if (theCity) setSelectedCityId(`${theCity?.value}`)
      
      const theState = states?.find((state) => {
        return state.label === driverData?.driverInfo?.state
      });
      if (theState) setSelectedStateId(`${theState?.value}`)
    }
  }, [driverData])

  useEffect(() => {
    if (driverData && states && cities) {

      const theCity = cities?.find((city) => {
        return city.label === capitalizeAllFirstLetters(driverData?.driverInfo?.city)
      });
      if (theCity) setSelectedCityId(`${theCity?.value}`)
    }
  }, [driverData, states, cities])

  return (
    <div className="mx-auto w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%]">
      <Card bg="#FFF">
        <div className="flex justify-end">
          <div className="w-auto cursor-pointer" onClick={() => {
            setModalContent(null)
          }}>
            <TimesIconRed />
          </div>
        </div>
        <div className="text-center">
          <p className="font-semibold">Update Basic Details</p>
        </div>
          <div className="flex flex-col gap-3">
              <TextField
                label="Full Name"
                placeholder="Enter Full Name"
                onChange={(e) =>
                    setFullName(e.target.value)
                }
                value={fullName}
              />

              <TextField
                label="Email Address"
                placeholder="Enter Email Address"
                onChange={(e) =>
                    setEmailAddress(e.target.value)
                }
                value={emailAddress}
              />

              <TextField
                label="House Address"
                placeholder="Enter House Address"
                onChange={(e) =>
                    setHouseAddress(e.target.value)
                }
                value={houseAddress}
              />
              
              <div className="flex justify-between gap-3 max-sm:flex-col">
                <SelectField
                  options={cities ? cities : []}
                  disabled={false}
                  label="City"
                  placeholder="City here"
                  className="w-full"
                  onChange={(e) => {
                    setSelectedCityId(e.target.value);
                    const theCity = cities?.find((city) => {
                      return city.value === e.target.value
                    });
                    if (theCity) setSelectedCityLabel(theCity.label);
                  }}
                  value={selectedCityId}
                />
                <SelectField
                  options={states ? states : []}
                  disabled={!states?.length}
                  label="State"
                  placeholder="Lagos State"
                  className="w-full"
                  onChange={(e) => {
                    setSelectedStateId(e.target.value);
                    const theState = states?.find((state) => {
                      return state.value === e.target.value
                    });
                    if (theState) setSelectedStateLabel(theState.label);
                  }}
                  value={selectedStateId}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  title="Save Changes"
                  className="!text-[16px] mt-6"
                  size="large"
                  type="submit"
                  disabled={isLoading}
                  loading={isLoading}
                  onClick={handleUpdateSubmit}
                />
              </div>
          </div>
      </Card>
    </div>
  )
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
  totalReferredRiders,
  approveDeclineDate,
  approvalStatus,
  city,
  state,
  showEdit
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const showCarsProcessed = router.pathname.includes("inspector");
  const showTripCount = !router.pathname.includes("inspector");
  const showDeclineCount = router.pathname.includes("pending");
  const showDeclineReason = router.pathname.includes("pending") && (declineCount ? declineCount > 0 : false);
  const showCarCount = router.pathname === "/car-owners/[id]";
  const isDeleted = router.pathname.includes("deleted") || router.query.deleted == "true";

  const deletionReason = router.query.deletion_reason;

  const { setModalContent } = useModalContext();

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
            {address && <p className="text-lg font-semibold">{`${capitalizeAllFirstLetters(address)}, ${capitalizeAllFirstLetters(city)}, ${capitalizeAllFirstLetters(state)}`}</p>}
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

            {approvalStatus === 'active' && (
              <p className="text-sm font-semibold">
                Approval Date: {new Date(approveDeclineDate).toLocaleString()}
              </p>
            )}

            {approvalStatus === 'declined' && (
              <p className="text-sm font-semibold">
                Decline Date: {new Date(approveDeclineDate).toLocaleString()}
              </p>
            )}

            {isDeleted && (
              <div>
                <p className="text-[#9A9A9A]">Deleted user</p>
                <p className="text-[#9A9A9A]">[{deletionReason}]</p>
              </div>
            )}
          </div>
          {
            showEdit &&
            <div className="w-auto">
              <p className="bg-[#FFF5D8] py-1 px-4 rounded-md cursor-pointer" onClick={() => {
                setModalContent(
                  <EditBasicDriverDetails />
                )
              }}>Edit</p>
            </div>
          }
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
