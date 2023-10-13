import * as yup from 'yup'

export const declineDriverRequestSchema = yup.object({
    reason: yup.string().required('Please provide a valid reason')
})