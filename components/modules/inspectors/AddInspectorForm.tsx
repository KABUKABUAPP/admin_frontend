import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import Card from "@/components/common/Card";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { useFormik, Form, FormikProvider } from "formik";
import { toast } from "react-toastify";
import NewInspectorValidations from "@/validationschemas/AddInspectorSchema";
import SelectField from "@/components/ui/Input/SelectField";
import { useAddNewInspectorMutation } from "@/api-services/inspectorsService";
import { verifyIsDigit } from "@/utils";
import {
  useGetNigerianCityByStateQuery,
  useGetNigerianStatesQuery,
} from "@/api-services/geoLocationService";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const initialValues = {
  first_name: "",
  last_name: "",
  username: "",
  password: "",
  house_address: "",
  city: "",
  state: "",
  phone_number: "",
  email: "",
};

const AddInspectorForm: FC = () => {
  const [selectedStateName, setSelectedStateName] = useState<string>("");
  const [addInspector, { isLoading, isError, isSuccess }] =
    useAddNewInspectorMutation();

  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: NewInspectorValidations,
    onSubmit: (values) => {
      const stateName = states?.filter((s) => s.value == values.state)[0]
        .label as string;

        addInspector({ ...values, state: stateName });
    },
  });

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
    { id: formik.values.state },
    { skip: !formik.values.state, refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (formik.values.state && states?.length) {
      const stateName = states.filter((s) => s.value === formik.values.state)[0]
        ?.label as string;
      if (stateName) setSelectedStateName(stateName);
    }
  }, [formik.values.state, states]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Inspector Successfully Added");
      router.push("/inspectors");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Oops! Lets try that again!");
    }
  }, [isError]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <>
          <Card>
            <div className="flex flex-col gap-8 py-5">
              <TextField
                label="First name"
                placeholder="First name here"
                {...formik.getFieldProps("first_name")}
                error={
                  formik.touched.first_name
                    ? formik.errors.first_name
                    : undefined
                }
              />
              <TextField
                label="Last name(optional)"
                placeholder="Last name here"
                {...formik.getFieldProps("last_name")}
                error={
                  formik.touched.last_name ? formik.errors.last_name : undefined
                }
              />
              <TextField
                label="Username"
                placeholder="Username here"
                {...formik.getFieldProps("username")}
                error={
                  formik.touched.username ? formik.errors.username : undefined
                }
              />
              <label className="-mb-6 text-sm font-semibold">Phone(optional)</label>
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
              <TextField
                label="House Address"
                placeholder="House Address here"
                {...formik.getFieldProps("house_address")}
                error={
                  formik.touched.house_address
                    ? formik.errors.house_address
                    : undefined
                }
              />
              <div className="flex justify-between gap-3 max-sm:flex-col">

                <div className="w-full">
                  <SelectField
                    options={states ? states : []}
                    disabled={!states?.length}
                    label="State"
                    placeholder="Lagos State"
                    className="w-full"
                    {...formik.getFieldProps("state")}
                    error={
                      formik.touched.state ? formik.errors.state : undefined
                    }
                  />
                </div>
                <div className="w-full">
                  <SelectField
                    options={cities ? cities : []}
                    disabled={!cities?.length}
                    label="City"
                    placeholder="City here"
                    className="w-full"
                    {...formik.getFieldProps("city")}
                    error={formik.touched.city ? formik.errors.city : undefined}
                  />
                </div>
              </div>

              <TextField
                label="Email Address(optional)"
                placeholder="Email address here"
                {...formik.getFieldProps("email")}
                error={formik.touched.email ? formik.errors.email : undefined}
              />
              
              <TextField
                label="Create Password"
                placeholder="Create Password"
                {...formik.getFieldProps("password")}
                error={
                  formik.touched.password ? formik.errors.password : undefined
                }
              />
            </div>
          </Card>

          <Button
            title="Create Inspector Account"
            className="w-full !text-[16px] mt-6"
            size="large"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            onClick={() => {
              console.log("clicked");
              if (formik.isValid) formik.submitForm();
            }}
          />
        </>
      </Form>
    </FormikProvider>
  );
};

export default AddInspectorForm;
