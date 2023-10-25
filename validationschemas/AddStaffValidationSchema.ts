import * as yup from "yup";

export const AddStaffValidation = yup.object({
  team_name: yup.string().required('Required'),
  audience: yup.string().required('Required')
});
