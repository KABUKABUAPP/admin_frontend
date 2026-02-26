import React, { FC } from "react";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  destination: string;
}

const DestinationCell: FC<Props> = ({ destination }) => {
  return (
    <p className="text-xs font-bold text-center">{capitalizeAllFirstLetters(destination)}</p>
  );
};

export default DestinationCell;
