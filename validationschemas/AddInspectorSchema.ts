import * as yup from "yup"

const NewInspectorValidations = yup.object({
    first_name: yup.string().required('Required'),
    last_name: yup.string().required('Required'),
    city: yup.string().required('Required'),
    state: yup.string().required('Required'),
    house_address: yup.string().required('Required'),
    phone_number: yup.string().required('Required').test('len', 'Must be exactly 11 characters', val => val.length === 11),
    email: yup.string().email().required('Required'),
})

export default NewInspectorValidations