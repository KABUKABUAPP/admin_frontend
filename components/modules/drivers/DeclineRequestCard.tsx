import Button from "@/components/ui/Button/Button";
import useClickOutside from "@/hooks/useClickOutside";
import React, { FC } from "react";
import { motion } from "framer-motion";
import TextField from "@/components/ui/Input/TextField/TextField";
import SelectField from "@/components/ui/Input/SelectField";
import { useFormik, Form, FormikProvider } from "formik";
import { declineDriverRequestSchema } from "@/validationschemas/declineDriverRequestSchema";

const initialValues = {
  reason: "",
};

interface Props {
  handleClose: () => void;
  handleDecline: (reason: string) => void;
  isLoading: boolean;
}

const DeclineRequestCard: FC<Props> = ({
  handleClose,
  handleDecline,
  isLoading,
}) => {
  const ref = useClickOutside<HTMLDivElement>(() => handleClose());

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: declineDriverRequestSchema,
    onSubmit: (values) => {
      handleDecline(values.reason)
    },
  });

  console.log("sub", isLoading)

  return (
    <FormikProvider value={formik} >
      <Form className="w-full">
        <motion.div
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1, transition: { duration: 0.2 } }}
          viewport={{ once: true }}
          ref={ref}
          className="bg-[#FFFFFF] mx-auto rounded-xl w-full max-w-[450px] flex flex-col justify-center items-center p-4 py-5 gap-12"
        >
          <p className="font-bold text-center text-sm">Decline Request</p>

          <div>
            <p className="font-bold text-center text-sm">
              Are you sure you want to decline this request?
            </p>
            <p className="font-bold text-center text-sm">
              This action cannot be undone
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
              onClick={handleClose}
            />
            <Button
              title="Decline Request"
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

export default DeclineRequestCard;
