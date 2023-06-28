import * as yup from "yup"

const NewInspectorValidations = yup.object({
    first_name: yup.string().required('Required'),
    last_name: yup.string().required('Required'),
    city: yup.string().required('Required'),
    state: yup.string().required('Required'),
    house_address: yup.string().required('Required'),
    phone_number: yup.number().required('Required').test('len', 'Must be exactly 11 characters', val => String(val).trim().length === 10),
    email: yup.string().email().required('Required'),
})

export default NewInspectorValidations