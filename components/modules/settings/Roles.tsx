import React, { FC, useState, useEffect } from "react";
import AllRolesView from "./AllRolesView";
import ViewRole from "./ViewRole";
import { useRouter } from "next/router";
import CreateRole from "./CreateRole";

const Roles: FC = () => {
  const [currentView, setCurrentView] = useState<
    "all_roles" | "one_role" | "create_role"
  >("all_roles");
  const router = useRouter();

  useEffect(()=>{
    const { roleId } =router.query

    if(!roleId && currentView === 'one_role'){
      setCurrentView('all_roles')
    }
    else if(roleId && currentView !== 'one_role'){
      setCurrentView('one_role')
    }
  },[router.query])

  useEffect(()=>{
    setCurrentView('all_roles')
  },[])

  return (
    <div className="bg-[#FFFFFF] rounded-lg p-6 flex flex-col gap-6 h-full overflow-auto scrollbar-none">
      {currentView === "all_roles" && (
        <AllRolesView
          handleViewRole={() => {
            setCurrentView("one_role");
          }}
          handleCreateRole={() => {
            setCurrentView("create_role");
          }}
        />
      )}
      {currentView === "one_role" && (
        <ViewRole
          handleBack={() => {
            router.push("/settings", undefined, { shallow: true });
            setCurrentView("all_roles");
          }}
        />
      )}

      {currentView === "create_role" && <CreateRole handleBack={()=>setCurrentView('all_roles')}/>}
    </div>
  );
};

export default Roles;
