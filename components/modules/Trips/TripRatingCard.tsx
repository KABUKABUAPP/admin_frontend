import React, { FC } from "react";
import Rating from "react-star-ratings";

import Card from "@/components/common/Card";

interface Props {
  rating?: number;
  comment?: string;
  title?: string;
}

const TripRatingCard: FC<Props> = ({ rating, comment, title = "Trip Ratings" }) => {
  const parsedRating = Number(rating);
  const ratingValue = Number.isFinite(parsedRating)
    ? Math.max(0, Math.min(5, parsedRating))
    : undefined;
  function isValidRating(val: any): boolean {
    return typeof val === "number" && val >= 0 && val <= 5;
  }
  return (
    <Card>
      <div className="flex flex-col items-center justify-center gap-4 p-2">
        <p className="font-bold text-xs text-center">{title}</p>
        {ratingValue !== undefined && isValidRating(ratingValue) && (
          <div className="pb-3 border-b border-b-[#E6E6E6] w-full flex justify-center">
            <Rating
              rating={ratingValue}
              starDimension="15px"
              starSpacing="1px"
              starRatedColor="#1FD11B"
              numberOfStars={5}
            />
          </div>
        )}
        {comment && <p className="text-xs text-center font-bold">{comment}</p>}
      </div>
    </Card>
  );
};

export default TripRatingCard;
