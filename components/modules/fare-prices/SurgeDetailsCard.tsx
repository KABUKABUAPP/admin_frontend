import React, { FC, useEffect, useState } from "react";
import FareDetailCardItem from "./FareDetailCardItem";
import Switch from "react-switch";
import { useUpdateFarePriceMutation } from "@/api-services/farePricesService";
import { toast } from "react-toastify";
import EditIcon from "@/components/icons/EditIcon";
import { useModalContext } from "@/contexts/ModalContext";
import UpdateMultiplerModal from "./UpdateMultiplierModal";

interface Props {
  surgeId: string;
  surgeCity: string;
  surgeMultiplier: string;
  createdOn: string;
  surgeDeets: any
}

const SurgeDetailsCard: FC<Props> = ({
  surgeId,
  surgeCity,
  surgeMultiplier,
  createdOn,
  surgeDeets
}) => {
  const { setModalContent } = useModalContext();
  
  return (
    <div className="bg-[#FFFFFF] p-4 w-full rounded-lg shadow-md">
      <div className="flex justify-between gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
        <p className="text-sm text-[#000000] font-semibold">{surgeId}</p>
        <div className="text-lg font-bold">
          <div className="w-auto cursor-pointer flex justify-end" onClick={() => {setModalContent(<UpdateMultiplerModal surgeMultiplier={surgeMultiplier} surgeDeets={surgeDeets} />)}}>
            <EditIcon />
          </div>
        </div>
      </div>
      <FareDetailCardItem title="City" body={surgeCity}/>
      <FareDetailCardItem title="Surge Multiplier" body={surgeMultiplier}/>
      <FareDetailCardItem title={`Created on: ${createdOn}`}/>
    </div>
  );
};

export default SurgeDetailsCard;
