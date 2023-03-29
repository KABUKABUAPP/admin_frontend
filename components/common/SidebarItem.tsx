import React, { FC, useRef } from "react";
import { useRouter } from "next/router";

import { SidebarLink } from "@/models/SidebarLink";
import useRipple from "@/hooks/useRipple";

const SidebarItem: FC<SidebarLink> = ({ icon, title, isActive, link }) => {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const ripples = useRipple(ref, "contained");

  const bgColorBasedOnTitle: {
    [key: string]: { bg: string; color: string; icon: string };
  } = {
    SOS: { bg: "#EF2C5B", color: "#FFFFFF", icon: "#FFFFFF" },
  };

  return (
    <div
      ref={ref}
      onClick={() => router.push(link)}
      className={`
    w-full flex gap-1 items-center cursor-pointer 
    border-transparent ${isActive ? "shadow-md" : ""}
    p-2 py-3 rounded-lg
    `}
      style={{
        backgroundColor: isActive
          ? title in bgColorBasedOnTitle
            ? bgColorBasedOnTitle[title].bg
            : "#FFBF00"
          : "",
      }}
    >
      {ripples}
      <div
        style={{
          color: isActive
            ? title in bgColorBasedOnTitle
              ? bgColorBasedOnTitle[title].icon
              : "#000000"
            : "#9A9A9A",
        }}
      >
        {icon}
      </div>
      <p
        className={`text-xs font-medium`}
        style={{
          color: isActive
            ? title in bgColorBasedOnTitle
              ? bgColorBasedOnTitle[title].color
              : "#000000"
            : "#9A9A9A",
        }}
      >
        {title}
      </p>
    </div>
  );
};

export default SidebarItem;
