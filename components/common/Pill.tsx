import React, { FC } from "react";

interface Props {
  title: string;
  bg?: string;
}

const Pill: FC<Props> = ({ title, bg }) => {
  return (
    <div style={{ backgroundColor: bg ? bg : "#D4D4D4" }} className="w-fit p-2 rounded-md">
      <p className="text-[#000000] text-xs font-bold">{title}</p>
    </div>
  );
};

export default Pill;
