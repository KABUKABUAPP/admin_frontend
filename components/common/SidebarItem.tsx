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
    w-full flex gap-2 items-center cursor-pointer 
    border-transparent ${isActive ? "bg-[#FFBF00]" : ""}
    p-2 rounded-lg mb-2
    `}
    >
      {ripples}
      <div style={{ color: isActive ? "#161616" : "#9A9A9A" }}>{icon}</div>
      <p
        className={`text-xs font-medium ${
          isActive ? "text-[#000]" : "text-[#9A9A9A]"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

export default SidebarItem;
