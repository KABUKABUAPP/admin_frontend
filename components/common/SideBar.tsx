import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { SidebarLink } from "@/models/SidebarLink";
import SidebarItem from "./SidebarItem";
import UserAvatarBox from "./UserAvatarBox";
import useClickOutside from "@/hooks/useClickOutside";
import LogoutPopUp from "./LogoutPopUp";
import Modal from "./Modal";
import LogoutConfirmationPopUp from "./LogoutConfirmationPopUp";
import { useUserContext } from "@/contexts/UserContext";
import { useDashboardState } from "@/contexts/StateSegmentationContext";

import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, USER_TOKEN } from "@/constants";
import Logo from "./Logo";
import Select from 'react-select'
import {
  useGetNigerianStatesQuery,
} from "@/api-services/geoLocationService";

interface Props {
  data: SidebarLink[];
  show: Boolean;
}

const SideBar: FC<Props> = ({ data, show }) => {
  const [isLogoutPopUp, setIsLogoutPopUp] = useState<boolean>(false);
  const ref = useClickOutside<HTMLSpanElement>(() => setIsLogoutPopUp(false));
  const [isModal, setIsModal] = useState<boolean>(false);
  const [allStates, setAllStates] = useState<any[]>()
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const { setDashboardState } = useDashboardState();

  const {
    data: states,
    isLoading: statesLoading,
    error: statesError,
    refetch: refetchStates,
  } = useGetNigerianStatesQuery(null);

  useEffect(() => {
    if (states) setAllStates([{label: 'All', value: 'all'}, ...states]);
  }, [states])

  const stateSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: 40,
      borderRadius: 12,
      borderColor: state.isFocused ? "#d1d5db" : "#e5e7eb",
      boxShadow: "none",
      backgroundColor: "#ffffff",
      paddingLeft: 2,
      paddingRight: 2,
      "&:hover": {
        borderColor: "#d1d5db",
      },
    }),
    valueContainer: (base: any) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: 12,
      overflow: "hidden",
      zIndex: 20,
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 1200,
    }),
  };

  return (
    <>
      {isModal && (
        <Modal>
          <LogoutConfirmationPopUp
            handleCancel={() => setIsModal(false)}
            handleLogout={() => {
              setUser(null);
              Cookies.remove(USER_TOKEN);
              Cookies.remove(ACCESS_TOKEN);
              router.push("/auth/login");
            }}
          />
        </Modal>
      )}
      <aside
        className={`border-r border-r-[#E6E9EF] w-[238px] max-w-[238px] min-w-[238px] h-full px-3 py-4 bg-[#F2F3F6] ${show ? '' : 'max-lg:hidden'} flex flex-col rounded-r-[20px]`}
      >
        <div className="pt-2 pb-4 px-2">
          <Logo />
        </div>
        <div className="px-2 pb-3 cursor-pointer">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8F95A3] mb-2">
            Select State
          </p>
          <Select
            options={allStates ? allStates.map((state: any) => {
              return {
                value: state.value,
                label: state.label
              }
            }) : []}
            onChange={(e) => {setDashboardState(e?.label?.toLowerCase())}}
            styles={stateSelectStyles}
            menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
            defaultValue={{ label: "All", value: "all" }}
          />
        </div>
        <div className="overflow-y-auto flex-1 mt-1 px-1">
          <div className="space-y-1">
            {data.map((item, idx) => {
              return <SidebarItem {...item} key={idx} />;
            })}
          </div>
        </div>
        <div className="relative pt-3 px-1 mt-2 border-t border-t-[#E3E6EB]">
          {user && (
            <UserAvatarBox
              userId={user._id}
              fullName={user.full_name}
              role={String(user.role)}
              image={""}
              handleClick={() => setIsLogoutPopUp(true)}
            />
          )}
          {isLogoutPopUp && (
            <motion.span
              className="absolute -top-10 left-[100%] z-50 shadow-md"
              ref={ref}
              initial={{ translateY: 100 }}
              whileInView={{ translateY: 0, transition: { duration: 0.3 } }}
              viewport={{ once: true }}
            >
              <LogoutPopUp handleClick={() => setIsModal(true)} />
            </motion.span>
          )}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
