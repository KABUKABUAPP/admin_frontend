import * as yup from "yup";

export const SosDateRangeValidation = yup.object({
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
});
