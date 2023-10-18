import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import TextField from "@/components/ui/Input/TextField/TextField";
import CloseEyeIcon from "@/components/icons/CloseEyeIcon";
import OpenEyeIcon from "@/components/icons/OpenEyeIcon";
import Button from "@/components/ui/Button/Button";
import { useLoginMutation } from "@/api-services/authService";
import LoginValidations from "@/validationschemas/LoginSchema";
import { ACCESS_TOKEN } from "@/constants";
import { USER_TOKEN } from "@/constants";
import { useUserContext } from "@/contexts/UserContext";

import { useFormik, Form, FormikProvider } from "formik";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { User } from "@/models/User";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm: FC = () => {
  const router = useRouter();

  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const [login, { data, isLoading, error, isError }] = useLoginMutation();

  const { setUser } = useUserContext();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginValidations,
    onSubmit: (values) => handleFormSubmit(values),
  });

  const handleFormSubmit = (values: typeof initialValues) => {
    login(values);

    if (isError) console.log('e', error)
  };

  useEffect(() => {
    if (error && "status" in error) {
      if ("data" in error) {
        const { message } = error.data as { message: string };
        toast.error(message);
      } else toast.error("Oops! Something went wrong");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      const { accessTokens, __v, ...rest } = data.data.loggedInAdmin;
      Cookies.set(ACCESS_TOKEN, accessTokens);
      const {
        _id,
        name,
        updated_at,
        __v: v,
        level,
        ...permissions
      } = rest.role;
      const userData: User = {
        _id: rest._id,
        created_at: rest.created_at,
        email: rest.email,
        full_name: rest.full_name,
        isBlocked: rest.isBlocked,
        phone_number: rest.phone_number,
        role: rest.role.name,
        hasResetDefaultPassword: rest.status,
        updated_at: rest.updated_at,
        permissions: permissions,
        referral_code: data.data.loggedInAdmin.referral_code
      };
      Cookies.set(USER_TOKEN, JSON.stringify(userData));
      setUser({ ...userData });
      toast.success("Login Successful");
      if ( userData.role === 'executive marketer') {
        router.push('/marketer');
      } else {
        router.push("/dashboard");
      }
      
    }
  }, [data]);

  return (
    <div className="w-full max-w-[70%] mx-auto py-6 px-2 max-sm:max-w-full">
      <FormikProvider value={formik}>
        <div>
          <div className="relative w-8 h-8 mx-auto mb-6">
            <Image
              src={"/auth/padlock.png"}
              alt="login to kabukabu"
              layout="fill"
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
