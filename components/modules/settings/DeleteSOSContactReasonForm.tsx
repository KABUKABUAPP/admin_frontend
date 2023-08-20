import React, { FC, useEffect } from "react";

import useClickOutside from "@/hooks/useClickOutside";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import { useFormik, FormikProvider, Form } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { DeleteSosContactValidation } from "@/validationschemas/DeleteSosContactValidation";
import { useModalContext } from "@/contexts/ModalContext";

const initialValues = {
  reason: "",
};

const DeleteSOSContactReasonForm: FC = () => {
  const { setModalContent } = useModalContext();
  const ref = useClickOutside<HTMLDivElement>(() => setModalContent(null));

  const formik = useFormik({
    initialValues,
    validationSchema: DeleteSosContactValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
          <p className="font-bold text-center text-sm">Disable SOS</p>
          <p className="font-bold text-center text-sm">
            Are you sure you want to disable this SOS?
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
              onClick={() => setModalContent(null)}
            />
            <Button
              title="Delete SOS"
              size="large"
              type="submit"
              className="w-[43%] !text-base !text-[#EF2C5B]"
              color="tetiary"
            />
          </div>
        </motion.div>
      </Form>
    </FormikProvider>
  );
};

export default DeleteSOSContactReasonForm;
