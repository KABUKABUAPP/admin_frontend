import { useCreateCampaignMutation, useGetMarketingStaffsQuery } from "@/api-services/campaignService";
import ActionBar from "@/components/common/ActionBar";
import AppHead from "@/components/common/AppHead";
import Card from "@/components/common/Card";
import AddIcon from "@/components/icons/AddIcon";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import Loader from "@/components/ui/Loader/Loader";
import AppLayout from "@/layouts/AppLayout";
import { capitalizeAllFirstLetters } from "@/utils";
import { useFormik, Form, FormikProvider } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const initialValues = {
    name: "",
    owner: "",
    start_date: "",
    end_date: "",
    category: ""
};

const Campaign = () => {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");
    const [campaignOwner, setCampaignOwner] = useState<string>("");
    const [campaignCategory, setCampaignCategory] = useState<string>("");

    const { data: allStaff, isLoading: isStaffLoading, error: isErrorLoading, refetch, isError } = useGetMarketingStaffsQuery({
        search: search,
    });

    const [createCampaign, { data, isLoading, error, isSuccess }] = useCreateCampaignMutation();

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values: any) => {
            createCampaign(values)
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success('Successfully created campaign');
            router.push('/campaigns')
        }
    }, [isSuccess])

    useEffect(() => {
        if (error) {
            toast.success('Error encountered')
            console.log(error)
        }
    }, [error])

    return (
        <>
            <AppHead title="Kabukabu | Repair Loan" />
            <AppLayout>
                <ActionBar></ActionBar>
                <div className="mx-auto w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] my-4">
                    <Card bg="#FFF">
                        <div className="flex flex-col gap-3 w-full">
                            <FormikProvider value={formik}>
                                <Form>
                                    <div className="flex flex-col gap-4 w-full">
                                        <TextField
                                            label="Campaign Name"
                                            placeholder="Campaign Name"
                                            {...formik.getFieldProps("name")}
                                            //error={formik.touched.name ? formik.errors.name : undefined}
                                        />

                                        {
                                            isStaffLoading ?
                                            <div className="flex justify-center items-center">
                                                <Loader />
                                            </div> :
                                            <div className="flex flex-col justify-center items-center gap-2 w-full">
                                                <p className="text-sm w-full">Campaign Owner</p>
                                                <Select
                                                    options={allStaff?.data?.map((staff: any) => {
                                                        return {
                                                            value: staff.id,
                                                            label: capitalizeAllFirstLetters(staff.fullName)
                                                        }
                                                    })}
                                                    className="w-full"
                                                    onKeyDown={(e: any) => {
                                                        setSearch(e.target.value)
                                                    }}
                                                    onChange={(optX: any) => {
                                                        formik.setFieldValue('owner', optX.value)
                                                    }}
                                                />
                                            </div>
                                        }

                                        <TextField
                                            label="Start Date"
                                            placeholder="Start Date Here"
                                            {...formik.getFieldProps("start_date")}
                                            type="date"
                                            //error={formik.touched.name ? formik.errors.name : undefined}
                                        />

                                        <TextField
                                            label="End Date"
                                            placeholder="End Date Here"
                                            {...formik.getFieldProps("end_date")}
                                            type="date"
                                            //error={formik.touched.name ? formik.errors.name : undefined}
                                        />
                                        
                                        
                                        <div className="flex flex-col justify-center items-center gap-2 w-full">
                                            <p className="text-sm w-full">Campaign Category</p>
                                            <Select
                                                options={[
                                                    {
                                                        value: 'all',
                                                        label: 'All'
                                                    },
                                                    {
                                                        value: 'rider',
                                                        label: 'Rider'
                                                    },
                                                    {
                                                        value: 'driver',
                                                        label: 'Driver'
                                                    }
                                                ]}
                                                className="w-full"
                                                onKeyDown={(e: any) => {
                                                    setSearch(e.target.value)
                                                }}
                                                onChange={(optX: any) => {
                                                    formik.setFieldValue('category', optX.value)
                                                }}
                                            />
                                        </div>

                                        <div className="flex justify-end">
                                            <Button
                                            title="Create Campaign"
                                            className="!text-[16px] mt-6"
                                            size="large"
                                            type="submit"
                                            disabled={isLoading}
                                            loading={isLoading}
                                            />
                                        </div>
                                    </div>
                                </Form>
                            </FormikProvider>
                        </div>
                    </Card>
                </div>
            </AppLayout>
        </>
    )
}

export default Campaign;