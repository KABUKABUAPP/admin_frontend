import React, { FC, useRef } from "react";
import { useRouter } from "next/router";

import { SidebarLink } from "@/models/SidebarLink";
import useRipple from "@/hooks/useRipple";

const SidebarItem: FC<SidebarLink> = ({ icon, title, isActive, link }) => {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const ripples = useRipple(ref, "contained");

  return (
    <div
      ref={ref}
      onClick={() => router.push(link)}
      className={`
    w-full flex gap-3 items-center cursor-pointer
    rounded-xl px-4 py-3 transition-colors duration-150
    ${isActive ? "" : "hover:bg-[#E9ECF1]"}
    `}
      style={{
        backgroundColor: isActive ? "#FFFFFF" : "transparent",
      }}
    >
      {ripples}
      <div
        className="flex items-center justify-center w-5 h-5"
        style={{
          color: isActive ? "#1A1A1A" : "#9AA0AA",
        }}
      >
        {icon}
      </div>
      <p
        className="text-[15px] font-medium leading-[20px]"
        style={{
          color: isActive ? "#1A1A1A" : "#8C929C",
        }}
      >
        {title}
      </p>
    </div>
  );
};

export default SidebarItem;
