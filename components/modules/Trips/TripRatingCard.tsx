import React, { FC } from "react";
import Rating from "react-star-ratings";

import Card from "@/components/common/Card";

interface Props {
  rating: number;
  comment: string;
}

const TripRatingCard: FC<Props> = ({ rating, comment }) => {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center gap-4 p-2">
        <p className="font-bold text-xs text-center">Trip Ratings</p>
        <div className="pb-3 border-b border-b-[#E6E6E6] w-full flex justify-center">
          <Rating
            rating={rating}
            starDimension="15px"
            starSpacing="1px"
            starRatedColor="#1FD11B"
            numberOfStars={5}
          />
        </div>
        <p className="text-xs text-center font-bold">
          {comment}
        </p>
      </div>
    </Card>
  );
};

export default TripRatingCard;
