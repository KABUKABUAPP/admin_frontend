import React, { FC } from "react";

interface Props {
    handleCloseFeed: ()=>void
}

const ViewFeed: FC<Props> = ({ handleCloseFeed }) => {
  return (
    <div className="w-full bg-[#FFFFFF] p-6 mb-5 h-[400px] rounded-lg">
      <p className="text-center relative text-xs">
        View Feed
        <span onClick={handleCloseFeed} className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer flex items-center gap-2">
          <span className="text-2xl">&times;</span>
          Close Feed
        </span>
      </p>
    </div>
  );
};

export default ViewFeed;
