import AppHead from "@/components/common/AppHead";
import CreatePasswordForm from "@/components/modules/auth/CreatePasswordForm";
import AuthLayout from "@/layouts/AuthLayout";
import { NextPage } from "next";
import React from "react";

const CreatePassword: NextPage = () => {
  return (
    <>
      <AppHead title="Kabukabu | Create Password" />
      <AuthLayout>
        <CreatePasswordForm />
      </AuthLayout>
    </>
  );
};

export default CreatePassword;
