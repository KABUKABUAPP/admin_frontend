import Avatar from "@/components/common/Avatar";
import { capitalizeAllFirstLetters } from "@/utils";
import React, { FC } from "react";

interface Props {
  title: string;
  fullname: string;
  relationship: string;
  address: string;
  phone: string;
  image: string
}

const UploadDetailsCard: FC<Props> = (props) => {
  return (
    <div className="bg-[#F8F8F8] border border-[#E6E6E6] rounded-lg flex flex-col gap-6 w-full p-4">
      <p className="text-base font-bold">{props.title} Upload</p>
      <div className="flex gap-4">
        <div>
          <Avatar fallBack={props.fullname[0]} imageUrl={props.image} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-bold">{capitalizeAllFirstLetters(props.fullname)}</p>
          <p className="text-xs text-[#9A9A9A]">{props.relationship}</p>
          <p className="text-xs text-[#9A9A9A]">{props.address}</p>
          <p className="text-xs text-[#9A9A9A]">{props.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default UploadDetailsCard;
