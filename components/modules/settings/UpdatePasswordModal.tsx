import React, { FC, useEffect, useState } from "react";
import CloseEyeIcon from "@/components/icons/CloseEyeIcon";
import OpenEyeIcon from "@/components/icons/OpenEyeIcon";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { useFormik, Form, FormikProvider } from "formik";
import useClickOutside from "@/hooks/useClickOutside";
import { useModalContext } from "@/contexts/ModalContext";
import CloseIcon from "@/components/icons/CloseIcon";
import { useUpdatePasswordMutation } from "@/api-services/settingsService";
import { updatePasswordValidationSchema } from "@/validationschemas/UpdatePasswordValidationSchema";
import { toast } from "react-toastify";

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const UpdatePasswordModal: FC = () => {
  const [hideCurrent, setHideCurrent] = useState(true);
  const [hideNew, setHideNew] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const { setModalContent } = useModalContext();
  const ref = useClickOutside<HTMLDivElement>(() => setModalContent(null));
  const [updatePassword, { isSuccess, isLoading, error }] =
    useUpdatePasswordMutation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPassMismatch, setisPassMismatch] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: updatePasswordValidationSchema,
    onSubmit: (values) => {
      updatePassword({
        current_password: values.currentPassword,
        new_password: values.newPassword,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password successfully updated");
      setModalContent(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      const { message }: any = error.data;
      toast.error(message);
    }
  }, [error]);

  useEffect(() => {
    if (formik.values.newPassword && formik.values.confirmNewPassword) {
      if (formik.values.confirmNewPassword !== formik.values.newPassword) {
        setisPassMismatch(true);
      } else {
        setisPassMismatch(false);
      }
    } else {
      setisPassMismatch(false);
    }
  }, [formik.values.confirmNewPassword, formik.values.newPassword]);

  return (
    <FormikProvider value={formik}>
      <Form className="w-full">
        <div
          ref={ref}
          className="flex flex-col gap-6 w-full mx-auto max-w-[400px] rounded-lg bg-[#FFFFFF] p-4 py-7 pb-12 relative"
        >
          <span
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setModalContent(null)}
          >
            <CloseIcon />
          </span>
          <p className="text-base font-medium text-center">Update Password</p>

          <TextField
            label="Enter current Password"
            type={hideCurrent ? "password" : "text"}
            endIcon={
              hideCurrent ? (
                <CloseEyeIcon handleClick={() => setHideCurrent(false)} />
              ) : (
                <OpenEyeIcon handleClick={() => setHideCurrent(true)} />
              )
            }
            {...formik.getFieldProps("currentPassword")}
            error={
              formik.touched.currentPassword
                ? formik.errors.currentPassword
                : undefined
            }
          />

          <TextField
            label="Enter new Password"
            type={hideNew ? "password" : "text"}
            endIcon={
              hideNew ? (
                <CloseEyeIcon handleClick={() => setHideNew(false)} />
              ) : (
                <OpenEyeIcon handleClick={() => setHideNew(true)} />
              )
            }
            {...formik.getFieldProps("newPassword")}
            error={
              formik.touched.newPassword ? formik.errors.newPassword : undefined
            }
          />

          <TextField
            label="Confirm new Password"
            type={hideConfirm ? "password" : "text"}
            endIcon={
              hideConfirm ? (
                <CloseEyeIcon handleClick={() => setHideConfirm(false)} />
              ) : (
                <OpenEyeIcon handleClick={() => setHideConfirm(true)} />
              )
            }
            {...formik.getFieldProps("confirmNewPassword")}
            error={
              isPassMismatch
                ? "Passwords do not match"
                : formik.touched.confirmNewPassword
                ? formik.errors.confirmNewPassword
                : undefined
            }
          />

          <Button
            title="Update Password"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default UpdatePasswordModal;
