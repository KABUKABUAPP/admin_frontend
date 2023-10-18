import Card from "@/components/common/Card";
import CarIcon from "@/components/icons/CarIcon";
import Button from "@/components/ui/Button/Button";
import React, { FC, useState, useEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import TextField from "@/components/ui/Input/TextField/TextField";
import SearchIcon from "@/components/icons/SearchIcon";
import Image from "next/image";
import SelectField from "@/components/ui/Input/NoBorderSelect";
import Avatar from "@/components/common/Avatar";
import { useGetInspectedCarsQuery } from "@/api-services/inspectorsService";
import { useRouter } from "next/router";

function splitPageUrl() {
    // Get the current page URL
    const currentPageUrl = window.location.href;
    const urlParts = currentPageUrl.split('/');
    return urlParts;
}

const searchInitialValues = {
    search_value: ""
}

const sortInitialValues = {
    sort_value: ""
}

const carDetailsFiller = [{
    image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    car_model: 'Toyota Corolla 2020, Black',
    plate_no: 'ABC 123 JYK',
    id: '#12345'
}]

const InspectionHistory: FC = () => {
    const [inspectionStatus, setInspectionStatus] = useState(true);
    const [carsDetail, setCarsDetail] = useState<any[]>([]);
    const [pageLimit, setPageLimit] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [inspectionStatusStr, setInspectionStatusStr] = useState('approved');

    const inspectionBold = `text-sm mx-1 font-semibold cursor-pointer`;
    const inspectionOrdinary = `text-sm mx-1 cursor-pointer`;

    // Example usage
    const parts = splitPageUrl();
    
    const { data, isLoading, isError, refetch } = useGetInspectedCarsQuery(
        { limit: pageLimit, page: pageNumber, id: parts[4], status: inspectionStatusStr }
    );

    useEffect(() => {
        console.log('d', data);

        setCarsDetail(data)
    }, [carsDetail, data])

    const searchFormik = useFormik({
        initialValues: searchInitialValues,
        onSubmit: (values) => {
            console.log(values)
        },
    });

    const sortFormik = useFormik({
        initialValues: sortInitialValues,
        onSubmit: (values) => {
            console.log(values)
        },
    });

    const handleInspectionStatus = () => {
        setInspectionStatus(!inspectionStatus)
        if (inspectionStatusStr === 'approved') {
            setInspectionStatusStr('declined')
        } else {
            setInspectionStatusStr('approved')
        }
        console.log(inspectionStatus, inspectionStatusStr)
    }

    return (
        <Card>

            <div className="flex flex-wrap p-1">
                <div className="w-1/2 p-1">
                    <p className="text-lg font-semibold">Inspection History</p>
                </div>
                <div className="w-1/2 p-1 text-right">
                    <span className={inspectionStatus ? inspectionBold : inspectionOrdinary} onClick={handleInspectionStatus}>Approved</span>
                    <span className="text-sm mx-1">|</span>
                    <span className={!inspectionStatus ? inspectionBold : inspectionOrdinary} onClick={handleInspectionStatus}>Declined</span>
                </div>
            </div>

            <div className="flex flex-wrap p-1">
                <div className="w-3/5 p-1">
                    <FormikProvider value={searchFormik}>
                        <Form>
                            <TextField
                                placeholder="Search for a car"
                                {...searchFormik.getFieldProps("search_value")}
                                error={
                                searchFormik.touched.search_value
                                    ? searchFormik.errors.search_value
                                    : undefined
                                }
                                startIcon={<SearchIcon />}
                            />
                        </Form>
                    </FormikProvider>
                </div>
                <div className="w-2/5 p-1 text-right">
                    <FormikProvider value={searchFormik}>
                        <Form>
                            <div className="flex flex-wrap">
                                <span className="w-2/5 mt-2 text-sm">
                                    <b>Sort:</b>
                                </span>
                                <span className="w-3/5">
                                    <SelectField
                                        options={[
                                            {
                                                label: 'Newest First',
                                                value: 'newest'
                                            },
                                            {
                                                label: 'Oldest First',
                                                value: 'oldest'
                                            }
                                        ]}
                                        placeholder="Newest First"
                                        className="w-full"
                                        {...sortFormik.getFieldProps("sort_value")}
                                        error={
                                            sortFormik.touched.sort_value ? sortFormik.errors.sort_value : undefined
                                        }
                                    />
                                </span>
                            </div>
                            
                        </Form>
                    </FormikProvider>
                </div>
            </div>
        

        <div>
            {carsDetail?.length > 0 && 
                <>
                    {Array.isArray(carsDetail) && carsDetail.map((detail) => (
                        <div className="w-full flex bg-[#F1F1F1] rounded-md p-3">
                            <div className="w-3/10">
                                <p className="mt-4 mb-4 text-sm text-[#9A9A9A]">{detail.id}</p>
                                <Avatar
                                    imageUrl={detail.image}
                                    fallBack={detail.car_model[0]}
                                    shape="square"
                                    size="md"
                                />
                            </div>

                            <div className="w-7/10">
                                <p className="mt-4 mb-4 text-md"><b>{detail.car_model}</b></p>
                                <p className="rounded-md bg-[#FFF5D8] p-3 mx-3"><b>{detail.plate_no}</b></p>
                            </div>
                        </div>
                    ))}
                </>
            }

            {
                carsDetail?.length === 0 && 
                <p className="text-center text-sm font-semibold mt-6 mb-6">
                    Inspector has not inpected any cars
                </p>
            }
        </div>
        </Card>
    );
};

export default InspectionHistory;
