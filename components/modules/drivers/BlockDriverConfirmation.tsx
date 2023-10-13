import React, { FC, useEffect } from "react";

import Button from "@/components/ui/Button/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { motion } from "framer-motion";
import TextField from "@/components/ui/Input/TextField/TextField";
import { useModalContext } from "@/contexts/ModalContext";
import { useToggleBlockDriverMutation } from "@/api-services/driversService";
import { useFormik, Form, FormikProvider } from "formik";
import { BlockDriverValidation } from "@/validationschemas/BlockDriverSchema";
import BlockDriverSuccessCard from "./BlockDriverSuccessCard";
import { toast } from "react-toastify";

const initalValues = {
  reason: "",
};

interface Props {
  driverId: string;
}

const BlockDriverConfirmation: FC<Props> = ({ driverId }) => {
  const { setModalContent } = useModalContext();
  const ref = useClickOutside<HTMLDivElement>(() => setModalContent(null));
  const [blockDriver, { isLoading, isSuccess, error }] =
    useToggleBlockDriverMutation();

  const formik = useFormik({
    initialValues: initalValues,
    validationSchema: BlockDriverValidation,
    onSubmit: (values) => {
      blockDriver({ driverId, reason: values.reason });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setModalContent(<BlockDriverSuccessCard />)
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      const { message, status }: any = error.data;
      if (message) toast.error(message);
      if (status) toast.error(status);
    }
  }, [error]);

  return (
    <FormikProvider value={formik}>
      <Form className="w-full">
        <motion.div
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1, transition: { duration: 0.2 } }}
          viewport={{ once: true }}
          ref={ref}
          className="mx-auto bg-[#FFFFFF] rounded-xl w-full max-w-[450px] flex flex-col justify-center items-center p-4 py-5 gap-12"
        >
          <p className="font-bold text-center text-sm">Block Driver</p>

          <div>
            <p className="font-bold text-center text-sm">
              Are you sure you want to block this driver?
            </p>
          </div>

          <div className="w-full">
            <p className="font-bold text-base mb-1">Reason</p>
            <div>
              <TextField
                placeholder="Select Reason"
                {...formik.getFieldProps("reason")}
                error={formik.touched.reason ? formik.errors.reason : undefined}
              />
            </div>
          </div>

          <div className="flex gap-5 w-full flex-wrap justify-center items-center">
            <Button
              title="Cancel"
              size="large"
              color="primary"
              className="w-[43%]"
              onClick={() => setModalContent(null)}
            />
            <Button
              title="Block Driver"
              color="tetiary"
              size="large"
              className="w-[43%] !text-[#EF2C5B]"
              loading={isLoading}
              disabled={isLoading}
              type="submit"
            />
          </div>
        </motion.div>
      </Form>
    </FormikProvider>
  );
};

export default BlockDriverConfirmation;
