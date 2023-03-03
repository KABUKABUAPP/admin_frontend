import * as yup from "yup"

const LoginValidations = yup.object({
    email: yup.string().email('Please enter a valid email address').required('Required'),
    password: yup.string().required('Required')
})

export default LoginValidations