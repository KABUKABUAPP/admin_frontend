import React, { FC } from "react";
import Rating from "react-star-ratings";
import { TripDetail } from "@/models/Trips";

interface Props extends TripDetail {
  isLastItem: boolean
}

const TripDetailItem: FC<Props> = ({ isRating = false, isLastItem, ...props }) => {
  return (
    <div>
      <div className="flex items-center gap-2 pb-4 border-b border-b-[#E6E6E6]">
        <div>{props.topIcon}</div>
        <div>
          <p className="text-xs text-[#9A9A9A] mb-2">{props.topTitle}</p>
          <p className="text-xs font-bold">
            {isRating ? (
              <Rating
                rating={Number(props.topValue)}
                starDimension="11px"
                starSpacing="1px"
                starRatedColor="#FFBF00"
              />
            ) : (
              props.topValue
            )}
          </p>
        </div>
      </div>

      <div className={`flex items-center gap-2 pt-4 pb-4 ${isLastItem ? '' : 'border-b border-b-[#E6E6E6]'}`}>
        <div>{props.bottomIcon}</div>
        <div className="">
          <p className="text-xs text-[#9A9A9A] mb-2">{props.bottomTitle}</p>
          <p className="text-xs font-bold">
            {" "}
            {isRating ? (
              <Rating
                rating={Number(props.bottomValue)}
                starDimension="11px"
                starSpacing="1px"
                starRatedColor="#FFBF00"
              />
            ) : (
              props.bottomValue
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripDetailItem;
