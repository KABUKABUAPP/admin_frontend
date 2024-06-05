import React, { FC, useEffect } from "react";
import Link from "next/link";

import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import { PendingApplication } from "@/models/PendingApplication";
import Skeleton from "react-loading-skeleton";
import Avatar from "@/components/common/Avatar";
import { capitalizeAllFirstLetters } from "@/utils";
import OnboardDriversTable from "./OnboardDriversTable";
import { useModalContext } from "@/contexts/ModalContext";
import TimesIconRed from "@/components/icons/TimesIconRed";
import { useViewDriverQuery } from "@/api-services/driversService";
import Loader from "@/components/ui/Loader/Loader";
import DriverInfoCard from "./UserInfoCampaign";
import CarDetailsCard from "./CarDetailsCampaign";

const ViewOnboarded:FC<{id: string;}> = ({id}) => {
  const { setModalContent } = useModalContext();

  const { data, isLoading, isError, refetch } = useViewDriverQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  useEffect(() => {
    if (data) console.log({dataDriverInfo: data?.carDetails})
  }, [data])

  return (
    <div className="z-20 rounded-md mx-auto w-[80%] sm:w-[50%] md:w-[40%] bg-[#FFF] flex flex-col p-4">
      <div className="flex justify-end">
        <div className="cursor-pointer" onClick={() => setModalContent(null)}>
          <TimesIconRed />
        </div>
      </div>

      {
        isLoading ? 
        <Loader /> :
        <>
          {data?.driverInfo &&
          <div className="bg-[#F8F8F8] rounded-md my-2">
            <DriverInfoCard referral_code={""} {...data?.driverInfo} />
          </div>}

          {data?.carDetails &&
          <div className="bg-[#F8F8F8] rounded-md my-2">
            <CarDetailsCard {...data?.carDetails} />
          </div>}
        </>
      }
    </div>
  )
}

const OnboardDriversTableCell: FC<{fullName: string; type: string; image: string; id: string;}> = ({
  fullName,
  type,
  image,
  id
}) => {
  const { setModalContent } = useModalContext();

  return (
    <Link href={`#`}>
      <div className="flex items-center gap-2 w-full py-3 px-2">
        {fullName ? (
          <Avatar
            imageUrl={image}
            fallBack={fullName[0]}
            shape="square"
            size="sm"
          />
        ) : (
          <Skeleton className="h-[30px]" />
        )}

        <div className="flex-1">
          <p className="text-xs font-bold mb-1">{capitalizeAllFirstLetters(fullName) || <Skeleton />}</p>
          <p className="text-xs">{capitalizeAllFirstLetters(type) || <Skeleton />}</p>
        </div>
        <div>
          {fullName ? <Button title="View" size="small" onClick={() => {
            setModalContent(
              <ViewOnboarded id={id} />
            )
          }} /> : <Skeleton />}
        </div>
      </div>
    </Link>
  );
};

export default OnboardDriversTableCell;
