import React, { FC, PropsWithChildren, useState, useEffect } from "react";
import { useRouter } from "next/router";
import SideBar from "@/components/common/SideBar";
import sidebarNavLinks from "@/navigation/sidebarNavLinks";
import Container from "@/components/common/Container";
import { SidebarLink } from "@/models/SidebarLink";
import Transition from "@/components/common/Transition";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const getActiveSideNavLink = (
    sidebarItems: SidebarLink[],
    pathname: string
  ) => {
    const mutatedSidebarItems = sidebarItems.map((item) => {
      if (pathname === item.link) {
        return { ...item, isActive: true };
      }
      return { ...item, isActive: false };
    });

    return mutatedSidebarItems;
  };

  const [links, setLinks] = useState<SidebarLink[]>(sidebarNavLinks);

  useEffect(() => {
    setLinks(getActiveSideNavLink(links, router.pathname));
  }, [router.pathname]);

  return (
      <div className="flex h-screen overflow-hidden">
        <SideBar data={links} />
        <main className="h-screen w-[calc(100%-200px)] max-lg:w-full bg-[#f8f8f8] overflow-auto p-4 pt-10">
          <Transition>{children}</Transition>
        </main>
      </div>
  );
};

export default AppLayout;
