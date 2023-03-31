import React, { FC } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import { PendingApplication } from "@/models/PendingApplication";

const PendingApplicationItem: FC<PendingApplication> = ({ fullName, location, image }) => {
  return (
    <div className="flex items-center gap-2 w-full py-3 px-2">
      <div className="relative w-9 h-9 rounded-lg overflow-hidden">
        <Image
          src={image}
          layout="fill"
          style={{ objectFit: "contain", objectPosition: "50% 50%" }}
          alt="Kabukabu driver"
        />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold mb-1">{fullName}</p>
        <p className="text-xs">{location}</p>
      </div>
      <div>
        <Button title="View" size="small" />
      </div>
    </div>
  );
};

export default PendingApplicationItem;
