import * as yup from "yup";

export const AddHubValidation = yup.object({
  name: yup.string().required("Required"),
  address: yup.string().required("Required"),
  city: yup.string().required("Required"),
  state: yup.string().required("Required"),
  inspector: yup.string().required("Required"),
});
