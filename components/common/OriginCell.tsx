import React, { FC } from "react";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  origin: string;
}

const OriginCell: FC<Props> = ({ origin }) => {
  return (
    <p className="text-xs font-bold">{capitalizeAllFirstLetters(origin)}</p>
  );
};

export default OriginCell;
