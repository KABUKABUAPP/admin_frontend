import * as yup from "yup";

export const EditDriverFeeValidation = yup.object({
  monthlyPayment: yup.string().required("Required"),
  sharpPayment: yup.string().required("Required"),
});
