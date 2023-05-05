import React, { FC } from "react";
import FareDetailCardItem from "./FareDetailCardItem";

interface Props {
  fareId: string;
  fareLocation: string;
  totalFares: string;
  totalTripsInState: string;
  createdOn: string;
}

const FareDetailsCard: FC<Props> = ({
  fareId,
  totalFares,
  totalTripsInState,
  createdOn,
  fareLocation,
}) => {
  return (
    <div className="bg-[#FFFFFF] p-4 w-full rounded-lg shadow-md">
      <FareDetailCardItem title={fareId} body={fareLocation} />
      <FareDetailCardItem title="Total fares:" body={totalFares}/>
      <FareDetailCardItem title="Total trips in state:" body={totalTripsInState}/>
      <FareDetailCardItem title={`Created on: ${createdOn}`}/>
    </div>
  );
};

export default FareDetailsCard;
