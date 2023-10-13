import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import Card from "@/components/common/Card";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { AddHubValidation } from "@/validationschemas/AddHubValidationSchema";
import { useFormik, Form, FormikProvider } from "formik";
import {
  useGetNigerianCityByStateQuery,
  useGetNigerianStatesQuery,
} from "@/api-services/geoLocationService";
import SelectField from "@/components/ui/Input/SelectField";
import { toast } from "react-toastify";
import { useGetAllInspectorsQuery } from "@/api-services/inspectorsService";
import { useAddHubMutation } from "@/api-services/hubService";

const initialValues: Record<string, string> = {
  name: "",
  address: "",
  city: "",
  state: "",
  inspector: "",
};

interface Props {
  hubImages: { image: File; imageId: string }[];
}

const HubDetailsForm: FC<Props> = ({ hubImages }) => {
  const [selectedStateName, setSelectedStateName] = useState<string>("");
  const router = useRouter();
  const [addHub, { isSuccess, error, data, isLoading }] = useAddHubMutation();
  const formik = useFormik({
    initialValues,
    validationSchema: AddHubValidation,
    onSubmit: (values) => {
      values.state = selectedStateName;
      if (!hubImages.length) {
        toast.error("Please upload at least one hub image");
      } else {
        const formData: FormData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        for (const image of hubImages) {
          formData.append("hub_images", image.image);
        }
        
        addHub(formData);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Hub added successful");
      router.push("/hubs");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      const { message }: any = error.data;
      toast.error(message);
    }
  }, [error]);

  const {
    data: states,
    isLoading: statesLoading,
    error: statesError,
    refetch: refetchStates,
  } = useGetNigerianStatesQuery(null);

  const {
    data: cities,
    isLoading: citiesLoading,
    error: citiesError,
    refetch: refetchCities,
  } = useGetNigerianCityByStateQuery(
    { id: formik.values.state },
    { skip: !formik.values.state, refetchOnMountOrArgChange: true }
  );

  const {
    data: inspectors,
    isLoading: inspectorsLoading,
    isError: inspectorsError,
    error: inspectorErrorObj,
    refetch: reloadInspectors,
  } = useGetAllInspectorsQuery({
    limit: 1000,
    page: 1,
    search: "",
    order: "a-z",
  });

  useEffect(() => {
    if (formik.values.state && states?.length) {
      const stateName = states.filter((s) => s.value === formik.values.state)[0]
        ?.label as string;
      if (stateName) setSelectedStateName(stateName);
    }
  }, [formik.values.state, states]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Card>
          <div className="flex flex-col gap-8 py-5">
            <TextField
              label="Hub name"
              placeholder="Name here"
              {...formik.getFieldProps("name")}
              error={formik.touched.name ? formik.errors.name : undefined}
            />
            <TextField
              label="Hub Address"
              placeholder="Address here"
              {...formik.getFieldProps("address")}
              error={formik.touched.address ? formik.errors.address : undefined}
            />
            <div className="flex justify-between gap-3 max-sm:flex-col">
              <SelectField
                options={cities?.length ? cities : []}
                disabled={!cities?.length}
                label="City"
                placeholder="City here"
                className="w-full"
                {...formik.getFieldProps("city")}
                error={formik.touched.city ? formik.errors.city : undefined}
              />
              <SelectField
                options={states?.length ? states : []}
                disabled={!states?.length}
                label="State"
                placeholder="Lagos State"
                className="w-full"
                {...formik.getFieldProps("state")}
                error={formik.touched.state ? formik.errors.state : undefined}
              />
            </div>

            <SelectField
              label="Select Inspector"
              placeholder="Select Inspector here"
              options={
                inspectors?.data
                  ? inspectors?.data.map((i) => ({
                      label: i.fullName,
                      value: i.inspectorId,
                    }))
                  : []
              }
              disabled={!inspectors?.data.length}
              {...formik.getFieldProps("inspector")}
              error={
                formik.touched.inspector ? formik.errors.inspector : undefined
              }
            />
          </div>
        </Card>

        <Button
          title="Create Hub"
          className="w-full !text-[16px] mt-6"
          size="large"
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        />
      </Form>
    </FormikProvider>
  );
};

export default HubDetailsForm;
