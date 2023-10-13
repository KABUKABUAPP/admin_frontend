import React, { FC } from "react";

interface Props {
  title?: string;
  body?: string;
}

const FarePriceItem: FC<Props> = ({ title, body }) => {
  return (
    <div className="bg-[#F1F1F1] rounded-lg w-full p-4 flex justify-between items-center">
      <p className="text-lg">{title}</p>
      <p className="text-lg">{body}</p>
    </div>
  );
};

export default FarePriceItem;
