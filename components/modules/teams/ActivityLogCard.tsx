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
  const [sideHeaderText, setSideHeaderText] = useState('');

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const formik = useFormik({
      initialValues: initialValues,
      onSubmit: (values) => console.log(values)
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
    console.log('Down the aisle we go')
  }

  useEffect(() => {
    if(onboardedUserData) console.log('time flies', timeline, onboardedUserData)
  }, [onboardedUserData])
  
  return (
    <div className="flex">
      <Card maxHeight="500px">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">Drivers Onboarded</p>
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold">Show: </p>
            <DropDown placeholder="Newest First"/>
          </div>
        </div>

        {/*<div className="pt-4 flex flex-col gap-2">
          <FormikProvider value={formik}>
            <Form>
              <div className="flex">
                <div className="p-1">
                  <TextField
                    placeholder="Search From"
                    {...formik.getFieldProps("search_from")}
                    error={formik.touched.search_from ? formik.errors.search_from : undefined}
                  />
                </div>
                <div className="p-1">
                  <TextField
                    placeholder="Search To"
                    type={"text"}
                    {...formik.getFieldProps("search_to")}
                    error={
                      formik.touched.search_to ? formik.errors.search_to : undefined
                    }
                  />
                </div>
                <div className="p-1">
                  <Button
                    title="Search"
                    type="submit"
                  />
                </div>
              </div>
            </Form>
          </FormikProvider>
        </div>*/}

        <div className="mt-4">
          <div className="bg-[#F8F8F8] rounded-md mt-2 mb-2">
            <Card bg={'#F8F8F8'}>
              <div className="flex p-1">
                <div className="w-4/5">    
                  <p className="text-[#9A9A9A]"><small>This Week</small></p>
                  <p className="text-[#000]"><b>{data?.total_drivers_onboarded_this_week}</b></p>
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
                  <p className="text-[#000]"><b>{data?.total_drivers_onboarded_this_month}</b></p>
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
                  <p className="text-[#000]"><b>{data?.total_drivers_onboarded_past_six_months}</b></p>
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
                  <p className="text-[#000]"><b>{data?.total_drivers_onboarded_past_one_year}</b></p>
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
                  Drivers onboarded {sideHeaderText}
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
