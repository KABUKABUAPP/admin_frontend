import React, { FC, useState } from "react";
import CloseEyeIcon from "@/components/icons/CloseEyeIcon";
import OpenEyeIcon from "@/components/icons/OpenEyeIcon";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { useFormik, Form, FormikProvider } from "formik";
import useClickOutside from "@/hooks/useClickOutside";
import { useModalContext } from "@/contexts/ModalContext";
import CloseIcon from "@/components/icons/CloseIcon";

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const UpdatePasswordModal: FC = () => {
  const [hideCurrent, setHideCurrent] = useState(true);
  const [hideNew, setHideNew] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const { setModalContent } = useModalContext()
  const ref = useClickOutside<HTMLDivElement>(()=>setModalContent(null))

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {},
  });

  return (
    <FormikProvider value={formik}>
      <Form className="w-full">
        <div ref={ref} className="flex flex-col gap-6 w-full mx-auto max-w-[400px] rounded-lg bg-[#FFFFFF] p-4 py-7 pb-12 relative">
            <span className="absolute top-3 right-3 cursor-pointer" onClick={()=>setModalContent(null)}><CloseIcon /></span>
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
          />

          <Button title="Update Password" />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default UpdatePasswordModal;
