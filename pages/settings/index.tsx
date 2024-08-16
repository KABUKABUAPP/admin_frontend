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
import OnlineConsistency from "@/components/modules/settings/OnlineConsistency";
import RiderReferralSettings from "@/components/modules/settings/RiderReferralSettings";
import RepairLoanSettings from "@/components/modules/settings/RepairLoanSettings";
import MarketerDashboardSettings from "@/components/modules/settings/MarketerDashboardSettings";
import SignUpBonusSettings from "@/components/modules/settings/SignUpBonus";

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
    if (user && (user!.role === 'super' || user!.role === 'principal')) {
      setNav([
        { title: "Account Settings", isActive: true },
        { title: "Roles", isActive: false },
        { title: "Promotions", isActive: false },
        { title: "SOS Contact List", isActive: false },
        { title: "Driver Withdrawal Settings", isActive: false },
        { title: "Driver Referral Settings", isActive: false },
        { title: "Rider Referral Settings", isActive: false },
        { title: "Repair Loan Settings", isActive: false },
        { title: "Marketer Dashboard Settings", isActive: false },
        { title: "Signup Bonus Settings", isActive: false },
        { title: "Fare Price Settings", isActive: false },
        { title: "Trip Charges Control", isActive: false },
        { title: "Online Consistency Reward Settings", isActive: false }
      ])
    }
  }, [user])

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
      console.log({permissions})
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
        } else if (permissions.settings_permissions && permissions.settings_permissions.write === false) {
          return false
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

  useEffect(() => {
    if (driversSettings) console.log({driversSettings})
  }, [driversSettings])

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
              {currentView === "Driver Referral Settings" && <DriverReferralSettings frequency={driversSettings.referral_reward.frequency.toString()} amount={driversSettings.referral_reward.amount.toString()} type={driversSettings.referral_reward.type} is_active={driversSettings.referral_reward.is_active} />}
              {currentView === "Rider Referral Settings" && <RiderReferralSettings amount={driversSettings.rider_referral_control.amount.toString()} percentage_split={driversSettings.rider_referral_control.percentage_split.toString()} status={driversSettings.rider_referral_control.status} />}
              {currentView === "Repair Loan Settings" && <RepairLoanSettings penalty_amount={driversSettings.repair_loan_settings.daily_trips_target.penalty_amount.toString()} target={driversSettings.repair_loan_settings.daily_trips_target.target.toString()} default_penalty_percentage={driversSettings.repair_loan_settings.default_penalty_percentage.toString()} is_active={driversSettings.repair_loan_settings.is_active} />}
              {currentView === "Marketer Dashboard Settings" && <MarketerDashboardSettings start_date={driversSettings.marketer_dashboard.start_date} />}
              {currentView === "Signup Bonus Settings" && <SignUpBonusSettings active={driversSettings.signup_bonus.active} amount={driversSettings.signup_bonus.amount.toString()} online_hours={driversSettings.signup_bonus.online_hours.toString()} user_type={driversSettings.signup_bonus.user_type} />}
              {currentView === "Fare Price Settings" && <FarePriceSettings upper_bound={driversSettings.pricing_boundary.upper_bound.toString()} lower_bound={driversSettings.pricing_boundary.lower_bound.toString()} />}
              {currentView === "Trip Charges Control" && <TripChargesControl {...driversSettings.trip_charges_control} />}
              {currentView === "Online Consistency Reward Settings" && <OnlineConsistency {...driversSettings.online_consistency_reward_control} refetchSettings={reloadSettings} />}
            </>
          }
        />
      </AppLayout>
    </>
  );
};

export default Settings;
