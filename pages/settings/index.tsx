import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import SettingsLayout from "@/components/modules/settings/SettingsLayout";
import SettingsNav from "@/components/modules/settings/SettingsNav";
import AccountSettings from "@/components/modules/settings/AccountSettings";
import Roles from "@/components/modules/settings/Roles";
import Promotions from "@/components/modules/settings/Promotions";
import useUserPermissions from "@/hooks/useUserPermissions";
import { UserPermissions } from "@/models/User";

const Settings: NextPage = () => {
  const [nav, setNav] = useState([
    { title: "Account Settings", isActive: true },
    { title: "Roles", isActive: false },
    { title: "Promotions", isActive: false },
  ]);

  const handleChangeActiveNav = (title: string) => {
    const mappedNav = nav.map((i) => {
      if (i.title === title) return { ...i, isActive: true };
      return { ...i, isActive: false };
    });

    setNav(mappedNav);
  };

  const [currentView, setCurrentView] = useState("Account Settings");

  useEffect(() => {
    setCurrentView(nav.filter((i) => i.isActive === true)[0].title);
  }, [JSON.stringify(nav)]);

  const { userPermissions } = useUserPermissions();

  const handleShowNavItemsBasedOnPermission = (
    nav: {
      title: string;
      isActive: boolean;
    }[],
    permissions?: UserPermissions | null
  ) => {
    if (permissions) {
      const filteredNav = nav.filter((item) => {
        if (
          item.title === "Promotions" &&
          permissions.promotions_permissions.read === false &&
          permissions.promotions_permissions.write === false
        ) {
          return false;
        } else if (
          item.title === "Roles" &&
          permissions.roles_permissions.read === false &&
          permissions.roles_permissions.write === false
        ) {
          return false;
        } else {
          return true;
        }
      });

      return filteredNav;
    }
    return [] as {
      title: string;
      isActive: boolean;
    }[];
  };

  return (
    <AppLayout padding="0">
      <SettingsLayout
        aside={
          <SettingsNav
            navItems={handleShowNavItemsBasedOnPermission(nav, userPermissions)}
            handleCick={(title) => {
              handleChangeActiveNav(title);
            }}
          />
        }
        main={
          <>
            {currentView === "Account Settings" && <AccountSettings />}
            {currentView === "Roles" && <Roles />}
            {currentView === "Promotions" && <Promotions />}
          </>
        }
      />
    </AppLayout>
  );
};

export default Settings;
