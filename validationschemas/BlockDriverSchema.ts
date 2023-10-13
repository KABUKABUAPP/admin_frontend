import * as yup from "yup"

export const BlockDriverValidation = yup.object({
    reason: yup.string().required('Please, provide a valid reason')
})