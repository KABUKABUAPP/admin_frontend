import * as yup from "yup";

export const EditNormalFeesValidation = yup.object({
  baseFare: yup.string().required("Required"),
  time: yup.string().required("Required"),
  bookingFee: yup.string().required("Required"),
  distance: yup.string().required("Required"),
  lasgLevy: yup.string().required("Required"),
  waitingTime: yup.string().required("Required"),
});
