import React, { FC } from "react";

import Card from "@/components/common/Card";
import DropDown from "@/components/ui/DropDown";
import ActivityLogItem from "./ActivityLogItem";
import { useUserContext } from "@/contexts/UserContext";
import OnboardListItem from "./OnboardListItem";

interface Props {
  //logs?: { description: string; createdAt: string }[];
  logs?: any[];
  userRole?: string;
  onboardList?: any;
  handleChange?: (e: any) => void;
  staffName?: string;
  onboardDropdownData?: string
}

const ActivityLogCard: FC<Props> = ({ logs, userRole, onboardList, handleChange, staffName, onboardDropdownData }) => {
  return (
    <div className="min-h-1/2">
    <Card>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">{userRole === 'executive marketer' ? 'Drivers onboarded' : 'Activity logs'}</p>
        {
          userRole === 'executive marketer' &&
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold">Show: </p>
            <DropDown 
              value={onboardDropdownData ? onboardDropdownData : 'all'} 
              handleChange={(e) => {
                if (handleChange) handleChange(e);
              }} 
              options={[
                { label: "All", value: "all", default: true },
                { label: "Today", value: "today" },
                { label: "This Week", value: "this_week" },
                { label: "This Month", value: "this_month" }
             ] }
            />
          </div>
        }
      </div>

      <div className="pt-4 flex flex-col gap-2">
        {userRole !== 'executive marketer' && logs && logs?.length > 0 && logs?.map((log, idx) => (
          <ActivityLogItem {...log} key={idx} />
        ))}

        {userRole !== 'executive marketer' && logs && logs?.length === 0 && 
          <p className="text-center">Staff has not performed any activity</p>
        }

        {
          userRole === 'executive marketer' && onboardList && onboardList?.data?.length > 0 && 
          <>
            {onboardList?.data?.map((listItem: any, idx: any) => (
              <OnboardListItem data={listItem} key={idx} staffName={staffName} />
            ))}
          </>
        }
        {
          onboardList && onboardList?.data?.length === 0 && 
          <p className="text-center">Staff has not performed any activity</p>
        }
      </div>
    </Card>
    </div>
  );
};

export default ActivityLogCard;
