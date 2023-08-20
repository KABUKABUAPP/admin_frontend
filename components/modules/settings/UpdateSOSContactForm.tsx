import React, { FC, useEffect } from "react";

import useClickOutside from "@/hooks/useClickOutside";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import { useFormik, FormikProvider, Form } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { CreateUpdateSosValidationSchema } from "@/validationschemas/CreateUpdateSosContactValidationSchema";
import { useModalContext } from "@/contexts/ModalContext";

const initialValues = {
  sosName: "",
  address: "",
  phone: "",
};

const UpdateSOSContactForm: FC = () => {
  const { setModalContent } = useModalContext();

  const ref = useClickOutside<HTMLDivElement>(() => setModalContent(null));

  const formik = useFormik({
    initialValues,
    validationSchema: CreateUpdateSosValidationSchema,
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
          className="bg-[#FFFFFF] rounded-xl w-full mx-auto max-w-[500px] flex flex-col px-4 justify-center items-center p-2 py-5 gap-4"
        >
          <p className="font-bold text-center text-sm">Update SOS</p>
          
          <div className="w-full flex flex-col gap-2 pb-1">
            <p className="font-bold text-lg">SOS Name</p>
            <TextField
              placeholder="Name here"
              {...formik.getFieldProps("sosName")}
              error={formik.touched.sosName ? formik.errors.sosName : undefined}
            />
          </div>

          <div className="w-full flex flex-col gap-2 pb-1">
            <p className="font-bold text-lg">Address</p>
            <TextField
              placeholder="Address here"
              {...formik.getFieldProps("address")}
              error={formik.touched.address ? formik.errors.address : undefined}
            />
          </div>

          <div className="w-full flex flex-col gap-2 pb-1">
            <p className="font-bold text-lg">Phone Number</p>
            <TextField
              placeholder="234 000 000 0000"
              {...formik.getFieldProps("phone")}
              error={formik.touched.phone ? formik.errors.phone : undefined}
            />
          </div>

          <div className="flex gap-5 w-full flex-wrap justify-center items-center">
            <Button
              title="Cancel"
              size="medium"
              className="w-[43%] !text-base"
              onClick={()=>setModalContent(null)}
              color="tetiary"
            />
            <Button
              title="Save Changes"
              size="medium"
              type="submit"
              className="w-[43%] !text-base"
            />
          </div>
        </motion.div>
      </Form>
    </FormikProvider>
  );
};

export default UpdateSOSContactForm;
