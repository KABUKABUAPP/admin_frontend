import React, { FC } from "react";
import TripDetailItem from "./TripDetailItem";
import { TripDetail } from "@/models/Trips";

interface Props {
  cardSubTitle: string;
  data?: TripDetail[];
  variant?: "default" | "map";
  onBack?: () => void;
  isLoading?: boolean;
}

const TripDetailsCard: FC<Props> = ({
  cardSubTitle,
  data,
  variant = "default",
  onBack,
  isLoading = false,
}) => {
  const isMapVariant = variant === "map";
  return (
    <div
      className={`bg-[#FFFFFF] rounded-lg w-full p-3 ${
        isMapVariant ? "flex flex-col max-h-[75vh]" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-bold text-sm mb-2">Trip details</p>
          <p className="font-bold text-sm">{cardSubTitle}</p>
        </div>
        {isMapVariant && onBack && (
          <button
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#E5E7EB] bg-[#FDFDFD]"
            onClick={onBack}
            aria-label="Back"
          >
            <img src="/arrowLeftFromLine.svg" alt="" className="w-4 h-4" />
          </button>
        )}
      </div>
      <div
        className={`flex flex-col w-full gap-6 ${
          isMapVariant ? "flex-1 min-h-0 overflow-y-auto pr-1" : ""
        }`}
      >
        {isLoading ? (
          <p className="text-sm font-semibold">Loading trip details...</p>
        ) : (
          data?.map((item, idx) => {
            return (
              <TripDetailItem
                {...item}
                key={idx}
                isLastItem={idx === data.length - 1}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TripDetailsCard;
