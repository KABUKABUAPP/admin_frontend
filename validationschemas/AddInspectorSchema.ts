import * as yup from "yup"

const NewInspectorValidations = yup.object({
    first_name: yup.string().required('Required'),
    username: yup.string().required('Required'),
    last_name: yup.string().required('Required'),
    city: yup.string().required('Required'),
    state: yup.string().required('Required'),
    house_address: yup.string().required('Required'),
    phone_number: yup.string(),
    email: yup.string(),
    password: yup.string().required('Required')
})

export default NewInspectorValidations