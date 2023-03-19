import React, { FC } from "react";
import { useRouter } from "next/router";

import { ACCESS_TOKEN } from "@/constants";
import Button from "../ui/Button/Button";

interface Props {
  handleClick: ()=>any
}

const LogoutPopUp: FC<Props> = ({handleClick}) => {
 
  return (
    <div className="bg-[#FFFFFF] w-[200px] p-4 py-6 rounded-lg">
      <Button title="Sign Out" color="secondary" className="w-full" onClick={handleClick}/>
    </div>
  );
};

export default LogoutPopUp;
