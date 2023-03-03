import React, { FC, PropsWithChildren, useState, useEffect } from "react";
import { useRouter } from "next/router";
import SideBar from "@/components/common/SideBar";
import sidebarNavLinks from "@/navigation/sidebarNavLinks";
import Container from "@/components/common/Container";
import { SidebarLink } from "@/models/SidebarLink";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const getActiveSideNavLink = (
    sidebarItems: SidebarLink[],
    pathname: string
  ) => {
    const mutatedSidebarItems = sidebarItems.map((item) => {
      if (pathname.includes(item.link)) {
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
    <Container>
      <div className="flex h-screen">
        <SideBar data={links} />
        <main className="h-screen w-full bg-[#F1F1F1] overflow-auto p-4 pt-10">
          {children}
        </main>
      </div>
    </Container>
  );
};

export default AppLayout;
