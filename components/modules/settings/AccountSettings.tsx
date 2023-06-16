import React, { FC } from "react";

import Avatar from "@/components/common/Avatar";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { useModalContext } from "@/contexts/ModalContext";
import UpdatePasswordModal from "./UpdatePasswordModal";
import RoleBox from "./RoleBox";
import { useUserContext } from "@/contexts/UserContext";

const AccountSettings: FC = () => {
  const { setModalContent } = useModalContext();
  const { user } = useUserContext()
  return (
    <div className="bg-[#FFFFFF] rounded-lg flex flex-col items-center p-6 gap-3 h-full">
      {/* <RoleBox /> */}
      {user && <Avatar fallBack={user.full_name[0]} imageUrl={''} shape="round" size="lg" />}
      <p className="text-2xl font-medium">{user?.full_name}</p>
      <p className="text-base font-medium">{user?.email}</p>
      <p className="text-base font-medium">{user?.role}</p>

      <div className="w-full flex flex-col gap-6 mt-4">
        <div className="flex max-sm:flex-col gap-6">
          <div style={{ flex: 1 }}>
            <TextField label="First name" />
          </div>
          <div style={{ flex: 1 }}>
            <TextField label="Last name" />
          </div>
        </div>
        <div className="flex max-sm:flex-col gap-6">
          <div style={{ flex: 1 }}>
            <TextField label="Email address" />
          </div>
          <div style={{ flex: 1 }}>
            <TextField label="Phone Number" />
          </div>
        </div>
      </div>
      <div className="border-t border-t-gray-200 my-5 w-full"></div>
      <div className="w-full">
        <Button
          title="Update Password"
          size="large"
          onClick={() => {
            setModalContent(<UpdatePasswordModal />);
          }}
        />
      </div>
    </div>
  );
};

export default AccountSettings;
