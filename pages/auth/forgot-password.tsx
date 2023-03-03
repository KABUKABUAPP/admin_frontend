import { NextPage } from "next";
import React from "react";

import AppHead from "@/components/common/AppHead";
import AuthLayout from "@/layouts/AuthLayout";
import ForgotPasswordContainer from "@/components/modules/auth/ForgotPasswordContainer";

const ForgotPassword: NextPage = () => {
  return (
    <>
      <AppHead title="Kabukabu | Forgot Password" />
      <AuthLayout>
        <ForgotPasswordContainer />
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
