import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import SettingsLayout from "@/components/modules/settings/SettingsLayout";
import SettingsNav from "@/components/modules/settings/SettingsNav";
import AccountSettings from "@/components/modules/settings/AccountSettings";
import Roles from "@/components/modules/settings/Roles";
import Promotions from "@/components/modules/settings/Promotions";

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

  return (
    <AppLayout padding="0">
      <SettingsLayout
        aside={
          <SettingsNav
            navItems={nav}
            handleCick={(title) => {
              handleChangeActiveNav(title);
            }}
          />
        }
        main={
          <>
          {currentView === 'Account Settings' && <AccountSettings />}
          {currentView === 'Roles' && <Roles />}
          {currentView === 'Promotions' && <Promotions />}
          </>
        }
      />
    </AppLayout>
  );
};

export default Settings;
