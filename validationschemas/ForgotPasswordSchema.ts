import * as yup from "yup"

const ForgotPasswordSchema = yup.object({
    email: yup.string().email('Please enter a valid email address').required('Required')
})

export default ForgotPasswordSchema