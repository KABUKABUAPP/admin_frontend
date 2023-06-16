import React, { FC } from "react";

interface Props {
  navItems: { title: string; isActive: boolean }[];
  handleCick: (title: string)=>void
}

const SettingsNav: FC<Props> = ({ navItems, handleCick }) => {
  return (
    <div className="bg-[#FFFFFF] rounded-lg w-full p-6 pl-0 h-full">
      {navItems.map((item) => {
        return (
          <div
            className={`${
              item.isActive ? "border-l-8 border-l-[#FFBF00]" : ""
            } py-4 pl-3 border-l-8 border-transparent`}
            onClick={()=>handleCick(item.title)}
          >
            <p className="cursor-pointer">{item.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SettingsNav;
