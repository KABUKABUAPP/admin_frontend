import * as yup from "yup";

export const CreateResetPasswordValidation = yup.object({
  new_password: yup.string().required("Required"),
  confirm_password: yup.string().required("Required"),
  otp: yup.string().required("Required"),
});
