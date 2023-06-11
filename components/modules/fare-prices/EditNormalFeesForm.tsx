import React, { FC } from "react";

import { motion } from "framer-motion";
import useClickOutside from "@/hooks/useClickOutside";
import { useModalContext } from "@/contexts/ModalContext";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { useFormik, FormikProvider, Form } from "formik";
import { EditNormalFeesValidation } from "@/validationschemas/EditNormalFeesValidation";
import { verifyIsDigit } from "@/utils";

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
  const ref = useClickOutside<HTMLDivElement>(() => setModalContent(null));

  const formik = useFormik({
    initialValues,
    validationSchema: EditNormalFeesValidation,
    onSubmit: (values) => {},
  });

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
                  formik.touched.baseFare
                    ? formik.errors.baseFare
                    : undefined
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
                  formik.touched.distance
                    ? formik.errors.distance
                    : undefined
                }
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
                label="LASG levy %"
                error={
                  formik.touched.lasgLevy
                    ? formik.errors.lasgLevy
                    : undefined
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
              />
            </div>
          </div>
        </motion.div>
      </Form>
    </FormikProvider>
  );
};

export default EditNormalFeesForm;
