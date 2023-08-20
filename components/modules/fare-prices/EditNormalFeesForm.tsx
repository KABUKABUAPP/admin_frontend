import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";

import { motion } from "framer-motion";
import useClickOutside from "@/hooks/useClickOutside";
import { useModalContext } from "@/contexts/ModalContext";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { useFormik, FormikProvider, Form } from "formik";
import { EditNormalFeesValidation } from "@/validationschemas/EditNormalFeesValidation";
import { verifyIsDigit } from "@/utils";
import { useUpdateFarePriceMutation } from "@/api-services/farePricesService";
import { toast } from "react-toastify";

const initialValues = {
  baseFare: "",
  time: "",
  bookingFee: "",
  distance: "",
  lasgLevy: "",
  waitingTime: "",
};

const EditNormalFeesForm: FC = () => {
  const { setModalContent } = useModalContext();
  const router = useRouter();
  const {
    id,
    monthlyPayment,
    sharpPayment,
    baseFare,
    distance,
    time,
    vat,
    bookingFee,
    waitingTime,
    surgeMultiplier,
    state,
    country
  } = useRouter().query;
  const ref = useClickOutside<HTMLDivElement>(() => {
    router.push(`/fare-prices/${id}`, undefined, { shallow: true });
    setModalContent(null);
  });
  const [updateFare, { isLoading, isSuccess, error }] =
    useUpdateFarePriceMutation();

  const formik = useFormik({
    initialValues,
    validationSchema: EditNormalFeesValidation,
    onSubmit: (values) => {
      const payload = {
        state: state,
        country: country,
        base_fare: Number(values.baseFare),
        distance_per_km: Number(values.distance),
        time_per_min: Number(values.time),
        state_levy: Number(values.lasgLevy),
        booking_fee: Number(values.bookingFee),
        waiting_time_per_min: Number(values.waitingTime),
        surge_multiplier: Number(surgeMultiplier),
        driver_fee_monthly_payment: Number(monthlyPayment),
        driver_fee_sharp_payment: Number(sharpPayment),
        payment_types_available: {
          cash: true,
          wallet: true,
          card: true,
        },
      };

      updateFare({ payload, id: String(id) });
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
      toast.success("Fare price updated succesfully");
      router.push(`/fare-prices/${id}`, undefined, { shallow: true });
      setModalContent(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (router.query) {
      formik.setFieldValue("baseFare", baseFare);
      formik.setFieldValue("time", time);
      formik.setFieldValue("bookingFee", bookingFee);
      formik.setFieldValue("distance", distance);
      formik.setFieldValue("lasgLevy", vat);
      formik.setFieldValue("waitingTime", waitingTime);
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
          className="mx-auto bg-[#FFFFFF] rounded-xl w-full max-w-[850px] flex flex-col justify-center p-4 py-5 gap-4"
        >
          <p className="text-center text-base font-bold">Update Normal Fees</p>
          <div className="flex gap-4 max-sm:flex-col">
            <div style={{ flex: 1 }}>
              <TextField
                label="Base Fare"
                {...formik.getFieldProps("baseFare")}
                error={
                  formik.touched.baseFare ? formik.errors.baseFare : undefined
                }
                onChange={(e) => {
                  if (verifyIsDigit(e.target.value)) {
                    formik.setFieldValue("baseFare", e.target.value);
                  }
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <TextField
                label="Distance"
                error={
                  formik.touched.distance ? formik.errors.distance : undefined
                }
                {...formik.getFieldProps("distance")}
                onChange={(e) => {
                  if (verifyIsDigit(e.target.value)) {
                    formik.setFieldValue("distance", e.target.value);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex gap-4 max-sm:flex-col">
            <div style={{ flex: 1 }}>
              <TextField
                label="Time [per min]"
                {...formik.getFieldProps("time")}
                error={
                  formik.touched.time
                    ? formik.errors.time
                    : undefined
                }
                onChange={(e) => {
                  if (verifyIsDigit(e.target.value)) {
                    formik.setFieldValue("time", e.target.value);
                  }
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <TextField
                label="VAT"
                {...formik.getFieldProps("lasgLevy")}
                error={
                  formik.touched.lasgLevy ? formik.errors.lasgLevy : undefined
                }
                onChange={(e) => {
                  if (verifyIsDigit(e.target.value)) {
                    formik.setFieldValue("lasgLevy", e.target.value);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex gap-4 max-sm:flex-col">
            <div style={{ flex: 1 }}>
              <TextField
                label="Booking fee"
                {...formik.getFieldProps("bookingFee")}
                error={
                  formik.touched.bookingFee
                    ? formik.errors.bookingFee
                    : undefined
                }
                onChange={(e) => {
                  if (verifyIsDigit(e.target.value)) {
                    formik.setFieldValue("bookingFee", e.target.value);
                  }
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <TextField
                label="Waiting time [per min]"
                {...formik.getFieldProps("waitingTime")}
                error={
                  formik.touched.waitingTime
                    ? formik.errors.waitingTime
                    : undefined
                }
                onChange={(e) => {
                  if (verifyIsDigit(e.target.value)) {
                    formik.setFieldValue("waitingTime", e.target.value);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex max-sm:flex-col gap-4 px-8 max-sm:px-0 mt-8">
            <div style={{ flex: 1 }}>
              <Button
                title="Cancel"
                color="tetiary"
                className="w-full"
                size="large"
                onClick={() => {
                  router.push(`/fare-prices/${id}`, undefined, {
                    shallow: true,
                  });
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

export default EditNormalFeesForm;
