import React, { FC } from "react";
import { useRouter } from "next/router";

import ArrowLeft from "@/components/icons/ArrowLeft";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import ForgotPasswordSchema from "@/validationschemas/ForgotPasswordSchema";
import { useFormik, Form, FormikProvider } from "formik";
import { useForgotPasswordMutation } from "@/api-services/authService";

const initialValues = {
  email: "" as string,
};

interface Props {
  handleSubmitFormSuccess: ()=>void;
}

const ForgotPasswordForm: FC<Props> = ({ handleSubmitFormSuccess }) => {
  const router = useRouter();
  const [forgotPassword, { data, isLoading, error, isError }] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values: typeof initialValues) => {
    forgotPassword(values)
    // handle form submit
    handleSubmitFormSuccess()
  };

  return (
    <div className="mx-auto max-w-[70%] p-2 pt-14 max-sm:max-w-full">
      <div className="relative">
        <Button
          title="Back"
          className="!absolute left-0"
          startIcon={<ArrowLeft />}
          variant="text"
          onClick={() => router.back()}
        />
        <p className="text-center text-xl font-medium">Forgot Password</p>
      </div>

      <FormikProvider value={formik}>
        <Form>
          <div>
            <p className="text-xs text-center font-medium py-4">
              Enter your email address
            </p>
          </div>

          <div className="px-10 max-sm:px-0">
            <div>
              <TextField
                label="Email"
                placeholder="Email here"
                {...formik.getFieldProps("email")}
                error={formik.errors.email}
              />
            </div>

            <Button title="Continue" className="w-full mt-36" type="submit" />
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default ForgotPasswordForm;
