import * as yup from "yup";

export const DeleteSosContactValidation = yup.object({
  reason: yup.string().required("Required"),
});
