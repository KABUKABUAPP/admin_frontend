import React, { FC, PropsWithChildren, useState, useEffect } from "react";
import { useRouter } from "next/router";
import SideBar from "@/components/common/SideBar";
import sidebarNavLinks from "@/navigation/sidebarNavLinks";
import Container from "@/components/common/Container";
import { SidebarLink } from "@/models/SidebarLink";
import Transition from "@/components/common/Transition";

interface Props {
  padding?: string;
}

const AppLayout: FC<PropsWithChildren<Props>> = ({
  children,
  padding = "2.5rem 1rem 1rem 1rem",
}) => {
  const router = useRouter();

  const getActiveSideNavLink = (
    sidebarItems: SidebarLink[],
    pathname: string
  ) => {
    let mutatedSidebarItems: SidebarLink[] = [];

    if (pathname === "/") {
      mutatedSidebarItems = sidebarItems.map((item) => {
        if (item.title === "Dashboard") return { ...item, isActive: true };
        return item;
      });
    } else {
      mutatedSidebarItems = sidebarItems.map((item) => {
        if (pathname.includes(item.link) && item.title !== "Dashboard") {
          return { ...item, isActive: true };
        }
        return { ...item, isActive: false };
      });
    }

    return mutatedSidebarItems;
  };

  const [links, setLinks] = useState<SidebarLink[]>(sidebarNavLinks);

  useEffect(() => {
    setLinks(getActiveSideNavLink(links, router.pathname));
  }, [router.pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar data={links} />
      <main
        className="h-screen w-[calc(100%-200px)] max-lg:w-full bg-[#f8f8f8] overflow-auto"
        style={{ padding: padding }}
      >
        <Transition>{children}</Transition>
      </main>
    </div>
  );
};

export default AppLayout;
