import React, { FC } from "react";

import Card from "@/components/common/Card";

interface Props {
  disputesRaised?: number;
  pendingDisputes?: number;
  totalOnboarded?: number;
  totalOnboardToday?: number;
  totalOnboardWeek?: number;
  totalOnboardMonth?: number;
  userRole?: string;
}

const SummaryCard: FC<Props> = ({ disputesRaised, pendingDisputes, totalOnboarded, totalOnboardToday, totalOnboardWeek, totalOnboardMonth, userRole }) => {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Summary</p>
        </div>

        { userRole !== 'executive marketer' &&
          <>
            <div className="flex py-4 border-b border-b-[#D4D4D4]">
              <div className="pr-3 border-r border-r-[#D4D4D4]">
                <p className="text-2xl font-semibold">{disputesRaised}</p>
                <p className="text-lg text-[#9A9A9A]">Total disputes raised</p>
              </div>

              <div className="pl-3">
                <p className="text-2xl font-semibold">{pendingDisputes}</p>
                <p className="text-lg text-[#9A9A9A]">Total disputes pending</p>
              </div>
            </div>
          </>
        }

        { userRole === 'executive marketer' &&
          <>
            <div className="flex py-4 border-b border-b-[#D4D4D4]">
              <div className="pr-3 border-r border-r-[#D4D4D4]">
                <p className="text-2xl font-semibold">{totalOnboarded}</p>
                <p className="text-lg text-[#9A9A9A]">Total drivers onboarded</p>
              </div>

              <div className="pl-3">
                <p className="text-2xl font-semibold">{totalOnboardToday}</p>
                <p className="text-lg text-[#9A9A9A]">Onboarded today</p>
              </div>
            </div>

            <div className="flex py-4 border-b border-b-[#D4D4D4]">
              <div className="pr-3 border-r border-r-[#D4D4D4]">
                <p className="text-2xl font-semibold">{totalOnboardWeek}</p>
                <p className="text-lg text-[#9A9A9A]">Onboarded this week</p>
              </div>

              <div className="pl-3">
                <p className="text-2xl font-semibold">{totalOnboardMonth}</p>
                <p className="text-lg text-[#9A9A9A]">Onboarded this month</p>
              </div>
            </div>
          </>
        }
      </div>
    </Card>
  );
};

export default SummaryCard;
