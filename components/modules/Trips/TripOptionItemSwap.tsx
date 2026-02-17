import React, { FC } from "react";

interface Props {
  title: string;
  isActive: boolean;
  keyVal: string;
  handleClick: (title: string) => void;
}

const TripOptionItemSwap: FC<Props> = ({ title, isActive, handleClick, keyVal }) => {
  return (
    <div className="px-1 max-sm:py-3">
      <p
        className={`${
          isActive ? "text-xs text-[#000] font-bold bg-[#FFF] rounded-lg" : "text-xs text-[#9A9A9A]"
        } py-1 px-2 cursor-pointer max-sm:text-center`}
        onClick={() => handleClick(keyVal)}
      >
        {title}
      </p>
    </div>
  );
};

export default TripOptionItemSwap;
