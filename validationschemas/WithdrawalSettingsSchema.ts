import * as yup from "yup"

const WithdrawalSettingsValidations = yup.object({
    withdrawal_type: yup.string().required('Required'),
    withdrawal_frequency: yup.string().required('Required')
})

export default WithdrawalSettingsValidations