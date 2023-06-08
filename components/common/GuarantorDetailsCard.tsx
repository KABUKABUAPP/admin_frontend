import React, { FC } from "react";

import Card from "@/components/common/Card";
import Avatar from "@/components/common/Avatar";
import Skeleton from "react-loading-skeleton";

interface Props {
  image?: string;
  fullname?: string;
  relationship?: string;
  address?: string;
  phone?: string;
  isLoading?: boolean;
  bg?: string;
}

const GuarantorDetailsCard: FC<Props> = ({
  image,
  isLoading,
  fullname,
  relationship,
  address,
  phone,
  bg="#FFFFFF"
}) => {
  return (
    <Card bg={bg}>
      <p className="text-lg font-semibold">Guarantor Details</p>
      <div className="flex gap-2 mt-2">
        <div>
          <div className="w-[80px] h-[80px]">
            {fullname ? (
              <Avatar imageUrl={image} fallBack={fullname[0]} size="md" />
            ) : (
              <Skeleton
                enableAnimation={isLoading}
                className="w-[80px] h-[80px] pt-2"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">{fullname}</p>
          <p className="text-sm text-[#9A9A9A]">{relationship}</p>
          <p className="text-sm text-[#9A9A9A]">{address}</p>
          <p className="text-sm text-[#9A9A9A]">{phone}</p>
        </div>
      </div>
    </Card>
  );
};

export default GuarantorDetailsCard;
