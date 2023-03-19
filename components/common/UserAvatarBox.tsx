import Image from "next/image";
import React, { FC, useState } from "react";

import ArrowDown from "../icons/ArrowDown";
import Button from "../ui/Button/Button";
import useClickOutside from "@/hooks/useClickOutside";

interface Props {
  image: string;
  firstName: string;
  lastName: string;
  role: string;
  userId: string;
  handleClick?: ()=>any
}

const UserAvatarBox: FC<Props> = ({
  image,
  firstName,
  lastName,
  role,
  handleClick,
  userId,
}) => {

  return (
    <div
      className="flex items-center cursor-pointer gap-1 mt-4 relative"
      onClick={handleClick}
    >
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <Image
          src={image}
          alt="Kabukabu user image"
          fill
          style={{ objectFit: "cover", objectPosition: "50% 50%" }}
        />
      </div>
      <div className="flex-1">
        <p className="mb-2 font-bold">
          {firstName} {lastName[0]}.
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
