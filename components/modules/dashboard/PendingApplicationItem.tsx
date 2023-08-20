import React, { FC } from "react";
import Link from "next/link";

import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import { PendingApplication } from "@/models/PendingApplication";
import Skeleton from "react-loading-skeleton";
import Avatar from "@/components/common/Avatar";
import { capitalizeAllFirstLetters } from "@/utils";

const PendingApplicationItem: FC<PendingApplication> = ({
  fullName,
  location,
  image,
  id,
  route
}) => {
  return (
    <Link href={`${route}/${id}`}>
      <div className="flex items-center gap-2 w-full py-3 px-2">
        {fullName ? (
          <Avatar
            imageUrl={image}
            fallBack={fullName[0]}
            shape="square"
            size="sm"
          />
        ) : (
          <Skeleton className="h-[30px]" />
        )}

        <div className="flex-1">
          <p className="text-xs font-bold mb-1">{capitalizeAllFirstLetters(fullName) || <Skeleton />}</p>
          <p className="text-xs">{capitalizeAllFirstLetters(location) || <Skeleton />}</p>
        </div>
        <div>
          {fullName ? <Button title="View" size="small" /> : <Skeleton />}
        </div>
      </div>
    </Link>
  );
};

export default PendingApplicationItem;
