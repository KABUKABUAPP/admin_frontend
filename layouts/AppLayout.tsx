import React, { FC, PropsWithChildren, useState, useEffect } from "react";
import { useRouter } from "next/router";
import SideBar from "@/components/common/SideBar";
import sidebarNavLinks from "@/navigation/sidebarNavLinks";
import { SidebarLink } from "@/models/SidebarLink";
import Transition from "@/components/common/Transition";
import Cookies from "js-cookie";
import { USER_TOKEN } from "@/constants";
import { routePermissionsMapping } from "@/constants";

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
        if ("subLinks" in item) {
          if (pathname.includes(item.link)) {
            return { ...item, isActive: true };
          } else if (item.subLinks?.some((i) => pathname.includes(i))) {
            return { ...item, isActive: true };
          } else return { ...item, isActive: false };
        } else {
          if (pathname.includes(item.link)) {
            return { ...item, isActive: true };
          }
          return { ...item, isActive: false };
        }
      });
    }

    return mutatedSidebarItems;
  };

  const getAccessibleLinks = (sidebarItems: SidebarLink[]) => {
    const user = Cookies.get(USER_TOKEN);
    if (user) {
      const parsedUser = JSON.parse(user);
      const acccessibleLinks = routePermissionsMapping
        .filter((item) => {
          if (
            parsedUser.permissions[`${item.permissionLabel}`].read === true ||
            parsedUser.permissions[`${item.permissionLabel}`].write === true
          ) {
            return true;
          } else return false;
        })
        .map((item) => {
          if (item.route === "/drivers") return "/drivers/active";
          else return item.route;
        });

      const accessibleSidebarLinks = sidebarItems.filter((item) => {
        if (acccessibleLinks.indexOf(item.link) !== -1) return true;
        else return false;
      });

      return accessibleSidebarLinks;
    } else return [] as SidebarLink[];
  };

  const [links, setLinks] = useState<SidebarLink[]>(sidebarNavLinks);

  useEffect(() => {
    setLinks(getActiveSideNavLink(links, router.pathname));
  }, [router.pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar data={getAccessibleLinks(links)} />
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
