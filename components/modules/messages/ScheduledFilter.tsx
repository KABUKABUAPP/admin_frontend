import React, { FC } from "react";

import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import { useFormik, FormikProvider, Form } from "formik";
import useClickOutside from "@/hooks/useClickOutside";
import { useModalContext } from "@/contexts/ModalContext";
import { SosDateRangeValidation } from "@/validationschemas/SosDateRangeValidation";

const initialValues = {
  startDate: "",
  endDate: "",
};

interface Props {
  handleSelectDate?: ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => void;
}

const DateRangeFilter: FC<Props> = ({ handleSelectDate }) => {
  const { setModalContent } = useModalContext();
  const ref = useClickOutside<HTMLDivElement>(() => setModalContent(null));

  const formatDateString = (val: string): string => {
    const valArr = val.split("/");
    const day = val[0].length === 1 ? val[0].padStart(2, "0") : val[0];
    const month = val[1].length === 1 ? val[0].padStart(2, "0") : val[1];

    valArr[0] = day;
    valArr[1] = month;

    return valArr.join("/");
  };

  const formik = useFormik({
    initialValues,
    validationSchema: SosDateRangeValidation,
    onSubmit: (values) => {
        const startDate = new Date(values.startDate).toLocaleDateString(),
            endDate = new Date(values.endDate).toLocaleDateString();
        console.log(startDate, endDate)
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form className="w-full">
        <div
          ref={ref}
          className="bg-[#FFFFFF] w-full max-w-[600px] mx-auto rounded-lg p-4"
        >
          <div className="flex justify-between">
            <div>
              <p>Date Range</p>
            </div>
            <div>
              <span onClick={() => setModalContent(null)}>
                <CloseIcon />
              </span>
            </div>
          </div>

          <div className="flex max-sm:flex-col gap-6 mt-12">
            <div style={{ flex: 1 }}>
              <TextField
                label="From"
                type="date"
                {...formik.getFieldProps("startDate")}
                error={
                  formik.touched.startDate ? formik.errors.startDate : undefined
                }
              />
            </div>
            <div style={{ flex: 1 }}>
              <TextField
                label="To"
                type="date"
                {...formik.getFieldProps("endDate")}
                error={
                  formik.touched.endDate ? formik.errors.endDate : undefined
                }
              />
            </div>
          </div>
          <div className="mt-12">
            <Button
              title="Show Results"
              className="w-full"
              size="large"
              type="submit"
            />
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default DateRangeFilter;
