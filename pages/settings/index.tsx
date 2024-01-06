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
import AppHead from "@/components/common/AppHead";
import SosContactList from "@/components/modules/settings/SosContactList";
import DriverWithdrawalSettings from "@/components/modules/settings/DriverWithdrawalSettings";
import DriverReferralSettings from "@/components/modules/settings/DriverReferralSettings";
import { useUserContext } from "@/contexts/UserContext";
import { useGetDriverSettingsQuery } from "@/api-services/settingsService";
import Loader from "@/components/ui/Loader/Loader";
import FarePriceSettings from "@/components/modules/settings/FarePriceSettings";
import TripChargesControl from "@/components/modules/settings/TripChargesControl";

const Settings: NextPage = () => {
  const { user } = useUserContext();

  const [nav, setNav] = useState([
    { title: "Account Settings", isActive: true },
    { title: "Roles", isActive: false },
    { title: "Promotions", isActive: false },
    { title: "SOS Contact List", isActive: false }
  ]);

  const handleChangeActiveNav = (title: string) => {
    const mappedNav = nav.map((i) => {
      if (i.title === title) return { ...i, isActive: true };
      return { ...i, isActive: false };
    });

    setNav(mappedNav);
  };

  
  const {
    data: driversSettings,
    isLoading: settingsLoading,
    isError: settingsError,
    refetch: reloadSettings,
  } = useGetDriverSettingsQuery({})


  const [currentView, setCurrentView] = useState("Account Settings");

  useEffect(() => {
    if (user && user!.role === 'super') {
      setNav([
        { title: "Account Settings", isActive: true },
        { title: "Roles", isActive: false },
        { title: "Promotions", isActive: false },
        { title: "SOS Contact List", isActive: false },
        { title: "Driver Withdrawal Settings", isActive: false },
        { title: "Driver Referral Settings", isActive: false },
        { title: "Fare Price Settings", isActive: false },
        { title: "Trip Charges Control", isActive: false }
      ])
    }
  }, [user])

  useEffect(() => {
    setCurrentView(nav.filter((i) => i.isActive === true)[0].title);
  }, [JSON.stringify(nav)]);

  useEffect(() => {
    if (driversSettings) console.log(driversSettings);
  }, [driversSettings]);

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
    <>
      <AppHead title="Kabukabu | Settings" />
      <AppLayout padding="0">
        <SettingsLayout
          aside={
            <SettingsNav
              navItems={handleShowNavItemsBasedOnPermission(
                nav,
                userPermissions
              )}
              handleCick={(title) => {
                handleChangeActiveNav(title);
              }}
            />
          }
          main={
            settingsLoading ?
            <Loader /> :
            <>
              {currentView === "Account Settings" && <AccountSettings />}
              {currentView === "Roles" && <Roles />}
              {currentView === "Promotions" && <Promotions />}
              {currentView === "SOS Contact List" && <SosContactList />}
              {currentView === "Driver Withdrawal Settings" && <DriverWithdrawalSettings frequency={driversSettings.withdrawal.frequency.toString()} type={driversSettings.withdrawal.type.toString()} limit={driversSettings.withdrawal.limit.toString()} />}
              {currentView === "Driver Referral Settings" && <DriverReferralSettings frequency={driversSettings.referral_reward.frequency.toString()} amount={driversSettings.referral_reward.amount.toString()} />}
              {currentView === "Fare Price Settings" && <FarePriceSettings upper_bound={driversSettings.pricing_boundary.upper_bound.toString()} lower_bound={driversSettings.pricing_boundary.lower_bound.toString()} />}
              {currentView === "Trip Charges Control" && <TripChargesControl {...driversSettings.trip_charges_control} />}
            </>
          }
        />
      </AppLayout>
    </>
  );
};

export default Settings;
