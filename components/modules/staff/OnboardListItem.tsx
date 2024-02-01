import React, { FC } from "react";
import moment from 'moment';
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  data: any;
  staffName: any;
}

const OnboardListItem: FC<Props> = ({data, staffName}) => {
  return (
    <div className="flex justify-between max-sm:flex-col-reverse items-center max-sm:items-start gap-2 py-3 border-b border-b-[#9A9A9A]">
      <p className="text-base font-semibold">{capitalizeAllFirstLetters(staffName)} onboarded a driver {capitalizeAllFirstLetters(data.full_name)}</p>
    </div>
  );
};

export default OnboardListItem;
