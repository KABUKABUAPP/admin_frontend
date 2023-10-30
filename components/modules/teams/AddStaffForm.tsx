import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Card from "@/components/common/Card";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { AddStaffValidation } from "@/validationschemas/AddStaffValidationSchema";
import { useFormik, Form, FormikProvider } from "formik";
import { useCreateTeamMutation } from "@/api-services/teamService";
import SelectField from "@/components/ui/Input/SelectField";
import Select from 'react-select'
import { toast } from "react-toastify";
import { useGetAllStaffQuery } from "@/api-services/staffService";
import TimesIconRed from "@/components/icons/TimesIconRed";
import { capitalizeAllFirstLetters } from "@/utils";
import ErrorMessage from "@/components/common/ErrorMessage";

const initialValues = {
  team_name: "",
  audience: ""
};

const AddStaffForm: FC = () => {
  const router = useRouter();
  const [tags, setTags] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("active");
  const [selectedSortFilter, setSelectedSortFilter] = useState<string>("newest_first");
  const [opt, setOpt] = useState<any>()
  
  const { data: allStaff, isLoading: isStaffLoading, error: isErrorLoading, refetch, isError } = useGetAllStaffQuery({
    limit: pageSize,
    page: currentPage,
    order: selectedSortFilter,
    status: selectedStatus,
    search: search,
  });

  const handleTagDelete = (i: any) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const handleTagAddition = (tag: any) => {
    const findDup = tags.find((tagI: any) => {return tagI.value === tag.value});
    if (findDup) return toast.error('Team Member has already been added');

    setTags([...tags, tag]);
  };

  const [createTeam, { data, isLoading, error, isSuccess }] = useCreateTeamMutation();
  const roles = [
    {
      title: 'Driver',
      id: 'driver'
    },
    {
      title: 'Rider',
      id: 'rider'
    }
  ];

  const formik = useFormik({
    initialValues,
    validationSchema: AddStaffValidation,
    onSubmit: (values) => {
      let member_ids: any[] = [];
      tags.forEach((tg: any) => {
        member_ids.push(tg.value)
      })
      const newTeam = {name: values.team_name, audience: values.audience, member_ids}
      createTeam(newTeam)
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Team Successfully Created");
      //router.replace("/staffs/teams");
      window.location.href = "/staffs/teams"
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      const { message }: any = error.data;
      toast.error(message);
    }
  }, [error]);

  return (
    <div style={{height: '150vh'}}>
      <FormikProvider value={formik}>
        <Form>
          <p className="text-2xl font-semibold pb-4">Add New Staff</p>
          <Card>
            <div className="flex flex-col gap-8 py-5">
              <TextField
                label="Team name"
                placeholder="Name here"
                {...formik.getFieldProps("team_name")}
                error={
                  formik.touched.team_name ? formik.errors.team_name : undefined
                }
              />
              <SelectField
                label="Audience"
                disabled={!roles}
                options={
                  !roles
                    ? []
                    : roles.map((i) => ({
                        label: i.title,
                        value: i.id,
                      }))
                }
                placeholder="Audience"
                {...formik.getFieldProps("audience")}
                error={formik.touched.audience ? formik.errors.audience : undefined}
              />

              {
                tags.length > 0 && 
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                  {tags?.map((t: any) => (
                  <div className="mx-2 bg-[#F8F8F8] rounded-md p-3 mt-2 mb-3" style={{width: 'fit-content', display: 'flex'}}><span className="mx-1">{capitalizeAllFirstLetters(t.label)}</span><span className="mx-1 mt-1 cursor-pointer" onClick={() => {handleTagDelete(t)}}><TimesIconRed /></span></div>
                  ))}
                </div>
              }

              <Select
                options={allStaff?.data?.map((staff: any) => {
                  return {
                    value: staff.id,
                    label: capitalizeAllFirstLetters(staff.fullName)
                  }
                })}
                onKeyDown={(e: any) => {
                  setSearch(e.target.value)
                }}
                onChange={(optX: any) => {
                  handleTagAddition(optX)
                }}
              />
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              title="Add Team"
              className="!text-[16px] mt-6"
              size="large"
              type="submit"
              disabled={isLoading}
              loading={isLoading}
            />
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default AddStaffForm;
