import * as yup from "yup"

const ReferralSettingsValidations = yup.object({
    no_of_trips: yup.string().required('Required'),
    amount_per_referral: yup.string().required('Required')
})

export default ReferralSettingsValidations