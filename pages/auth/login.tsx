import { NextPage } from "next";
import React from "react";

import AuthLayout from "@/layouts/AuthLayout";
import AppHead from "@/components/common/AppHead";
import LoginForm from "@/components/modules/auth/LoginForm";

const Login: NextPage = () => {
  return (
    <>
      <AppHead title="Kabukabu | Login" />
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default Login;
