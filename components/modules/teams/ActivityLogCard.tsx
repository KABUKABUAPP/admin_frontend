import React, { FC, useEffect, useState } from "react";

import Card from "@/components/common/Card";
import DropDown from "@/components/ui/DropDown";
import ActivityLogItem from "./ActivityLogItem";
import { useFormik, Form, FormikProvider } from "formik";
import { useRouter } from "next/router";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { useViewTeamQuery, useViewTeamOnboardedDriversQuery } from "@/api-services/teamService";
import TimesIconRed from "@/components/icons/TimesIconRed";
import Avatar from "@/components/common/Avatar";
import { capitalizeAllFirstLetters } from "@/utils";
import Loader from "@/components/ui/Loader/Loader";

const initialValues = {
  search_from: "",
  search_to: "",
};

const ActivityLogCard: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [timeline, setTimeline] = useState('past_one_year');
  const [userType, setUserType] = useState('driver');
  const [userTypeText, setUserTypeText] = useState('Drivers');
  const [sideHeaderText, setSideHeaderText] = useState('');
  const [summaryView, setSummaryView] = useState(true)
  const driverBold = summaryView ? 'font-bold' : '';
  const riderBold = !summaryView ? 'font-bold' : '';

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const formik = useFormik({
      initialValues: initialValues,
      onSubmit: (values) => {}
  });

  const { id } = useRouter().query;

  const { data, isLoading, error, refetch } = useViewTeamQuery(
    { teamId: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const { data: onboardedUserData, isLoading: onboardedUserDataLoading, error: onboardedUserDataError, refetch: onboardedUserDataRefetch } = useViewTeamOnboardedDriversQuery(
    { teamId: String(id), limit: pageLimit, page: pageNumber, timeline, userType },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );
  
  const toggleSidebar = () => {
    setIsOpen(true);
  };

  const populateSidebar = (newTimeline: string) => {
    setTimeline(newTimeline)
  }
  
  return (
    <div className="flex">
      <Card maxHeight="500px">
        <div className="text-md flex">
          <p className={`cursor-pointer mx-5 ${driverBold}`} onClick={() => {
            setSummaryView(true);
            setUserTypeText('Drivers')
            setUserType('driver')
          }}>Driver</p>
          <p>|</p>
          <p className={`cursor-pointer mx-5 ${riderBold}`} onClick={() => {
            setSummaryView(false);
            setUserTypeText('Riders')
            setUserType('rider')
          }}>Rider</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">{userTypeText} Onboarded</p>
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold">Show: </p>
            <DropDown placeholder="Newest First"/>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="bg-[#F8F8F8] rounded-md mt-2 mb-2">
            <Card bg={'#F8F8F8'}>
              <div className="flex p-1">
                <div className="w-4/5">    
                  <p className="text-[#9A9A9A]"><small>Today</small></p>
                  <p className="text-[#000]"><b>{userType === 'driver' ? data?.total_drivers_onboarded_today : data?.total_riders_onboarded_today}</b></p>
                </div>
                <div className="w-1/5 mt-2">
                  <p className="text-[#000] cursor-pointer" onClick={() => {
                    toggleSidebar();
                    populateSidebar("today");
                    setSideHeaderText('today');
                  }}><b>View</b></p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-[#F8F8F8] rounded-md mt-2 mb-2">
            <Card bg={'#F8F8F8'}>
              <div className="flex p-1">
                <div className="w-4/5">    
                  <p className="text-[#9A9A9A]"><small>This Week</small></p>
                  <p className="text-[#000]"><b>{userType === 'driver' ? data?.total_drivers_onboarded_this_week : data?.total_riders_onboarded_this_week}</b></p>
                </div>
                <div className="w-1/5 mt-2">
                  <p className="text-[#000] cursor-pointer" onClick={() => {
                    toggleSidebar();
                    populateSidebar("this_week");
                    setSideHeaderText('this week');
                  }}><b>View</b></p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-[#F8F8F8] rounded-md mt-2 mb-2">
            <Card bg={'#F8F8F8'}>
              <div className="flex p-1">
                <div className="w-4/5">    
                  <p className="text-[#9A9A9A]"><small>This Month</small></p>
                  <p className="text-[#000]"><b>{userType === 'driver' ? data?.total_drivers_onboarded_this_month : data?.total_riders_onboarded_this_month}</b></p>
                </div>
                <div className="w-1/5 mt-2">
                  <p className="text-[#000] cursor-pointer" onClick={() => {
                    toggleSidebar();
                    populateSidebar("this_month");
                    setSideHeaderText('this month');
                  }}><b>View</b></p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-[#F8F8F8] rounded-md mt-2 mb-2">
            <Card bg={'#F8F8F8'}>
              <div className="flex p-1">
                <div className="w-4/5">    
                  <p className="text-[#9A9A9A]"><small>Past 6 Months</small></p>
                  <p className="text-[#000]"><b>{userType === 'driver' ? data?.total_drivers_onboarded_past_six_months : data?.total_riders_onboarded_past_six_months}</b></p>
                </div>
                <div className="w-1/5 mt-2">
                  <p className="text-[#000] cursor-pointer" onClick={() => {
                    toggleSidebar();
                    populateSidebar("past_six_months");
                    setSideHeaderText('in the past six months');
                  }}><b>View</b></p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-[#F8F8F8] rounded-md mt-2 mb-2">
            <Card bg={'#F8F8F8'}>
              <div className="flex p-1">
                <div className="w-4/5">    
                  <p className="text-[#9A9A9A]"><small>Past 1 year</small></p>
                  <p className="text-[#000]"><b>{userType === 'driver' ? data?.total_drivers_onboarded_past_one_year :  data?.total_riders_onboarded_past_one_year}</b></p>
                </div>
                <div className="w-1/5 mt-2">
                  <p className="text-[#000] cursor-pointer" onClick={() => {
                    toggleSidebar();
                    populateSidebar("past_one_year");
                    setSideHeaderText('in the past one year');
                  }}><b>View</b></p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
        
      <div className={`text-[#000] w-100 ${isOpen ? 'block' : 'hidden'} fixed inset-y-0 right-0 z-10`}>
        <Card height="100vh" rounded="rounded-tl-lg rounded-bl-lg">
          {
            onboardedUserDataLoading ?
            <Loader /> :
            <>
              <div className="flex justify-end mt-3 mb-5">
                <div className="font-bold mx-2">
                  {userTypeText} onboarded {sideHeaderText}
                </div>
                <div className="cursor-pointer mx-2" onClick={() => setIsOpen(false)}><TimesIconRed /></div>
              </div>
              <div className="p-4 bg-[#F6F6F6] rounded-lg">
                <>
                  {onboardedUserData?.length > 0 && onboardedUserData.map((u: any) => (
                    <div className="flex mt-2 mb-2 mx-3">
                      <div className="mx-3">
                        <Avatar imageUrl={u.staff_profile_image} fallBack={u.staff_name[0].toUpperCase()} size="sm" />
                      </div>
                      <div className="mx-3">
                        <p className="mt-1 mb-1">{capitalizeAllFirstLetters(u.staff_name)}</p>
                        <p className="mt-1 mb-1 text-[#9A9A9A]">{u.no_onboarded} Drivers Onboarded</p>
                      </div>
                    </div>
                  ))}
                  {onboardedUserData?.length === 0 && 
                    <p className="justify-center">Data unavailable for this timeline</p>
                  }
                </>
              </div>
            </>
          }
        </Card>
      </div>
    </div>
  );
};

export default ActivityLogCard;
