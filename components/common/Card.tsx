import React, { FC, PropsWithChildren } from "react";

interface Props {
  maxWidth?: string;
  maxHeight?: string;
  height?: string;
  elevation?: boolean;
}

const Card: FC<PropsWithChildren<Props>> = ({
  maxWidth = "",
  maxHeight="",
  height = "",
  elevation,
  children,
}) => {
  return (
    <div
      className={`bg-[#FFFFFF] rounded-lg w-full p-4 ${elevation ? 'shadow-md' : ''} ${maxHeight ? 'overflow-y-auto scrollbar-none':''}`}
      style={{ maxWidth, height, maxHeight }}
    >
      {children}
    </div>
  );
};

export default Card;
