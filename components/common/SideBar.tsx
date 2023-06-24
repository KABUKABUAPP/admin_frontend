import React, { FC, useState } from "react";
import { useRouter } from "next/router";

import { SidebarLink } from "@/models/SidebarLink";
import SidebarItem from "./SidebarItem";
import UserAvatarBox from "./UserAvatarBox";
import useClickOutside from "@/hooks/useClickOutside";
import LogoutPopUp from "./LogoutPopUp";
import Modal from "./Modal";
import LogoutConfirmationPopUp from "./LogoutConfirmationPopUp";
import { useUserContext } from "@/contexts/UserContext";

import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, USER_TOKEN } from "@/constants";

interface Props {
  data: SidebarLink[];
}

const SideBar: FC<Props> = ({ data }) => {
  const [isLogoutPopUp, setIsLogoutPopUp] = useState<boolean>(false);
  const ref = useClickOutside<HTMLSpanElement>(() => setIsLogoutPopUp(false));
  const [isModal, setIsModal] = useState<boolean>(false);
  const router = useRouter();
  const { user, setUser } = useUserContext();

  return (
    <>
      {isModal && (
        <Modal>
          <LogoutConfirmationPopUp
            handleCancel={() => setIsModal(false)}
            handleLogout={() => {
              setUser(null)
              Cookies.remove(USER_TOKEN)
              Cookies.remove(ACCESS_TOKEN)
              router.push("/auth/login");
            }}
          />
        </Modal>
      )}
      <aside className="border w-full max-w-[200px] h-full p-2 bg-[#FDFDFD] max-lg:hidden flex flex-col">
        <p className="text-xl font-bold h-fit">Kabukabu</p>
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
