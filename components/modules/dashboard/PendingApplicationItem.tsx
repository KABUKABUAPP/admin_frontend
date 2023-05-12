import React, { FC } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import { PendingApplication } from "@/models/PendingApplication";
import Skeleton from "react-loading-skeleton";
import Avatar from "@/components/common/Avatar";

const PendingApplicationItem: FC<PendingApplication> = ({
  fullName,
  location,
  image,
}) => {
  return (
    <div className="flex items-center gap-2 w-full py-3 px-2">
      
        {fullName ? (
          <Avatar imageUrl={image} fallBack={fullName[0]} shape="square" size="sm"/>
        ) : (
          <Skeleton className="h-[30px]" />
        )}
      
      <div className="flex-1">
        <p className="text-xs font-bold mb-1">{fullName || <Skeleton />}</p>
        <p className="text-xs">{location || <Skeleton />}</p>
      </div>
      <div>
        {fullName ? <Button title="View" size="small" /> : <Skeleton />}
      </div>
    </div>
  );
};

export default PendingApplicationItem;
