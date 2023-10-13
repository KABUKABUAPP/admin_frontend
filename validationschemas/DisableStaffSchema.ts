import * as yup from "yup";

export const disableStaffValidationSchema = yup.object({
  reason: yup.string().required("Required"),
});
