import React, { FC, useState, useEffect, useRef } from "react";
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
import { useUpdateDriverDetailsMutation, useViewDriverQuery } from "@/api-services/driversService";
import { toast } from "react-toastify";
import TimesIconRed from "../icons/TimesIconRed";
import TextField from "../ui/Input/TextField/TextField";
import CarImagesCard from "@/components/common/DeleteableImagesCardEdit";
import { useGetNigerianCityByStateQuery, useGetNigerianStatesQuery } from "@/api-services/geoLocationService";
import SelectField from "../ui/Input/SelectField";

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
  reason?: string;
  showEdit?: boolean;
}

const EditBasicDriverDetails = () => {
  const router = useRouter();
  const { setModalContent } = useModalContext();
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [houseAddress, setHouseAddress] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedStateId, setSelectedStateId] = useState<string>("");
  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [selectedStateLabel, setSelectedStateLabel] = useState<string>("");
  const [selectedCityLabel, setSelectedCityLabel] = useState<string>("");
  const [imgUploaded, setImgUploaded] = useState(false);
  const [imgUrl, setImgUrl] = useState('/user.svg');
  const [imgFileAsText, setImgFileAsText] = useState<any>();
  
  const fileInputRef = useRef<any>();

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
    { skip: !selectedStateId, refetchOnMountOrArgChange: true }
  );

  const handleUpdateSubmit = () => {
    const updateData = {
      fullName,
      relationship,
      houseAddress,
      selectedCityLabel,
      selectedStateLabel,
      emailAddress,
      phoneNumber,
      imgFileAsText
    }

    console.log({updateData})

    var data = new FormData();
    
    data.append('guarantor_name', fullName);
    data.append('guarantor_relationship', relationship);
    data.append('guarantor_address', houseAddress);
    data.append('guarantor_city', selectedCityLabel);
    data.append('guarantor_state', selectedStateLabel);
    data.append('guarantor_phone_number', phoneNumber);
    data.append('guarantor_email', emailAddress);
    if (imgFileAsText) data.append('guarantor_image', imgFileAsText);
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
      console.log({driverData});
      setFullName(driverData?.guarantor?.fullname);
      setRelationship(driverData?.guarantor?.relationship);
      setHouseAddress(driverData?.guarantor?.address);

      const theCity = cities?.find((city) => {
        return city.label === driverData?.guarantor?.city
      });
      if (theCity) setSelectedCityId(`${theCity?.value}`)
      
      const theState = states?.find((state) => {
        return state.label === driverData?.guarantor?.state
      });
      if (theState) setSelectedStateId(`${theState?.value}`)

      setEmailAddress(driverData?.guarantor?.email);
      if (driverData?.guarantor?.phone && driverData?.guarantor?.phone[0] === '+') setPhoneNumber(driverData?.guarantor?.phone.substring(1));
      if (driverData?.guarantor?.image && driverData?.guarantor?.image.length > 0) {
        setImgUploaded(true);
        setImgUrl(driverData?.guarantor?.image)
      }
    }
  }, [driverData])

  function handleFileInputChange(event: any) {
    const file = event.target.files[0];

    if (!file) {
      return;
    } else {
      setImgFileAsText(file);
    }

    /*const reader = new FileReader();
    reader.onload = function(e: any) {
      const contents = e.target.result;
      setImgFileAsText(contents)
    };

    // Read the file as text
    reader.readAsText(file);
    // For binary files, you might use `reader.readAsArrayBuffer(file)` or `reader.readAsDataURL(file)` instead*/
  }

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
          <p className="font-semibold">Update Guarantor Details</p>
        </div>

        
        
        <div className="flex flex-col justify-center items-center w-24 h-24 rounded-full border-2 bg-[#FFBF00] cursor-pointer my-4" onClick={() => {
                if (fileInputRef) {
                    fileInputRef.current.click();
                }
            }}>
            {imgUploaded && <img src={imgUrl} alt="" className="justify-center items-center w-24 h-24 rounded-full" />}
            {!imgUploaded && <img src={imgUrl} alt="" />}
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => {
                    if (e.target.files) {
                        setImgUrl(URL.createObjectURL(e.target.files[0]));
                        setImgUploaded(true);
                        handleFileInputChange(e);
                    }
                }}
                
                onClick={() => {
                if (fileInputRef) {
                    fileInputRef.current.click();
                }
                }}
            />
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
              label="Relationship"
              placeholder="Enter Relationship"
              onChange={(e) =>
                  setRelationship(e.target.value)
              }
              value={relationship}
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
                disabled={!cities?.length}
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

            <TextField
              label="Email Address"
              placeholder="Enter Email Address"
              onChange={(e) =>
                  setEmailAddress(e.target.value)
              }
              value={emailAddress}
            />

            <TextField
              label="Phone Number"
              placeholder="Enter Phone Number"
              onChange={(e) =>
                  setPhoneNumber(e.target.value)
              }
              value={phoneNumber}
            />

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

const GuarantorDetailsCard: FC<Props> = ({
  image,
  isLoading,
  fullname,
  relationship,
  address,
  phone,
  responded,
  responseStatus,
  reason,
  bg = "#FFFFFF",
  showEdit
}) => {
  const router = useRouter();
  const { id } = router.query;
  const { setModalContent } = useModalContext();
  const [showGuarantorStatus, setShowGuarantorStatus] = useState<boolean>(false);
  const [isNotFetchGuarantorUpload, setIsNotFetchGuarantorUpload] =
    useState(true);
  /*const {
    data,
    isLoading: guarantorLoading,
    isError,
    refetch
  } = useViewGuarantorQuery(
    { id: String(id) },
    {
      skip: isNotFetchGuarantorUpload || !id || !responded,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );*/

  /*useEffect(()=>{
    if(isError){
      toast.error("Error Fetching guarantors Info")
    }
  },[isError])*/

  useEffect(() => {
    if (router.pathname && router.pathname.includes("pending")) {
      setShowGuarantorStatus(true);
      if (responseStatus === "pending") {
        setIsNotFetchGuarantorUpload(false);
      }
    }
  }, [router.pathname]);

  const statusBg: Record<string, string> = {
    pending: "#FFFFFF",
    declined: "#FEE2E9",
    approved: "#E3FFE2",
  };
  const isDeleted = router.pathname.includes('deleted')

  return (
    <Card bg={!showGuarantorStatus ? bg : statusBg[`${responseStatus}`]}>
      <div className="flex justify-between">
        <p className={`text-lg font-semibold ${isDeleted ? '!text-[#9A9A9A]' : ''}`}>Guarantor Details</p>
        
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
          <p className={`text-lg font-semibold ${isDeleted ? '!text-[#9A9A9A]' : ''}`}>{fullname}</p>
          <p className="text-sm text-[#9A9A9A]">{relationship}</p>
          <p className="text-sm text-[#9A9A9A]">{address}</p>
          <p className="text-sm text-[#9A9A9A]">{phone}</p>
        </div>
      </div>
      {responseStatus === "pending" && showGuarantorStatus ? 
        <>
          <div className="flex items-center gap-3 mt-3 mb-1">
            <InfoIcon />
            <p className="text-base font-semibold">Confirm Guarantor Details</p>
          </div>
          <Button
            title={"Click to view"}
            variant="text"
            onClick={() => {
              setModalContent(
                <ViewGuarantorCard
                  driverUpload={{
                    title: "Driver's",
                    address: `${address}`,
                    fullname: `${fullname}`,
                    relationship: `${relationship}`,
                    phone: `${phone}`,
                    image: `${image}`
                  }}
                  //guarantorUpload={{ ...data, title: "Guarantor's" }}
                />
              );
            }}
          />
          {/*guarantorLoading && !isError && !data && <Loader size="small" />}
          {!data && !guarantorLoading && isError && (
            <Button
              variant="text"
              title="Reload Guarantor's info"
              size="small"
              onClick={refetch}
            />
          )*/}
        </>
        : null}
      {responseStatus === "approved" && showGuarantorStatus ? (
        <div className="flex items-center gap-3 mt-3">
          <CheckIcon fill="#1FD11B" />
          <p className="text-[#1FD11B] font-semibold">Approved</p>
        </div>
      ) : null}

      {responseStatus === "declined" && showGuarantorStatus ? (
        <div className="flex items-center gap-3 mt-3">
          <TimesIcon fill="#EF2C5B" />
          <p className="text-[#EF2C5B] font-semibold">Declined [{reason}]</p>
        </div>
      ) : null}
    </Card>
  );
};

export default GuarantorDetailsCard;
