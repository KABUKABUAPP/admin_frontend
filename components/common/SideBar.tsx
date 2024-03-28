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
import SelectField from "@/components/ui/Input/SelectField";
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
  const { dashboardState, setDashboardState } = useDashboardState();

  const {
    data: states,
    isLoading: statesLoading,
    error: statesError,
    refetch: refetchStates,
  } = useGetNigerianStatesQuery(null);

  useEffect(() => {
    if (states) setAllStates([{label: 'All', value: 'all'}, ...states]);
  }, [states])

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
      <aside className={`border w-full max-w-[200px] h-full p-2 bg-[#FDFDFD] ${show ? '' : 'max-lg:hidden'} flex flex-col`}>
        <div className="py-6">
          <Logo />
        </div>
        <div className="py-1 cursor-pointer">
          <p>Select State</p>
          <Select
            options={allStates ? allStates.map((state: any) => {
              return {
                value: state.value,
                label: state.label
              }
            }) : []}
            onChange={(e) => {setDashboardState(e?.label?.toLowerCase())}}
          />
        </div>
        <div className="overflow-y-auto h-[85%] mt-2">
          <div className="flex-1">
            {data.map((item, idx) => {
              return <SidebarItem {...item} key={idx} />;
            })}
          </div>
        </div>
        <div className="relative">
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
