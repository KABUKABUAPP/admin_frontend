import Button from "@/components/ui/Button/Button";
import useClickOutside from "@/hooks/useClickOutside";
import React, { FC, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import TextField from "@/components/ui/Input/TextField/TextField";
import { useFormik, Form, FormikProvider } from "formik";
import { declineDriverRequestSchema } from "@/validationschemas/declineDriverRequestSchema";
import { useModalContext } from "@/contexts/ModalContext";
import DeclineGuarantorSuccessCard from "./DeclineGuarantorSuccessCard";
import { toast } from "react-toastify";
import { useVerifyGuarantorMutation } from "@/api-services/driversService";

const initialValues = {
  reason: "",
};


const DeclineGuarantorReasonCard: FC = () => {
  const { setModalContent } = useModalContext();
  const ref = useClickOutside<HTMLDivElement>(() => setModalContent(null));
  const [declineRequest, { error, isLoading, isSuccess }] =
    useVerifyGuarantorMutation();
  const router = useRouter();
  const { id } = router.query;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: declineDriverRequestSchema,
    onSubmit: (values) => {
      declineRequest({
        id: String(id),
        reason: values.reason,
        status: "decline",
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setModalContent(<DeclineGuarantorSuccessCard />);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      const { message, status }: any = error.data;
      toast.error(status);
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
              onClick={() => setModalContent(null)}
            />
            <Button
              title="Decline Guarantor"
              color="tetiary"
              size="large"
              loading={isLoading}
              disabled={isLoading}
              className="w-[43%] !text-[#EF2C5B]"
              type="submit"
            />
          </div>
        </motion.div>
      </Form>
    </FormikProvider>
  );
};

export default DeclineGuarantorReasonCard;
