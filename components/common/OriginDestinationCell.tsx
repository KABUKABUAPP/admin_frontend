import React, { FC } from "react";
import OriginIcon from "@/components/icons/OriginIcon";
import DestinationIcon from "@/components/icons/DestinationIcon";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  destination: string;
  origin: string;
}

const OriginDestinationCell: FC<Props> = ({ destination, origin }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div>
          <p className="text-xs font-bold">{capitalizeAllFirstLetters(origin)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <p className="text-xs text-[#667085]">{(capitalizeAllFirstLetters(destination))}</p>
        </div>
      </div>
    </div>
  );
};

export default OriginDestinationCell;
