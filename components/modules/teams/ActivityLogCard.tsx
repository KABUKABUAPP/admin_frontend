import React, { FC, useEffect } from "react";

import Card from "@/components/common/Card";
import DropDown from "@/components/ui/DropDown";
import ActivityLogItem from "./ActivityLogItem";
import { useFormik, Form, FormikProvider } from "formik";
import { useRouter } from "next/router";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { useViewTeamQuery } from "@/api-services/teamService";

const initialValues = {
  search_from: "",
  search_to: "",
};

const ActivityLogCard: FC = () => {
  const formik = useFormik({
      initialValues: initialValues,
      onSubmit: (values) => console.log(values)
  });
  const { id } = useRouter().query;

  const { data, isLoading, error, refetch } = useViewTeamQuery(
    { teamId: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );
  
  return (
    <Card maxHeight="500px">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Drivers Onboarded</p>
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold">Show: </p>
          <DropDown placeholder="Newest First"/>
        </div>
      </div>

      <div className="pt-4 flex flex-col gap-2">
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
      </div>

      <div className="mt-4">
        <div className="bg-[#F8F8F8] rounded-md mt-2 mb-2">
          <Card bg={'#F8F8F8'}>
            <div className="flex p-1">
              <div className="w-4/5">    
                <p className="text-[#9A9A9A]"><small>This Week</small></p>
                <p className="text-[#000]"><b>{data?.total_onboarded_this_week}</b></p>
              </div>
              {/*<div className="w-1/5 mt-2">
                <p className="text-[#000] cursor-pointer"><b>View</b></p>
                </div>*/}
            </div>
          </Card>
        </div>

        <div className="bg-[#F8F8F8] rounded-md mt-2 mb-2">
          <Card bg={'#F8F8F8'}>
            <div className="flex p-1">
              <div className="w-4/5">    
                <p className="text-[#9A9A9A]"><small>This Month</small></p>
                <p className="text-[#000]"><b>{data?.total_onboarded_this_month}</b></p>
              </div>
              {/*<div className="w-1/5 mt-2">
                <p className="text-[#000] cursor-pointer"><b>View</b></p>
                </div>*/}
            </div>
          </Card>
        </div>

        <div className="bg-[#F8F8F8] rounded-md mt-2 mb-2">
          <Card bg={'#F8F8F8'}>
            <div className="flex p-1">
              <div className="w-4/5">    
                <p className="text-[#9A9A9A]"><small>Past 6 Months</small></p>
                <p className="text-[#000]"><b>{data?.total_onboarded_past_six_months}</b></p>
              </div>
              {/*<div className="w-1/5 mt-2">
                <p className="text-[#000] cursor-pointer"><b>View</b></p>
                </div>*/}
            </div>
          </Card>
        </div>

        <div className="bg-[#F8F8F8] rounded-md mt-2 mb-2">
          <Card bg={'#F8F8F8'}>
            <div className="flex p-1">
              <div className="w-4/5">    
                <p className="text-[#9A9A9A]"><small>Past 1 year</small></p>
                <p className="text-[#000]"><b>{data?.total_onboarded_past_one_year}</b></p>
              </div>
              {/*<div className="w-1/5 mt-2">
                <p className="text-[#000] cursor-pointer"><b>View</b></p>
                </div>*/}
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default ActivityLogCard;
