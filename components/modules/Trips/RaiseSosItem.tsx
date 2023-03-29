import React, { FC } from "react";
import UserShieldIcon from "@/components/icons/UserShieldIcon";
import LocationPinIcon from "@/components/icons/LocationPinIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";

interface Props {
  topLocation: string;
  subLocation: string;
  isChecked: boolean;
}

const RaiseSosItem: FC<Props> = ({ topLocation, subLocation, isChecked }) => {
  return (
    <div className="bg-[#F1F1F1] px-2 py-4 rounded-lg flex items-center mb-4 gap-2">
      <div style={{ flex: 1}} className="flex items-center justify-center ">
        <input type="checkbox" />
      </div>
      <div style={{ flex: 5 }} className="flex items-center gap-3">
        <div>
          <UserShieldIcon />
        </div>
        <div>
          <p className="font-bold text-sm">{topLocation}</p>
          <p className="text-xs flex items-center gap-2">
            <LocationPinIcon /> {subLocation}
          </p>
        </div>
        <div className="flex items-center justify-center ml-8">{isChecked && <span color="#000000"><PhoneIcon /></span>}</div>
      </div>
    </div>
  );
};

export default RaiseSosItem;
