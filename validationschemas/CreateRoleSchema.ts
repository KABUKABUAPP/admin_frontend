import * as yup from 'yup'

export const CreateRoleValidationSchema = yup.object({
    title: yup.string().required('Please provide a title')
})