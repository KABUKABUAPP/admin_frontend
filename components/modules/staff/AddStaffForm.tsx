import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Card from "@/components/common/Card";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { AddStaffValidation } from "@/validationschemas/AddStaffValidationSchema";
import { useFormik, Form, FormikProvider } from "formik";
import { useCreateStaffMutation } from "@/api-services/staffService";
import { useGetRolesQuery } from "@/api-services/settingsService";
import SelectField from "@/components/ui/Input/SelectField";
import { toast } from "react-toastify";
import { verifyIsDigit } from "@/utils";
import {
  useGetNigerianCityByStateQuery,
  useGetNigerianStatesQuery,
} from "@/api-services/geoLocationService";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ErrorMessage from "@/components/common/ErrorMessage";

const initialValues = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  password: "",
  role: "",
  address: "",
  city: "",
  state: "",
};

const AddStaffForm: FC = () => {
  const router = useRouter();
  const [selectedStateId, setSelectedStateId] = useState<string>("");
  const [createStaff, { data, isLoading, error, isSuccess }] =
    useCreateStaffMutation();
  const { data: roles } = useGetRolesQuery(
    {
      limit: 50,
      page: 1,
    },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const {
    data: states,
    isLoading: statesLoading,
    error: statesError,
    refetch: refetchStates,
  } = useGetNigerianStatesQuery(null);

  const {
    data: cities,
    isLoading: citiesLoading,
    error: citiesError,
    refetch: refetchCities,
  } = useGetNigerianCityByStateQuery(
    { id: selectedStateId },
    { skip: !selectedStateId, refetchOnMountOrArgChange: true }
  );

  const formik = useFormik({
    initialValues,
    validationSchema: AddStaffValidation,
    onSubmit: (values) => {
      const stateName = states?.filter((s) => s.value == values.state)[0]
        .label as string;

      createStaff({ ...values, state: stateName });
    }
  });

  useEffect(() => {
    if (formik.values.state && states?.length) {
      const stateId = states.filter((s) => s.value === formik.values.state)[0]
        ?.value as string;
      if (stateId) setSelectedStateId(stateId);
    }
  }, [formik.values.state, states]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Staff Successfully Created");
      router.push("/staffs");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      const { message }: any = error.data;
      toast.error(message);
    }
  }, [error]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <p className="text-2xl font-semibold pb-4">Add New Staff</p>
        <Card>
          <div className="flex flex-col gap-8 py-5">
            <TextField
              label="First name"
              placeholder="Name here"
              {...formik.getFieldProps("first_name")}
              error={
                formik.touched.first_name ? formik.errors.first_name : undefined
              }
            />
            <TextField
              label="Last name"
              placeholder="Name here"
              {...formik.getFieldProps("last_name")}
              error={
                formik.touched.last_name ? formik.errors.last_name : undefined
              }
            />
            <TextField
              label="Email"
              placeholder="Email here"
              {...formik.getFieldProps("email")}
              error={formik.touched.email ? formik.errors.email : undefined}
            />
            <TextField
              label="Password"
              placeholder="Password here"
              {...formik.getFieldProps("password")}
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
            />

            <label className="-mb-6 text-sm font-semibold">Phone</label>
            <PhoneInput
              // label="Phone"
              // placeholder="2333333333"
              {...formik.getFieldProps("phone_number")}
              // error={
              //   formik.touched.phone_number
              //     ? formik.errors.phone_number
              //     : undefined
              // }
              containerClass="bg-[#F1F1F1] rounded-lg"
              inputStyle={{
                background: "#F1F1F1",
                border: "none",
                width: "100%",
              }}
              inputProps={{
                name: "Phone",
                required: true,
              }}
              onChange={(e) => {
                if (verifyIsDigit(e)) {
                  formik.setFieldValue("phone_number", e);
                }
              }}
              country={"ng"}
              defaultErrorMessage="Phone Number is required"
            />

            <SelectField
              label="Role"
              disabled={!roles}
              options={
                !roles
                  ? []
                  : roles.data.map((i) => ({
                      label: i.title,
                      value: i.id,
                    }))
              }
              placeholder="Admin"
              {...formik.getFieldProps("role")}
              error={formik.touched.role ? formik.errors.role : undefined}
            />
            <TextField
              label="Address"
              placeholder="House Address here"
              {...formik.getFieldProps("address")}
              error={formik.touched.address ? formik.errors.address : undefined}
            />
            <div className="flex justify-between gap-3 max-sm:flex-col">
              <SelectField
                options={cities ? cities : []}
                disabled={!cities?.length}
                label="City"
                placeholder="City here"
                className="w-full"
                {...formik.getFieldProps("city")}
                error={formik.touched.city ? formik.errors.city : undefined}
              />
              <SelectField
                options={states ? states : []}
                disabled={!states?.length}
                label="State"
                placeholder="Lagos State"
                className="w-full"
                {...formik.getFieldProps("state")}
                error={formik.touched.state ? formik.errors.state : undefined}
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button
            title="Add Staff"
            className="!text-[16px] mt-6"
            size="large"
            type="submit"
            disabled={isLoading}
            loading={isLoading}
          />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default AddStaffForm;
