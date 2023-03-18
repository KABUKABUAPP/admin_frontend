import React, { FC } from "react";

import { SidebarLink } from "@/models/SidebarLink";
import SidebarItem from "./SidebarItem";
import UserAvatarBox from "./UserAvatarBox";

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
  return (
    <aside className="border w-full max-w-[200px] h-full p-2 bg-[#FDFDFD] max-lg:hidden overflow-y-auto flex flex-col justify-between">
      <div>
        <p className="text-xl font-bold mb-2">Kabukabu</p>
        <div className="flex-1">
          {data.map((item, idx) => {
            return <SidebarItem {...item} key={idx} />;
          })}
        </div>
      </div>
      <div>
        <UserAvatarBox {...mockUser} />
      </div>
    </aside>
  );
};

export default SideBar;
