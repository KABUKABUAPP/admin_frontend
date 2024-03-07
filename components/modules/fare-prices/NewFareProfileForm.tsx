import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import FormCard from "./FormCard";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import SelectField from "@/components/ui/Input/SelectField";
import { nigerianStates } from "@/constants";
import { useFormik, Form, FormikProvider } from "formik";
import NewFareProfileValidations from "@/validationschemas/NewFareProfileSchema";
import { toast } from "react-toastify";
import { useCreateFarePriceMutation } from "@/api-services/farePricesService";
import { verifyIsDigit } from "@/utils";
import useUserPermissions from "@/hooks/useUserPermissions";

const initialValues = {
  price_type: "",
  state: "",
  country: "",
  base_fare: "",
  distance_per_km: "",
  time_per_min: "",
  state_levy: "",
  booking_fee: "",
  waiting_time_per_min: "",
  surge_multiplier: "",
  long_base_fare: "",
  long_distance_per_km: "",
  long_time_per_min: "",
  long_state_levy: "",
  long_booking_fee: "",
  long_waiting_time_per_min: "",
  long_surge_multiplier: "",
  short_trip_limit: "",
  driver_fee_monthly_payment: "",
  driver_fee_sharp_payment: "",
  driver_trip_charges_cap: "",
  kabukabu_percentage: "",
  payment_types_available: {
    cash: true,
    wallet: true,
    card: false,
  },
};

const NewFareProfileForm: FC = () => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const router = useRouter();

  const handleSelectState = (state: string) => {
    setSelectedState(state);
  };

  const [submit, { isSuccess, isError, error, isLoading }] =
    useCreateFarePriceMutation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: NewFareProfileValidations,
    onSubmit: (values) => {
      const farePriceData = {
        price_type: values.price_type,
        state: values.state,
        country: values.country,
        long_trip: {
          base_fare: values.long_base_fare,
          distance_per_km: values.long_distance_per_km,
          time_per_min: values.long_time_per_min,
          state_levy: values.long_state_levy,
          booking_fee: values.long_booking_fee,
          waiting_time_per_min: values.long_waiting_time_per_min,
          surge_multiplier: values.long_surge_multiplier
        },
        short_trip: {
          base_fare: values.base_fare,
          distance_per_km: values.distance_per_km,
          time_per_min: values.time_per_min,
          state_levy: values.state_levy,
          booking_fee: values.booking_fee,
          waiting_time_per_min: values.waiting_time_per_min,
          surge_multiplier: values.surge_multiplier
        },
        short_trip_limit: values.short_trip_limit,
        driver_fee_monthly_payment: values.driver_fee_monthly_payment,
        driver_fee_sharp_payment: values.driver_fee_sharp_payment,
        driver_trip_charges_cap: values.driver_trip_charges_cap,
        kabukabu_percentage: values.kabukabu_percentage,
        payment_types_available: {
          cash: true,
          wallet: true,
          card: false,
        }
      }
      submit(farePriceData);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Fare Price Successfully Created");
      router.push("/fare-prices");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Error encountered");
    }
  }, [isError]);

  const handleNumberInputs = (value: string, fieldName: string) => {
    if (verifyIsDigit(value)) {
      formik.setFieldValue(fieldName, value);
    }
  };

  const { userPermissions } = useUserPermissions();

  return (
    <div>
      <FormikProvider value={formik}>
        <Form>
          <div className="flex max-md:flex-col gap-6">
            <FormCard maxWidth="400px" height="400px">
              <div className="flex flex-col gap-6">
                <div>
                  <SelectField
                    label="Country"
                    options={[{ label: "Nigeria", value: "Nigeria" }]}
                    placeholder="Select Country"
                    {...formik.getFieldProps("country")}
                    error={
                      formik.touched.country ? formik.errors.country : undefined
                    }
                  />
                </div>

                <div>
                  <SelectField
                    label="State"
                    placeholder="Select State"
                    options={[...nigerianStates].map((i) => ({
                      label: i,
                      value: i,
                    }))}
                    {...formik.getFieldProps("state")}
                    error={
                      formik.touched.state ? formik.errors.state : undefined
                    }
                  />
                </div>

                <div>
                  <SelectField
                    label="Vehicle Type"
                    options={[
                      { label: "Car", value: "REGULAR_RIDE" },
                      { label: "Keke", value: "TRICYCLE_RIDE" },
                      { label: "SUV", value: "SUV_RIDE" },
                      { label: "Dispatch", value: "DISPATCH" },
                      { label: "Haulage", value: "HAULAGE" }
                    ]}
                    placeholder="Select Vehicle Type"
                    {...formik.getFieldProps("price_type")}
                    error={
                      formik.touched.price_type ? formik.errors.price_type : undefined
                    }
                  />
                </div>

                <div>
                  <TextField
                    label="Kabukabu Percentage [%]"
                    placeholder="3"
                    {...formik.getFieldProps("kabukabu_percentage")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "kabukabu_percentage")
                    }
                    error={
                      formik.touched.kabukabu_percentage
                        ? formik.errors.kabukabu_percentage
                        : undefined
                    }
                  />
                </div>
              </div>
            </FormCard>

            <FormCard maxWidth="400px" height="400px">
              <p className="text-lg font-semibold pb-4">Driver Fee</p>
              <div className="flex flex-col gap-6">
                <TextField
                  label="Monthly payment [per month]"
                  placeholder="₦20,000"
                  {...formik.getFieldProps("driver_fee_monthly_payment")}
                  onChange={(e) =>
                    handleNumberInputs(
                      e.target.value,
                      "driver_fee_monthly_payment"
                    )
                  }
                  error={
                    formik.touched.driver_fee_monthly_payment
                      ? formik.errors.driver_fee_monthly_payment
                      : undefined
                  }
                />
                <TextField
                  label="Sharp payment [per month]"
                  placeholder="₦20,000"
                  {...formik.getFieldProps("driver_fee_sharp_payment")}
                  onChange={(e) =>
                    handleNumberInputs(
                      e.target.value,
                      "driver_fee_sharp_payment"
                    )
                  }
                  error={
                    formik.touched.driver_fee_sharp_payment
                      ? formik.errors.driver_fee_sharp_payment
                      : undefined
                  }
                />
                <TextField
                  label="Driver Trip Charges Cap"
                  placeholder="₦20,000"
                  {...formik.getFieldProps("driver_trip_charges_cap")}
                  onChange={(e) =>
                    handleNumberInputs(
                      e.target.value,
                      "driver_trip_charges_cap"
                    )
                  }
                  error={
                    formik.touched.driver_trip_charges_cap
                      ? formik.errors.driver_trip_charges_cap
                      : undefined
                  }
                />
                <TextField
                  label="Short Trip Limit"
                  placeholder="10"
                  {...formik.getFieldProps("short_trip_limit")}
                  onChange={(e) =>
                    handleNumberInputs(
                      e.target.value,
                      "short_trip_limit"
                    )
                  }
                  error={
                    formik.touched.short_trip_limit
                      ? formik.errors.short_trip_limit
                      : undefined
                  }
                />
              </div>
            </FormCard>
          </div>

          <div className="pt-8">
            <FormCard maxWidth="1000px">
              <p className="text-lg font-semibold pb-4">Short Trip</p>
              <div className="pt-4 flex max-md:flex-col gap-4">
                <div style={{ flex: 1 }} className="flex flex-col gap-6">
                  <TextField
                    label="Base Fare"
                    placeholder="₦500"
                    {...formik.getFieldProps("base_fare")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "base_fare")
                    }
                    error={
                      formik.touched.base_fare
                        ? formik.errors.base_fare
                        : undefined
                    }
                  />
                  <TextField
                    label="Time [Per min]"
                    placeholder="₦500"
                    {...formik.getFieldProps("time_per_min")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "time_per_min")
                    }
                    error={
                      formik.touched.time_per_min
                        ? formik.errors.time_per_min
                        : undefined
                    }
                  />
                  <TextField
                    label="Booking Fare"
                    placeholder="₦500"
                    {...formik.getFieldProps("booking_fee")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "booking_fee")
                    }
                    error={
                      formik.touched.booking_fee
                        ? formik.errors.booking_fee
                        : undefined
                    }
                  />
                  <TextField
                    label="Surge Multiplier"
                    placeholder="1"
                    {...formik.getFieldProps("surge_multiplier")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "surge_multiplier")
                    }
                    error={
                      formik.touched.surge_multiplier
                        ? formik.errors.surge_multiplier
                        : undefined
                    }
                  />
                </div>
                <div style={{ flex: 1 }} className="flex flex-col gap-6">
                  <TextField
                    label="Distance [per km]"
                    placeholder="₦500"
                    {...formik.getFieldProps("distance_per_km")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "distance_per_km")
                    }
                    error={
                      formik.touched.distance_per_km
                        ? formik.errors.distance_per_km
                        : undefined
                    }
                  />
                  <TextField
                    label="LASG legy [%]"
                    placeholder="3"
                    {...formik.getFieldProps("state_levy")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "state_levy")
                    }
                    error={
                      formik.touched.state_levy
                        ? formik.errors.state_levy
                        : undefined
                    }
                  />
                  <TextField
                    label="Waiting time [per min]"
                    placeholder="₦100"
                    {...formik.getFieldProps("waiting_time_per_min")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "waiting_time_per_min")
                    }
                    error={
                      formik.touched.waiting_time_per_min
                        ? formik.errors.waiting_time_per_min
                        : undefined
                    }
                  />
                </div>
              </div>
            </FormCard>
          </div>

          <div className="pt-8">
            <FormCard maxWidth="1000px">
              <p className="text-lg font-semibold pb-4">Long Trip</p>
              <div className="pt-4 flex max-md:flex-col gap-4">
                <div style={{ flex: 1 }} className="flex flex-col gap-6">
                  <TextField
                    label="Base Fare"
                    placeholder="₦500"
                    {...formik.getFieldProps("long_base_fare")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "long_base_fare")
                    }
                    error={
                      formik.touched.long_base_fare
                        ? formik.errors.long_base_fare
                        : undefined
                    }
                  />
                  <TextField
                    label="Time [Per min]"
                    placeholder="₦500"
                    {...formik.getFieldProps("long_time_per_min")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "long_time_per_min")
                    }
                    error={
                      formik.touched.long_time_per_min
                        ? formik.errors.long_time_per_min
                        : undefined
                    }
                  />
                  <TextField
                    label="Booking Fare"
                    placeholder="₦500"
                    {...formik.getFieldProps("long_booking_fee")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "long_booking_fee")
                    }
                    error={
                      formik.touched.long_booking_fee
                        ? formik.errors.long_booking_fee
                        : undefined
                    }
                  />
                  <TextField
                    label="Surge Multiplier"
                    placeholder="1"
                    {...formik.getFieldProps("long_surge_multiplier")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "long_surge_multiplier")
                    }
                    error={
                      formik.touched.long_surge_multiplier
                        ? formik.errors.long_surge_multiplier
                        : undefined
                    }
                  />
                </div>
                <div style={{ flex: 1 }} className="flex flex-col gap-6">
                  <TextField
                    label="Distance [per km]"
                    placeholder="₦500"
                    {...formik.getFieldProps("long_distance_per_km")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "long_distance_per_km")
                    }
                    error={
                      formik.touched.long_distance_per_km
                        ? formik.errors.long_distance_per_km
                        : undefined
                    }
                  />
                  <TextField
                    label="LASG legy [%]"
                    placeholder="3"
                    {...formik.getFieldProps("long_state_levy")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "long_state_levy")
                    }
                    error={
                      formik.touched.long_state_levy
                        ? formik.errors.long_state_levy
                        : undefined
                    }
                  />
                  <TextField
                    label="Waiting time [per min]"
                    placeholder="₦100"
                    {...formik.getFieldProps("long_waiting_time_per_min")}
                    onChange={(e) =>
                      handleNumberInputs(e.target.value, "long_waiting_time_per_min")
                    }
                    error={
                      formik.touched.long_waiting_time_per_min
                        ? formik.errors.long_waiting_time_per_min
                        : undefined
                    }
                  />
                </div>
              </div>
            </FormCard>
          </div>

          <div className="flex justify-end py-8">
            {userPermissions &&
              userPermissions.fare_prices_permissions.write && (
                <Button
                  title="Create Profile"
                  className="!px-10"
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                />
              )}
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default NewFareProfileForm;
