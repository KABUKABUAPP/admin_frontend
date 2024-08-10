import React, { FC } from "react";

interface Props {
  title: string;
  isActive: boolean;
  keyVal: string
  handleClick: (title: string) => void;
}

const OptionBarItem: FC<Props> = ({ title, isActive, handleClick, keyVal }) => {
  return (
    <div style={{flex: 1}} className="border-r border-r-[#E6E6E6] px-3 max-md:px-6 max-sm:border-r-0 max-sm:py-3 max-sm:border-b last:border-r-0">
      <p
        className={`${
          isActive ? "text-sm text-[#000] font-bold" : "text-xs text-[#9A9A9A]"
        } cursor-pointer max-sm:text-center text-center`}
        onClick={() => handleClick(keyVal)}
      >
        {title}
      </p>
    </div>
  );
};

export default OptionBarItem;
