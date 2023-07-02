import AppHead from "@/components/common/AppHead";
import ResetPasswordForm from "@/components/modules/auth/ResetPasswordForm";
import AuthLayout from "@/layouts/AuthLayout";
import { NextPage } from "next";
import React from "react";

const ResetPassword: NextPage = () => {
  return (
    <>
      <AppHead title="Kabukabu | Create Password" />
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
