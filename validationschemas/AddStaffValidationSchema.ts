import * as yup from "yup";

export const AddStaffValidation = yup.object({
  first_name: yup.string().required('Required'),
  last_name: yup.string().required('Required'),
  phone_number: yup.string().required('Required'),
  email: yup.string().required('Required'),
  password: yup.string().required('Required'),
  role: yup.string().required('Required'),
  address: yup.string().required('Required'),
  city: yup.string().required('Required'),
  state: yup.string().required('Required')
});
