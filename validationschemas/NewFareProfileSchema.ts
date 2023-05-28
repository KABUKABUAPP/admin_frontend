import * as yup from "yup"

const NewFareProfileValidations = yup.object({
    base_fare: yup.number().required('Required'),
    distance_per_km: yup.number().required('Required'),
    time_per_min: yup.number().required('Required'),
    state_levy: yup.number().required('Required'),
    booking_fee: yup.number().required('Required'),
    waiting_time_per_min: yup.number().required('Required'),
    surge_multiplier: yup.number().required('Required'),
    driver_fee_monthly_payment: yup.number().required('Required'),
    driver_fee_sharp_payment: yup.number().required('Required'),
})

export default NewFareProfileValidations