import Image from "next/image";
import React, { FC } from "react";

import ArrowDown from "../icons/ArrowDown";
import { formatFullName } from "@/utils";

interface Props {
  image: string;
  fullName: string;
  role: string;
  userId: string;
  handleClick?: () => any;
}

const UserAvatarBox: FC<Props> = ({
  image,
  fullName,
  role,
  handleClick,
  userId,
}) => {
  const { lastNameInitial, firstName } = formatFullName(fullName || "");

  return (
    <div
      className="flex items-center cursor-pointer gap-3 mt-1 relative rounded-xl border border-[#E7EAF0] bg-[#F8F9FB] px-3 py-3"
      onClick={handleClick}
    >
      <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
        {image ? (
          <Image
            src={image}
            alt="Kabukabu user image"
            layout="fill"
            style={{ objectFit: "cover", objectPosition: "50% 50%" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-full bg-slate-300">
            <p className="font-extrabold text-lg">
              {fullName && fullName[0].toLocaleUpperCase()}
            </p>
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="font-bold text-[16px] leading-[20px] text-[#1A1A1A]">
          {firstName} {lastNameInitial}.
        </p>
        <p className="text-[13px] leading-[18px] text-[#6B7280] font-medium mt-1">
          {role}
        </p>
      </div>
      <div className="flex items-center justify-center text-[#4B5563]">
        <ArrowDown />
      </div>
    </div>
  );
};

export default UserAvatarBox;
