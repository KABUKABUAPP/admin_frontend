import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import Card from "@/components/common/Card";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { useFormik, Form, FormikProvider } from "formik";
import { toast } from "react-toastify";
import { nigerianStates } from "@/constants";
import NewInspectorValidations from "@/validationschemas/AddInspectorSchema";
import SelectField from "@/components/ui/Input/SelectField";
import { useAddNewInspectorMutation } from "@/api-services/inspectorsService";
import { verifyIsDigit } from "@/utils";

const initialValues = {
  first_name: "",
  last_name: "",
  house_address: "",
  city: "",
  state: "",
  phone_number: "",
  email: "",
};

const AddInspectorForm: FC = () => {
  const [addInspector, { isLoading, isError, isSuccess }] =
    useAddNewInspectorMutation();

  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: NewInspectorValidations,
    onSubmit: (values) => {
      addInspector(values);
    },
  });

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
                label="Last name"
                placeholder="Last name here"
                {...formik.getFieldProps("last_name")}
                error={
                  formik.touched.last_name ? formik.errors.last_name : undefined
                }
              />
              <TextField
                label="Phone Number"
                placeholder="phone here"
                {...formik.getFieldProps("phone_number")}
                onChange={(e) => {
                  if (verifyIsDigit(e.target.value)) {
                    formik.setFieldValue("phone_number", e.target.value);
                  }
                }}
                error={
                  formik.touched.phone_number
                    ? formik.errors.phone_number
                    : undefined
                }
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
                  <TextField
                    label="City"
                    placeholder="Lagos Island"
                    {...formik.getFieldProps("city")}
                    error={formik.touched.city ? formik.errors.city : undefined}
                  />
                </div>

                <div className="w-full">
                  <SelectField
                    label="State"
                    placeholder="Lagos State"
                    options={[...nigerianStates].map((i) => ({
                      label: i,
                      value: i,
                    }))}
                    {...formik.getFieldProps("state")}
                    error={
                      formik.touched.state ? formik.errors.state : undefined
                    }
                  />
                </div>
              </div>

              <TextField
                label="Email Address"
                placeholder="Email address here"
                {...formik.getFieldProps("email")}
                error={formik.touched.email ? formik.errors.email : undefined}
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
