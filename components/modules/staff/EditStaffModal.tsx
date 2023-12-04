import React, { FC, useEffect, useState } from "react";

import Card from "@/components/common/Card";
import { useFormik, Form, FormikProvider } from "formik";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import SelectField from "@/components/ui/Input/SelectField";
import Loader from "@/components/ui/Loader/Loader";
import { toast } from "react-toastify";
import useClickOutside from "@/hooks/useClickOutside";
import { capitalizeAllFirstLetters } from "@/utils";
import { useGetNigerianCityByStateQuery, useGetNigerianStatesQuery } from "@/api-services/geoLocationService";
import { useGetRolesQuery } from "@/api-services/settingsService";
import { useEditStaffMutation } from "@/api-services/staffService";
import { useRouter } from "next/router";

interface Props {
  handleClose: () => void;
  currentData: any;
}

interface initialValuesType {
  first_name: string | undefined;
  last_name: string | undefined;
  role: string | undefined;
  address: string | undefined;
  city: string | undefined;
  state: string | undefined;
}

const getFormattedTimeDate = (utcDate: any) => {
  const theDate = new Date(utcDate);
  const year = theDate.getFullYear();
  const month = String(theDate.getMonth() + 1).padStart(2, '0');
  const day = String(theDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${String(theDate.getHours()).padStart(2, '0')}:${String(theDate.getMinutes()).padStart(2, '0')}:${String(theDate.getSeconds()).padStart(2, '0')}`;

  return { formattedDate, formattedTime }
}

const EditStaffModal: FC<Props> = (props) => {
    const router = useRouter();
    const [selectedStateId, setSelectedStateId] = useState<string>("");
    
    const [editStaff, { isLoading, error, isSuccess }] =
    useEditStaffMutation();

    
    const { data: roles } = useGetRolesQuery(
      {
        limit: 50,
        page: 1,
      },
      { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );

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
      { id: selectedStateId },
      { skip: !selectedStateId, refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
      if (props.currentData.addressObj.state && states?.length) {
        const stateId = states.find((s) => s.label === capitalizeAllFirstLetters(props.currentData.addressObj.state))?.value
        if (stateId) setSelectedStateId(String(stateId))
      }
    }, [props.currentData.addressObj.state, states]);


    let initialValues:initialValuesType = {
        first_name: capitalizeAllFirstLetters(props.currentData.fullName.split(' ')[0]),
        last_name: capitalizeAllFirstLetters(props.currentData.fullName.split(' ')[1]),
        role: props.currentData.roleId,
        address: capitalizeAllFirstLetters(props.currentData.addressObj.street),
        city:  capitalizeAllFirstLetters(props.currentData.addressObj.city),
        state: String(states?.find((s) => s.label === capitalizeAllFirstLetters(props.currentData.addressObj.state))?.value)
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            values.state = String(states?.find((s) => s.value === selectedStateId)?.label);

            editStaff({ staffId: String(router.query.id), body: values });
        },
    });

    
    useEffect(() => {
      if (isSuccess) {
        toast.success("Staff details edited successfully");
        props.handleClose();
        window.location.reload();
      }
    }, [isSuccess]);

    useEffect(() => {
      if (error) {
        toast.error('Error encountered, please retry');
      }
    }, [error]);

    const ref = useClickOutside<HTMLDivElement>(() => props.handleClose());

    return (
        <div ref={ref} className="w2/4">
            <Card elevation={true} width='400px' maxWidth="400px" maxHeight="100vh" >
                {
                  props.currentData &&
                  <FormikProvider value={formik}>
                    <Form>
                        <p className="text-lg font-semibold justify-center">Edit Staff</p>
                        <Card>
                            <div className="flex flex-col gap-8 py-5">
                                <TextField
                                label="First name"
                                placeholder="Name here"
                                {...formik.getFieldProps("first_name")}
                                error={
                                    formik.touched.first_name ? formik.errors.first_name : undefined
                                }
                                />
                                <TextField
                                label="Last name"
                                placeholder="Name here"
                                {...formik.getFieldProps("last_name")}
                                error={
                                    formik.touched.last_name ? formik.errors.last_name : undefined
                                }
                                />

                                <SelectField
                                  label="Role"
                                  disabled={!roles}
                                  options={
                                      !roles
                                      ? []
                                      : roles.data.map((i) => ({
                                          label: capitalizeAllFirstLetters(i.title),
                                          value: i.id,
                                          }))
                                  }
                                  placeholder={props.currentData.role}
                                  {...formik.getFieldProps("role")}
                                  error={formik.touched.role ? formik.errors.role : undefined}
                                />
                                <TextField
                                label="Address"
                                placeholder="House Address here"
                                {...formik.getFieldProps("address")}
                                error={formik.touched.address ? formik.errors.address : undefined}
                                />
                                <div className="flex justify-between gap-3 max-sm:flex-col">
                                <SelectField
                                    options={cities ? cities : []}
                                    disabled={!cities?.length}
                                    label="City"
                                    placeholder="City here"
                                    className="w-full"
                                    {...formik.getFieldProps("city")}
                                    error={formik.touched.city ? formik.errors.city : undefined}
                                />
                                <SelectField
                                    options={states ? states : []}
                                    disabled={!states?.length}
                                    label="State"
                                    placeholder="Lagos State"
                                    className="w-full"
                                    {...formik.getFieldProps("state")}
                                    error={formik.touched.state ? formik.errors.state : undefined}
                                    onChange={(e) => {
                                      setSelectedStateId(e.target.value)
                                    }}
                                    value={selectedStateId}
                                />
                                </div>
                            </div>
                        </Card>

                        <div className="flex justify-between">
                            <Button
                                title="Cancel"
                                className="!text-[16px] mt-4 bg-[#E6E6E6] border-[#E6E6E6] rounded-md"
                                size="large"
                                variant="text"
                                disabled={false}
                                loading={false}
                                width="47.5%"
                                onClick={() => props.handleClose()}
                            />
                            <Button
                                title="Save Changes"
                                className="!text-[16px] mt-4 w2/5"
                                size="large"
                                type="submit"
                                disabled={isLoading}
                                loading={isLoading}
                                width="47.5%"
                            />
                        </div>
                    </Form>
                  </FormikProvider>
                }
            </Card>
        </div>
    );
};

export default EditStaffModal;
