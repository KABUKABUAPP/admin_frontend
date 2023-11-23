import React, { FC, PropsWithChildren } from "react";

interface Props {
  maxWidth?: string;
  maxHeight?: string;
  height?: string;
  elevation?: boolean;
  bg?: string;
  rounded?: string;
}

const Card: FC<PropsWithChildren<Props>> = ({
  maxWidth = "",
  maxHeight="",
  height = "",
  bg='#FFFFFF',
  elevation,
  children,
  rounded
}) => {
  return (
    <div
      className={`${rounded ? rounded : 'rounded-lg'} w-full p-4 ${elevation ? 'shadow-md' : ''} ${maxHeight ? 'overflow-y-auto scrollbar-none':''} transition-all ease-in-out duration-500`}
      style={{ maxWidth, height, maxHeight, backgroundColor: bg }}
    >
      {children}
    </div>
  );
};

export default Card;
