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
      className="flex items-center cursor-pointer gap-1 mt-4 relative"
      onClick={handleClick}
    >
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt="Kabukabu user image"
            fill
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
        <p className="mb-2 font-bold">
          {firstName} {lastNameInitial}.
        </p>
        <p className="text-xs">{role}</p>
      </div>
      <div className="flex items-center justify-center">
        <ArrowDown />
      </div>
    </div>
  );
};

export default UserAvatarBox;
