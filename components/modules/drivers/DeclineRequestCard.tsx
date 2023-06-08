import Button from "@/components/ui/Button/Button";
import useClickOutside from "@/hooks/useClickOutside";
import React, { FC, useEffect } from "react";
import { motion } from "framer-motion";
import TextField from "@/components/ui/Input/TextField/TextField";
import { useFormik, Form, FormikProvider } from "formik";
import { declineDriverRequestSchema } from "@/validationschemas/declineDriverRequestSchema";
import { useApproveDeclineDriverMutation } from "@/api-services/driversService";
import { useModalContext } from "@/contexts/ModalContext";
import DeclineSuccessCard from "./DeclineSuccessCard";
import { toast } from "react-toastify";

const initialValues = {
  reason: "",
};

interface Props {
  id: string;
}

const DeclineRequestCard: FC<Props> = ({ id }) => {
  const [
    declineRequest,
    {
      data: declinedData,
      isSuccess: declinedSuccess,
      isLoading: declinedLoading,
      error
    },
  ] = useApproveDeclineDriverMutation();
  const { setModalContent } = useModalContext()
  const ref = useClickOutside<HTMLDivElement>(() => setModalContent(null));

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: declineDriverRequestSchema,
    onSubmit: (values) => {
      declineRequest({
        driverId: id,
        status: "decline",
        reason: values.reason,
      });
    },
  });

  useEffect(() => {
    if (declinedSuccess) {
      setModalContent(<DeclineSuccessCard />);
    }
  }, [declinedSuccess]);

  useEffect(()=>{
    if(error && "data" in error){
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
              onClick={()=>setModalContent(null)}
            />
            <Button
              title="Decline Request"
              color="tetiary"
              size="large"
              className="w-[43%] !text-[#EF2C5B]"
              loading={declinedLoading}
              disabled={declinedLoading}
              type="submit"
            />
          </div>
        </motion.div>
      </Form>
    </FormikProvider>
  );
};

export default DeclineRequestCard;
