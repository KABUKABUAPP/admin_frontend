import React, { FC } from "react";
import OriginIcon from "@/components/icons/OriginIcon";
import DestinationIcon from "@/components/icons/DestinationIcon";

interface Props {
  origin: string;
  destination: string;
}

const OriginDestinationCell: FC<Props> = ({ origin, destination }) => {
  return (
    <div className="pr-16 max-md:pr-8 max-sm:pr-0">
      <div className="flex items-center gap-2 pb-4 border-b border-b-[#E6E6E6]">
        <div>
          <OriginIcon />
        </div>
        <div>
          <p className="text-xs text-[#9A9A9A] mb-2">Origin</p>
          <p className="text-xs font-bold">{origin}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4">
        <div>
          <DestinationIcon />
        </div>
        <div>
          <p className="text-xs text-[#9A9A9A] mb-2">Destination</p>
          <p className="text-xs font-bold">{destination}</p>
        </div>
      </div>
    </div>
  );
};

export default OriginDestinationCell;
