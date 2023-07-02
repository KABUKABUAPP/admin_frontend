import React, { FC, useState } from "react";

import TextField from "@/components/ui/Input/TextField/TextField";
import CloseEyeIcon from "@/components/icons/CloseEyeIcon";
import OpenEyeIcon from "@/components/icons/OpenEyeIcon";
import Button from "@/components/ui/Button/Button";

import { useFormik, Form, FormikProvider } from "formik";
import { toast } from "react-toastify";
import { CreateResetPasswordValidation } from "@/validationschemas/CreateResetPasswordValidation";

const initialValues = {
  new_password: "",
  confirm_password: "",
  otp: "",
};

const CreatePasswordForm: FC = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);

  const formik = useFormik({
    initialValues,
    validationSchema: CreateResetPasswordValidation,
    onSubmit: (values) => {},
  });

  return (
    <div className="w-full max-w-[70%] mx-auto py-6 px-2 max-sm:max-w-full">
      <p className="text-center mb-2 text-3xl font-medium">Create Password</p>
      <p className="text-center text-sm font-medium mb-6">
        Set new password tot sign in
      </p>
      <FormikProvider value={formik}>
        <Form>
          <div className="flex flex-col gap-8 w-full">
            <TextField
              label="Enter New Password"
              placeholder="Enter here"
              {...formik.getFieldProps("new_password")}
              type={hidePassword ? "password" : "text"}
              endIcon={
                hidePassword ? (
                  <CloseEyeIcon handleClick={() => setHidePassword(false)} />
                ) : (
                  <OpenEyeIcon handleClick={() => setHidePassword(true)} />
                )
              }
              error={
                formik.touched.new_password
                  ? formik.errors.new_password
                  : undefined
              }
            />
            <TextField
              label="Confirm New Password"
              placeholder="Enter here"
              {...formik.getFieldProps("confirm_password")}
              error={
                formik.touched.confirm_password
                  ? formik.errors.confirm_password
                  : undefined
              }
              type={hideConfirmPassword ? "password" : "text"}
              endIcon={
                hideConfirmPassword ? (
                  <CloseEyeIcon
                    handleClick={() => setHideConfirmPassword(false)}
                  />
                ) : (
                  <OpenEyeIcon
                    handleClick={() => setHideConfirmPassword(true)}
                  />
                )
              }
            />
            <TextField
              label="Input OTP"
              placeholder="Enter here"
              {...formik.getFieldProps("otp")}
              error={formik.touched.otp ? formik.errors.otp : undefined}
              type="password"
            />
            <div>
              <Button
                size="small"
                title="Resend OTP"
                variant="text"
                className="-mt-4"
              />
            </div>

            <div>
              <Button title="Continue" className="w-full" size="large" />
            </div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default CreatePasswordForm;
