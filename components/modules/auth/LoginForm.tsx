import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import TextField from "@/components/ui/Input/TextField/TextField";
import CloseEyeIcon from "@/components/icons/CloseEyeIcon";
import OpenEyeIcon from "@/components/icons/OpenEyeIcon";
import Button from "@/components/ui/Button/Button";
import { useLoginMutation } from "@/api-services/authService";

import { useFormik, Form, FormikProvider } from "formik";
import LoginValidations from "@/validationschemas/LoginSchema";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm: FC = () => {
  const router = useRouter();

  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const [login, { data, isLoading, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginValidations,
    onSubmit: (values) => handleFormSubmit(values),
  });

  const handleFormSubmit = (values: typeof initialValues) => {
    login(values);
  };

  useEffect(() => {
    if (error && "status" in error) {
      console.log(error.data);
    }
  }, [error]);

  return (
    <div className="w-full max-w-xs mx-auto py-6 px-2">
      <FormikProvider value={formik}>
        <div>
          <div className="relative w-8 h-8 mx-auto mb-6">
            <Image
              src={"/auth/padlock.png"}
              alt="login to kabukabu"
              fill
              style={{ objectFit: "contain", objectPosition: "50% 50%" }}
            />
          </div>
        </div>

        <Form>
          <div className="mb-8">
            <TextField
              label="Email"
              placeholder="Enter here"
              {...formik.getFieldProps("email")}
              error={formik.touched.email ? formik.errors.email : undefined}
            />
          </div>

          <div className="mb-2">
            <TextField
              label="Password"
              placeholder="Enter Password"
              type={hidePassword ? "password" : "text"}
              endIcon={
                hidePassword ? (
                  <CloseEyeIcon handleClick={() => setHidePassword(false)} />
                ) : (
                  <OpenEyeIcon handleClick={() => setHidePassword(true)} />
                )
              }
              {...formik.getFieldProps("password")}
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
            />
          </div>

          <Button
            title="Forgot Password?"
            variant="text"
            size="small"
            onClick={() => {
              router.push("/auth/forgot-password");
            }}
          />

          <Button
            title="Sign In"
            className="w-full mt-16"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          />
        </Form>
      </FormikProvider>
    </div>
  );
};

export default LoginForm;
