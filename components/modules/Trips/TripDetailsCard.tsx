import React, { FC } from "react";
import TripDetailItem from "./TripDetailItem";
import { TripDetail } from "@/models/Trips";

interface Props {
  cardSubTitle: string;
  data?: TripDetail[];
}

const TripDetailsCard: FC<Props> = ({ cardSubTitle, data }) => {
  return (
    <div className="bg-[#FFFFFF] rounded-lg w-full p-3">
      <p className="font-bold text-sm mb-4">Trip details</p>
      <p className="font-bold text-sm mb-4">{cardSubTitle}</p>
      <div className="flex flex-col w-full gap-6">
        {data?.map((item, idx) => {
          return (
            <TripDetailItem
              {...item}
              key={idx}
              isLastItem={idx === data.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TripDetailsCard;
