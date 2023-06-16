import React, { FC } from "react";

import Avatar from "@/components/common/Avatar";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { useModalContext } from "@/contexts/ModalContext";
import UpdatePasswordModal from "./UpdatePasswordModal";
import RoleBox from "./RoleBox";

const AccountSettings: FC = () => {
  const { setModalContent } = useModalContext();

  return (
    <div className="bg-[#FFFFFF] rounded-lg flex flex-col items-center p-6 gap-3 h-full">
      <RoleBox />
      <Avatar fallBack="A" imageUrl="/testUser.jpg" shape="round" size="lg" />
      <p className="text-2xl font-medium">Samson Chukwuemeka</p>
      <p className="text-base font-medium">schdadad@gmail.com</p>
      <p className="text-base font-medium">Super admin</p>

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
