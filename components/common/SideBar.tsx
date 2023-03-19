import React, { FC, useState } from "react";
import { useRouter } from "next/router";

import { SidebarLink } from "@/models/SidebarLink";
import SidebarItem from "./SidebarItem";
import UserAvatarBox from "./UserAvatarBox";
import useClickOutside from "@/hooks/useClickOutside";
import LogoutPopUp from "./LogoutPopUp";
import Modal from "./Modal";
import LogoutConfirmationPopUp from "./LogoutConfirmationPopUp";
import { logout } from "@/utils";

interface Props {
  data: SidebarLink[];
}

const mockUser = {
  image: "/testUser.jpg",
  firstName: "Samson",
  lastName: "Carry",
  role: "Super Admin",
  userId: "98765",
};

const SideBar: FC<Props> = ({ data }) => {
  const [isLogoutPopUp, setIsLogoutPopUp] = useState<boolean>(false);
  const ref = useClickOutside<HTMLSpanElement>(() => setIsLogoutPopUp(false));
  const [isModal, setIsModal] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      {isModal && (
        <Modal>
          <LogoutConfirmationPopUp
            handleCancel={() => setIsModal(false)}
            handleLogout={() => {
              logout(() => router.push("/auth/login"));
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
          <UserAvatarBox
            {...mockUser}
            handleClick={() => setIsLogoutPopUp(true)}
          />
          {isLogoutPopUp && (
            <span
              className="absolute -top-10 left-[100%] z-50 shadow-md"
              ref={ref}
            >
              <LogoutPopUp handleClick={() => setIsModal(true)} />
            </span>
          )}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
