import * as yup from "yup";

export const updatePasswordValidationSchema = yup.object({
  currentPassword: yup.string().required("required"),
  newPassword: yup.string().required("Required"),
  confirmNewPassword: yup.string().required("Required"),
});
