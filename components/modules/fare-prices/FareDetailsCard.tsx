import React, { FC, useEffect, useState } from "react";
import FareDetailCardItem from "./FareDetailCardItem";
import Switch from "react-switch";
import { useUpdateFarePriceMutation } from "@/api-services/farePricesService";
import { toast } from "react-toastify";

interface Props {
  fareId: string;
  fareLocation: string;
  totalFares: string;
  totalTripsInState: string;
  createdOn: string;
  active: boolean;
}

const FareDetailsCard: FC<Props> = ({
  fareId,
  totalFares,
  totalTripsInState,
  createdOn,
  fareLocation,
  active
}) => {
  const [settingActive, setSettingActive] = useState<boolean>(active);
  
  const [updateFare, { isLoading, isSuccess, error }] = useUpdateFarePriceMutation();

  const handleFarePriceUpdate = () => {
    let payload: any = {
      is_active: !settingActive
    }
    console.log(settingActive, fareId, payload)

    updateFare({ payload, id: String(fareId) });
    setSettingActive(!settingActive)
  }

  useEffect(() => {
    if (error && "data" in error) {
      const { message }: any = error.data;
      toast.error(message);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Active status updated succesfully");
    }
  }, [isSuccess]);
  
  return (
    <div className="bg-[#FFFFFF] p-4 w-full rounded-lg shadow-md">
      <div className="flex justify-start gap-3 max-sm:flex-col border-b border-b-[#E6E6E6] last:border-none py-4">
          Active <Switch onChange={() => {
              handleFarePriceUpdate()
          }} checked={settingActive} />
      </div>
      <FareDetailCardItem title={fareId} body={fareLocation} />
      {/* <FareDetailCardItem title="Total fares:" body={totalFares}/> */}
      <FareDetailCardItem title="Total trips in state:" body={totalTripsInState}/>
      <FareDetailCardItem title={`Created on: ${createdOn}`}/>
    </div>
  );
};

export default FareDetailsCard;
