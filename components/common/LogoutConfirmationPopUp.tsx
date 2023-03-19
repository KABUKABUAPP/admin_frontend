import React, { FC } from "react";

import Button from "../ui/Button/Button";
import useClickOutside from "@/hooks/useClickOutside";

interface Props {
  handleCancel: () => any;
  handleLogout: () => any;
}

const LogoutConfirmationPopUp: FC<Props> = ({ handleCancel, handleLogout }) => {
  const ref = useClickOutside<HTMLDivElement>(() => handleCancel());

  return (
    <div
      ref={ref}
      className="px-4 py-8 bg-[#FFFFFF] rounded-lg w-full max-w-[350px]"
    >
      <p className="text-center">Sign Out</p>
      <p className="text-center my-8">Are you sure you want to sign out?</p>
      <div className="flex items-center w-full justify-center gap-4">
        <Button title="Cancel" className="w-full" onClick={handleCancel} />
        <Button
          title="Sign Out"
          color="secondary"
          className="w-full"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default LogoutConfirmationPopUp;
