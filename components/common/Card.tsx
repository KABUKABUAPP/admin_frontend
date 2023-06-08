import React, { FC, PropsWithChildren } from "react";

interface Props {
  maxWidth?: string;
  maxHeight?: string;
  height?: string;
  elevation?: boolean;
  bg?: string
}

const Card: FC<PropsWithChildren<Props>> = ({
  maxWidth = "",
  maxHeight="",
  height = "",
  bg='#FFFFFF',
  elevation,
  children,
}) => {
  return (
    <div
      className={`rounded-lg w-full p-4 ${elevation ? 'shadow-md' : ''} ${maxHeight ? 'overflow-y-auto scrollbar-none':''}`}
      style={{ maxWidth, height, maxHeight, backgroundColor: bg }}
    >
      {children}
    </div>
  );
};

export default Card;
