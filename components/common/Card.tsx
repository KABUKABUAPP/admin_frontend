import React, { FC, PropsWithChildren } from "react";

interface Props {
  maxWidth?: string;
  height?: string;
}

const Card: FC<PropsWithChildren<Props>> = ({ maxWidth = "", height = "", children }) => {
  return (
    <div
      className="bg-[#FFFFFF] rounded-lg w-full p-4"
      style={{ maxWidth, height }}
    >
      {children}
    </div>
  );
};

export default Card;
