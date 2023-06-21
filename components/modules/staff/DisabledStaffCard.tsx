import React, { FC, useEffect } from "react";

import useClickOutside from "@/hooks/useClickOutside";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import { useDisableStaffMutation } from "@/api-services/staffService";
import { useFormik, FormikProvider, Form } from "formik";
import { disableStaffValidationSchema } from "@/validationschemas/DisableStaffSchema";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const initialValues = {
  reason: "",
};

interface Props {
  handleClose: () => void;
}

const DisabledStaffCard: FC<Props> = ({ handleClose }) => {
  const ref = useClickOutside<HTMLDivElement>(() => handleClose());
  const { id } = useRouter().query

  const [disableStaff, { isSuccess, isLoading, error }] =
    useDisableStaffMutation();

  const formik = useFormik({
    initialValues,
    validationSchema: disableStaffValidationSchema,
    onSubmit: (values) => {
      disableStaff({staffId: String(id)})
    },
  });

  useEffect(()=>{
    if(isSuccess){
      toast.success('Staff Successfully Disabled')
      handleClose()
    }
  },[isSuccess])

  useEffect(()=>{
    if(error && 'data' in error){
      const { message }: any = error.data
      toast.error(message)
    }
  },[error])

  return (
    <FormikProvider value={formik}>
      <Form className="w-full">
        <motion.div
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1, transition: { duration: 0.2 } }}
          viewport={{ once: true }}
          ref={ref}
          className="bg-[#FFFFFF] rounded-xl w-full mx-auto max-w-[500px] flex flex-col px-4 justify-center items-center p-2 py-5 gap-4"
        >
          <p className="font-bold text-center text-sm">Disable Staff</p>
          <p className="font-bold text-center text-sm">
            Are you sure you want to disable this staff?
          </p>
          <p className="font-bold text-center text-sm">
            This action cannot be undone
          </p>
          <div className="w-full flex flex-col gap-2 pb-9">
            <p className="font-bold text-lg">Reason</p>
            <TextField
              placeholder="Select Reason"
              {...formik.getFieldProps("reason")}
              error={formik.touched.reason ? formik.errors.reason : undefined}
            />
          </div>
          <div className="flex gap-5 w-full flex-wrap justify-center items-center">
            <Button
              title="Cancel"
              size="large"
              className="w-[43%] !text-base"
              onClick={handleClose}
            />
            <Button
              title="Disable Staff"
              size="large"
              type="submit"
              className="w-[43%] !text-base !text-[#EF2C5B]"
              color="tetiary"
              loading={isLoading}
              disabled={isLoading}
            />
          </div>
        </motion.div>
      </Form>
    </FormikProvider>
  );
};

export default DisabledStaffCard;
