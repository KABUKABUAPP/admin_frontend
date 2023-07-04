import React, { FC } from "react";
import Rating from "react-star-ratings";
import { TripDetail } from "@/models/Trips";

interface Props extends TripDetail {
  isLastItem: boolean;
}

const TripDetailItem: FC<Props> = ({
  isRating = false,
  isLastItem,
  ...props
}) => {
  const topRating = isRating ? Math.floor(Number(props.topValue)) : undefined
  const bottomRating = isRating ? Math.floor(Number(props.bottomValue)) : undefined

  function isValidRating  (val:any):boolean {
    return typeof val==='number' && val >=0 && val <=5
  }
  return (
    <div>
      {props.topTitle && (
        <div className="flex items-center gap-2 pb-4 border-b border-b-[#E6E6E6]">
          <>
            <div>{props.topIcon}</div>
            <div>
              <p className="text-xs text-[#9A9A9A] mb-2">{props.topTitle}</p>
              <p className="text-xs font-bold">
                {isRating && isValidRating(topRating) ? (
                  <Rating
                    rating={topRating}
                    starDimension="11px"
                    starSpacing="1px"
                    starRatedColor="#FFBF00"
                    numberOfStars={5}
                  />
                ) : (
                  props.topValue
                )}
              </p>
            </div>
          </>
        </div>
      )}

      {props.bottomTitle && (
        <div
          className={`flex items-center gap-2 pt-4 pb-4 ${
            isLastItem ? "" : "border-b border-b-[#E6E6E6]"
          }`}
        >
          <div>{props.bottomIcon}</div>
          <div className="">
            <p className="text-xs text-[#9A9A9A] mb-2">{props.bottomTitle}</p>
            <p className="text-xs font-bold">
              {" "}
              {isRating && isValidRating(bottomRating) ? (
                <Rating
                  rating={bottomRating}
                  starDimension="11px"
                  starSpacing="1px"
                  starRatedColor="#FFBF00"
                  numberOfStars={5}
                />
              ) : (
                props.bottomValue
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetailItem;
