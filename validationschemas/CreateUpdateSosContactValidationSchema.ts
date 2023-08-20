import * as yup from "yup";

export const CreateUpdateSosValidationSchema = yup.object({
  sosName: yup.string().required("Required"),
  address: yup.string().required("Required"),
  phone: yup.string().required("Required"),
});
