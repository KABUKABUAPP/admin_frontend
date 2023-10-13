import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";

import { motion } from "framer-motion";
import useClickOutside from "@/hooks/useClickOutside";
import { useModalContext } from "@/contexts/ModalContext";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { useFormik, FormikProvider, Form } from "formik";
import { EditDriverFeeValidation } from "@/validationschemas/EditDriverFeeValidation";
import { verifyIsDigit } from "@/utils";
import { useUpdateDriverFeeMutation } from "@/api-services/farePricesService";
import { toast } from "react-toastify";

const initialValues = {
  monthlyPayment: "",
  sharpPayment: "",
};

interface Props {
  currentMontlyPayment: string;
  currentSharpPayment: string;
}

const EditDriverFeeForm: FC<Props> = ({
  currentMontlyPayment,
  currentSharpPayment,
}) => {
  const { setModalContent } = useModalContext();
  const router = useRouter();
  const {
    id,
    monthlyPayment,
    sharpPayment,
    baseFare,
    distance,
    time,
    waitingTime,
    vat,
    bookingFee,
    surgeMultiplier,
    state,
    country,
  } = useRouter().query;
  const ref = useClickOutside<HTMLDivElement>(() => {
    router.push(`/fare-prices/${id}`, undefined, { shallow: true });
    setModalContent(null);
  });
  const [updateDriverFee, { isLoading, isSuccess, error }] =
    useUpdateDriverFeeMutation();

  const formik = useFormik({
    initialValues,
    validationSchema: EditDriverFeeValidation,
    onSubmit: (values) => {
      const payload = {
        state: state,
        country: country,
        base_fare: baseFare,
        distance_per_km: distance,
        time_per_min: time,
        state_levy: vat,
        booking_fee: bookingFee,
        waiting_time_per_min: waitingTime,
        surge_multiplier: Number(surgeMultiplier),
        driver_fee_monthly_payment: Number(values.monthlyPayment),
        driver_fee_sharp_payment: Number(values.sharpPayment),
        payment_types_available: {
          cash: true,
          wallet: true,
          card: true,
        },
      };

      updateDriverFee({ payload, id: String(id) });
    },
  });

  useEffect(() => {
    if (error && "data" in error) {
      const { message }: any = error.data;
      toast.error(message);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      router.push(`/fare-prices/${id}`, undefined, { shallow: true });
      toast.success("Driver fee updated succesfully");
      setModalContent(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (router.query) {
      formik.setFieldValue("monthlyPayment", monthlyPayment);
      formik.setFieldValue("sharpPayment", sharpPayment);
    }
  }, [router.query]);

  return (
    <FormikProvider value={formik}>
      <Form className="w-full">
        <motion.div
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1, transition: { duration: 0.2 } }}
          viewport={{ once: true }}
          ref={ref}
          className="mx-auto bg-[#FFFFFF] rounded-xl w-full max-w-[650px] flex flex-col justify-center p-4 py-5 gap-12"
        >
          <p className="text-center text-base font-bold">Update Driver Fee</p>
          <div className="flex gap-4 max-sm:flex-col">
            <div style={{ flex: 1 }}>
              <TextField
                label="Monthly Payment [per month]"
                {...formik.getFieldProps("monthlyPayment")}
                error={
                  formik.touched.monthlyPayment
                    ? formik.errors.monthlyPayment
                    : undefined
                }
                onChange={(e) => {
                  if (verifyIsDigit(e.target.value)) {
                    formik.setFieldValue("monthlyPayment", e.target.value);
                  }
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <TextField
                label="Sharp Payment [per month]"
                {...formik.getFieldProps("sharpPayment")}
                error={
                  formik.touched.sharpPayment
                    ? formik.errors.sharpPayment
                    : undefined
                }
                onChange={(e) => {
                  if (verifyIsDigit(e.target.value)) {
                    formik.setFieldValue("sharpPayment", e.target.value);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex max-sm:flex-col gap-4 px-8 max-sm:px-0">
            <div style={{ flex: 1 }}>
              <Button
                title="Cancel"
                color="tetiary"
                className="w-full"
                size="large"
                onClick={() => {
                  setModalContent(null);
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Button
                title="Save Changes"
                className="w-full"
                size="large"
                type="submit"
                disabled={isLoading}
                loading={isLoading}
              />
            </div>
          </div>
        </motion.div>
      </Form>
    </FormikProvider>
  );
};

export default EditDriverFeeForm;
