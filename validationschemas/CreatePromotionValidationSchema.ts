import * as yup from "yup";

export const AutomaticPromotionValidationSchema = yup.object({
  name: yup.string().required("Required"),
  audience: yup.string().required("Required"),
  promo_type: yup.string().required("Required"),
  amount_type: yup.string().required("Required"),
  value: yup.string().required("Required"),
  cap: yup.string().required("Required"),
  start_date: yup.string().required("Required"),
  end_date: yup.string().required("Required"),

  condition: yup.string().required("Required"),
  count: yup.string().required("Required"),
});

export const ManualPromotionValidationSchema = yup.object({
  name: yup.string().required("Required"),
  audience: yup.string().required("Required"),
  promo_type: yup.string().required("Required"),
  amount_type: yup.string().required("Required"),
  value: yup.string().required("Required"),
  cap: yup.string().required("Required"),
  start_date: yup.string().required("Required"),
  end_date: yup.string().required("Required"),

  total_quantity: yup.string().required("Required"),
});

export const RewardPromotionValidationSchema = yup.object({
  name: yup.string().required("Required"),
  audience: yup.string().required("Required"),
  description: yup.string().required("Required"),
  reward_type: yup.string().required("Required"),
  value: yup.string().required("Required"),
  condition_value: yup.string().required("Required"),
  reset_type: yup.string().required("Required"),
  start_date: yup.string().required("Required"),
  end_date: yup.string().required("Required"),
});