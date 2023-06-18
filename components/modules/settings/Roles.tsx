import React, { FC, useState } from "react";
import AllRolesView from "./AllRolesView";

const Roles: FC = () => {
  const [currentView, setCurrentView] = useState<
    "all_roles" | "one_role" | "create_role"
  >("all_roles");

  return (
    <div className="bg-[#FFFFFF] rounded-lg p-6 flex flex-col gap-6 h-full overflow-auto scrollbar-none">
      {currentView === "all_roles" && <AllRolesView />}
    </div>
  );
};

export default Roles;
