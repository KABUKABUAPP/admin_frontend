import React, { FC } from "react";

import LocationPinIcon from "@/components/icons/LocationPinIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import UserShieldIcon from "@/components/icons/UserShieldIcon";
import Button from "@/components/ui/Button/Button";

interface Props {
  location: string;
  subLocation: string;
  phoneNumber: string;
  id: string;
  isDeleteUpdateButtons?: boolean;
  handleView?: (id: string) => any;
}

const SosContactItem: FC<Props> = ({
  location,
  phoneNumber,
  subLocation,
  id,
  isDeleteUpdateButtons = false,
  handleView,
}) => {
  return (
    <div className="bg-[#F1F1F1] p-4 rounded-lg flex items-center gap-3">
      <div>
        <UserShieldIcon width={28} height={28} />
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-1">
          <div>
            <p className="font-bold text-lg">{subLocation}</p>
          </div>
          <div>
            <p className="text-sm flex items-center gap-2">
              <LocationPinIcon /> {location}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="-ml-2">
              <PhoneIcon fill="#9A9A9A" width={10} height={10} />
            </span>
            <p className="text-sm">{phoneNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isDeleteUpdateButtons ? (
            <Button
              title="View"
              size="medium"
              className="!text-sm !font-semibold"
              onClick={() => {
                if (handleView) handleView(id);
              }}
            />
          ) : (
            <>
              <Button
                title="Update SOS"
                size="medium"
                className="!text-sm !font-semibold"
              />
              <Button
                title="Delete SOS"
                color="secondary"
                size="medium"
                className="!text-sm !font-semibold"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SosContactItem;
