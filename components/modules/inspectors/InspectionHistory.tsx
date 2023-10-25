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
import { useGetInspectedCarsPaginationQuery, useGetInspectedCarsQuery } from "@/api-services/inspectorsService";
import { useRouter } from "next/router";
import ArrowUpRight from "@/components/icons/ArrowUpRight";
import ArrowLeft from "@/components/icons/ArrowLeft";
import Pagination from "@/components/common/Pagination";
import SearchFilterBar from "@/components/common/SearchFilterBar";

function splitPageUrl() {
    // Get the current page URL
    const currentPageUrl = window.location.href;
    const urlParts = currentPageUrl.split('/');
    return urlParts;
}

function filterCarModels(searchString: string, carArray: any) {
    // Use the filter method to create a new array based on the matching criteria
    return carArray?.filter((car: { car_model: string; }) => {
        // Convert both the car model and the search string to lowercase for case-insensitive comparison
        const lowerCaseCarModel = car?.car_model.toLowerCase();
        const lowerCaseSearchString = searchString.toLowerCase();

        // Check if the car model contains the search string
        return lowerCaseCarModel.includes(lowerCaseSearchString);
    });
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
    const [search, setSearch] = useState('');

    const filterOptions = [
        { label: "Newest First", value: "newest_first", default: true },
        { label: "Oldest First", value: "oldest_first", default: false },
        { label: "A-Z", value: "a-z", default: false },
        { label: "Z-A", value: "z-a", default: false },
    ];

    const [selectedFilterOption, setSelectedFilterOption] = useState<string>(filterOptions.find((opt) => opt.default === true)?.value || "newest_first");

    const inspectionBold = `text-sm mx-1 font-semibold cursor-pointer`;
    const inspectionOrdinary = `text-sm mx-1 cursor-pointer`;

    // Example usage
    const parts = splitPageUrl();
    
    const { data, isLoading, isError, refetch } = useGetInspectedCarsQuery(
        { limit: pageLimit, page: pageNumber, id: parts[4], status: inspectionStatusStr }
    );

    const { data: totalCarsData, isLoading: totalCarsLoading, isError: totalCarsError, refetch: totalCarsRefetch } = useGetInspectedCarsPaginationQuery(
        { limit: pageLimit, page: pageNumber, id: parts[4], status: inspectionStatusStr }
    );

    useEffect(() => {
        const searchResult = filterCarModels(search, data)
        setCarsDetail(search.length > 0 ? searchResult : data)
    }, [carsDetail, data, search])

    const handleInspectionStatus = () => {
        setInspectionStatus(!inspectionStatus)
        if (inspectionStatusStr === 'approved') {
            setInspectionStatusStr('declined')
        } else {
            setInspectionStatusStr('approved')
        }
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
                
                <SearchFilterBar
                    searchValue={search}
                    handleSearch={(val) => setSearch(val)}
                    filterOptions={filterOptions}
                    dropDownOptionSelected={selectedFilterOption}
                    handleDropDown={(val) => setSelectedFilterOption(String(val))}
                />
            </div>
        

        <div>
            {carsDetail?.length > 0 && 
                <>
                    {Array.isArray(carsDetail) && carsDetail.map((detail) => (
                        <div className="w-full flex bg-[#F1F1F1] rounded-md p-3 mt-2 mb-2">
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
                    <Pagination
                        className="pagination-bar"
                        currentPage={totalCarsData?.currentPage}
                        totalCount={totalCarsData?.totalCount}
                        pageSize={totalCarsData?.pageSize}
                        onPageChange={(page) => setPageNumber(page)}
                    />
                </>
            }

            {
                carsDetail?.length === 0 && 
                <p className="text-center text-sm font-semibold mt-6 mb-6">
                    Inspector has not inspected any cars
                </p>
            }
        </div>
        </Card>
    );
};

export default InspectionHistory;
