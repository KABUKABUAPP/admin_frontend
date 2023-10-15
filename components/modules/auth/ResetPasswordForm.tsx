import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import TextField from "@/components/ui/Input/TextField/TextField";
import CloseEyeIcon from "@/components/icons/CloseEyeIcon";
import OpenEyeIcon from "@/components/icons/OpenEyeIcon";
import Button from "@/components/ui/Button/Button";
import { CreateResetPasswordValidation } from "@/validationschemas/CreateResetPasswordValidation";
import {
  useResetPasswordMutation,
  useGenerateOTPMutation,
} from "@/api-services/authService";

import { useFormik, Form, FormikProvider } from "formik";
import { toast } from "react-toastify";

const initialValues = {
  new_password: "",
  confirm_password: "",
  otp: "",
};

const CreatePasswordForm: FC = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);
  const [isPassMismatch, setisPassMismatch] = useState(false);
  const router = useRouter();

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();
  const [
    resendOTP,
    {
      isLoading: resendOTPLoading,
      isSuccess: resendOTPSuccess,
      error: resendOTPError,
    },
  ] = useGenerateOTPMutation();

  const formik = useFormik({
    initialValues,
    validationSchema: CreateResetPasswordValidation,
    onSubmit: (values) => {
      resetPassword({
        password: values.new_password,
        otp: values.otp,
      });
    },
  });

  useEffect(() => {
    if (resendOTPError && "data" in resendOTPError) {
      const { message }: any = resendOTPError.data;
      toast.error(message);
    }
  }, [resendOTPError]);

  useEffect(() => {
    if (resendOTPSuccess) {
      toast.success("OTP successfully resent, please check your email");
    }
  }, [resendOTPSuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Successfully Changed, You Will Be Redirected To The Login Page");

      setTimeout(() => {
        router.push("/auth/login");
      }, 4000)
      
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      const { message }: any = error.data;
      toast.error(message);
    }
  }, [error]);

  useEffect(() => {
    if (formik.values.new_password && formik.values.confirm_password) {
      if (formik.values.confirm_password !== formik.values.new_password) {
        setisPassMismatch(true);
      } else {
        setisPassMismatch(false);
      }
    } else {
      setisPassMismatch(false);
    }
  }, [formik.values.confirm_password, formik.values.new_password]);

  return (
    <div className="w-full max-w-[70%] mx-auto py-6 px-2 max-sm:max-w-full">
      <p className="text-center mb-2 text-3xl font-medium">Reset Password</p>
      <p className="text-center text-sm font-medium mb-6">
        Set new password to sign in
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
                isPassMismatch
                  ? "Passwords do not match"
                  : formik.touched.confirm_password
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
                loading={resendOTPLoading}
                disabled={resendOTPLoading}
                onClick={resendOTP}
              />
            </div>

            <div>
              <Button
                title="Continue"
                className="w-full"
                size="large"
                type="submit"
                loading={isLoading}
                disabled={isLoading}
              />
            </div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default CreatePasswordForm;
