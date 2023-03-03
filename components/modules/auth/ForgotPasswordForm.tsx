import React, { FC } from "react";
import { useRouter } from "next/router";

import ArrowLeft from "@/components/icons/ArrowLeft";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import ForgotPasswordSchema from "@/validationschemas/ForgotPasswordSchema";
import { useFormik, Form, FormikProvider } from "formik";

const initialValues = {
  email: "" as string,
};

interface Props {
  handleSubmitFormSuccess: ()=>void;
}

const ForgotPasswordForm: FC<Props> = ({ handleSubmitFormSuccess }) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values: typeof initialValues) => {
    // handle form submit
    handleSubmitFormSuccess()
  };

  return (
    <div className="mx-auto max-w-sm p-2 pt-14">
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

          <div className="px-10">
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
