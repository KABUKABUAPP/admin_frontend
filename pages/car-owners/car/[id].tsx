import { useApproveDeclineCarMutation, useGetSingleCarQuery } from "@/api-services/carOwnersService";
import ActionBar from "@/components/common/ActionBar";
import AppHead from "@/components/common/AppHead";
import Avatar from "@/components/common/Avatar";
import CarDetailsCard from "@/components/common/CarDetailsCard";
import Card from "@/components/common/Card";
import ErrorMessage from "@/components/common/ErrorMessage";
import CheckIcon from "@/components/icons/CheckIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import TimesIcon from "@/components/icons/TimesIcon";
import ViewCarOwnerLayout from "@/components/modules/car-owners/ViewCarOwnerLayout";
import Button from "@/components/ui/Button/Button";
import Loader from "@/components/ui/Loader/Loader";
import { useModalContext } from "@/contexts/ModalContext";
import AppLayout from "@/layouts/AppLayout";
import { capitalizeAllFirstLetters } from "@/utils";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import TextField from "@/components/ui/Input/TextField/TextField";
import { toast } from "react-toastify";
import Select from 'react-select';
import { useGetAllHubsQuery, useViewHubQuery } from "@/api-services/hubService";

const ApproveRequest = () => {
    const { setModalContent } = useModalContext();
    const [approveSuccess, setApproveSuccess] = useState(false);
    const [search, setSearch] = useState<string>("");
    const [assignedHubId, setAssignedHubId] = useState('');
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading: allHubsLoading, isError: allHubsIsError, refetch, error: allHubsError } = useGetAllHubsQuery(
        { limit: 1000, page: 1, order: "newest_first", search },
        { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );

    const [approveDeclineCar, { isLoading, isError, isSuccess, error }] = useApproveDeclineCarMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success('Approved successfully')
            setApproveSuccess(true);
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
        
            // Remove the 'approveRequest' parameter
            params.delete('approveRequest');
        
            // Construct the new URL without the 'approveRequest' parameter
            const newUrl = `${url.origin}${url.pathname}?${params.toString()}`;
        
            // Replace the current URL with the new URL
            router.replace(newUrl, undefined, { shallow: true });
        }
    }, [isSuccess])
    
    useEffect(() => {
        if (isError) toast.error('Approval failed')
    }, [isError])

    return (
        <Card bg="#FFF" width="40vw">
            <div className="flex justify-end">
                <div className="cursor-pointer" onClick={() => setModalContent(null)}><CloseIcon /></div>
            </div>
            
            {
                !approveSuccess &&
                <>
                    <div className="flex flex-col justify-center items-center mb-6">
                        <p className="font-bold my-6">Approve Request</p>
                        <p className="font-bold">Are you sure you want to approve this request?</p>
                        <p className="font-bold">This action cannot be undone</p>
                    </div>

                    <div className="flex flex-col justify-center items-center mb-6">
                        <p className="w-[80%] mx-auto">Select Inspection Hub</p>
                        <Select
                            className="w-[80%] mx-auto"
                            options={data?.data ? data?.data.map((hub: any) => {
                                return {
                                    value: hub.hubId,
                                    label: capitalizeAllFirstLetters(hub.hubName)
                                }
                            }) : []}
                            onKeyDown={(e: any) => {setSearch(e.target.value)}}
                            onChange={(e: any) => {setAssignedHubId(e.value)}}
                        />
                    </div>

                    <div className="flex justify-center items-center gap-4">
                        <Button title="Cancel" size="large" onClick={() => {
                            setModalContent(null)
                        }} />

                        <Button title="Approve Request" size="large" styles={{backgroundColor: '#1FD11B', color: '#FFF'}} loading={isLoading} disabled={isLoading} onClick={() => {
                            approveDeclineCar({id: String(id), status: 'approved', reason: '', assigned_hub_id: assignedHubId});
                        }} />
                    </div>
                </>
            }
            {
                approveSuccess &&
                <>
                    <div className="flex flex-col justify-center items-center mb-6">
                        <p className="font-bold my-6">Approve Request</p>
                        <div className="mx-auto mb-2 bg-[#E3FFE2] rounded-full p-4">
                            <img src={"/clipboard-check.svg"} alt="login to kabukabu" />
                        </div>
                        <p className="font-bold my-3">Request successfully approved</p>
                    </div>
                </>
            }
        </Card>
    )
}

const DeclineRequest = () => {
    const { setModalContent } = useModalContext();
    const [declineSuccess, setDeclineSuccess] = useState(false);
    const [reason, setReason] = useState('');
    const router = useRouter();
    const { id } = router.query;

    const [approveDeclineCar, { isLoading, isError, isSuccess, error }] = useApproveDeclineCarMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success('Declined successfully')
            setDeclineSuccess(true);
        }
    }, [isSuccess])
    
    useEffect(() => {
        if (isError) toast.error('Decline failed')
    }, [isError])

    return (
        <Card bg="#FFF" width="40vw">
            <div className="flex justify-end">
                <div className="cursor-pointer" onClick={() => setModalContent(null)}><CloseIcon /></div>
            </div>
            {
                !declineSuccess &&
                <>
                    <div className="flex flex-col justify-center items-center mb-6">
                        <p className="font-bold my-6">Decline Request</p>
                        <p className="font-bold">Are you sure you want to decline this request?</p>
                        <p className="font-bold">This action cannot be undone</p>
                    </div>

                    <TextField
                        className="!bg-[#E6E6E6] mb-4 p-3"
                        placeholder="Reason"
                        value={reason}
                        onChange={(e) => {
                           setReason(e.target.value);
                        }}
                    />

                    <div className="flex justify-center items-center gap-4">
                        <Button title="Cancel" size="large" onClick={() => {
                            setModalContent(null)
                        }} />

                        <Button title="Decline Request" size="large" styles={{backgroundColor: '#E6E6E6', color: '#EF2C5B'}} loading={isLoading} disabled={isLoading} onClick={() => {
                            approveDeclineCar({id: String(id), status: 'declined', reason, assigned_hub_id: ''});
                        }} />
                    </div>
                </>
            }
            {
                declineSuccess &&
                <>
                    <div className="flex flex-col justify-center items-center mb-6">
                        <p className="font-bold my-6">Decline Request</p>
                        <div className="mx-auto mb-2 bg-[#FEE2E9] rounded-full p-4">
                            <img src={"/clipboard-times.svg"} alt="login to kabukabu" />
                        </div>
                        <p className="font-bold my-3">Request successfully declined</p>
                    </div>
                </>
            }
        </Card>
    )
}

const SingleCar = () => {
    const { setModalContent } = useModalContext();
    const router = useRouter();
    const { id } = router.query;
    const [assignedHub, setAssignedHub] = useState('')

    const { data, isLoading, isError, refetch } = useGetSingleCarQuery(
        { id: String(id) },
        { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );

    const { data: hub, isLoading: hubLoading, isError: hubError, refetch: hubRefetch } = useViewHubQuery(
      { hubId: String(assignedHub) },
      { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );
    
    useEffect(() => {
        if (data) {
            console.log('data', data)
            if (data?.assigned_hub_for_inspection) setAssignedHub(data?.assigned_hub_for_inspection)
        }
    }, [data])

    useEffect(() => {
        if (hub) {
            console.log('hub data', hub)
        }
    }, [data, hub])

    return (
        <>
            <AppHead title="Kabukabu | Car Owners" />
            <AppLayout>
                <div className="lg:h-screen lg:overflow-hidden p-4">
                    <ActionBar handleBack={() => router.push(`${router.query.fallbackUrl}`)}>
                        <div className="flex justify-end gap-5">
                            {
                                data?.status === 'pending' && router.query.approveRequest && router.query.approveRequest === 'yes' ?
                                <>
                                    <Button title="Approve Request" startIcon={<CheckIcon />} styles={{backgroundColor: '#1FD11B', color: '#FFF'}} onClick={() => setModalContent(<ApproveRequest />)} />
                                    <Button title="Decline Request" startIcon={<TimesIcon />} styles={{backgroundColor: '#EF2C5B', color: '#FFF'}} onClick={() => setModalContent(<DeclineRequest />)} />
                                </> :
                                null
                            }
                        </div>
                    </ActionBar>
                    {data && !isLoading && !isError && (
                        <ViewCarOwnerLayout 
                            firstRow={
                                <>
                                    <CarDetailsCard
                                        carImages={data?.car?.images}
                                        carModel={`${capitalizeAllFirstLetters(data?.car?.brand_name)} ${capitalizeAllFirstLetters(data?.car?.model)} ${data?.car?.year}`}
                                        carColor={capitalizeAllFirstLetters(data?.car?.color)}
                                        plateNumber={data?.car?.plate_number}
                                        carStatus={capitalizeAllFirstLetters(data?.status)}
                                    />
                                    {/*<Card>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <p className="text-lg font-semibold">Assigned Driver</p>
                                            </div>
                                        </div>
                                    </Card>*/}
                                </>
                            }
                            secondRow={
                                <Card>
                                    <div className="flex justify-between bg-[#F5F5F5] rounded-lg w-full p-2 my-4 gap-4">
                                        <p className="font-bold">Package Type</p>
                                        <p className="text-sm">{data?.type?.replace(/_/g, ' ')}</p>
                                    </div>
                                    {
                                        data?.type === 'RENTAL' &&
                                        <div className="flex justify-between bg-[#F5F5F5] rounded-lg w-full p-2 my-4 gap-4">
                                            <p className="font-bold">Duration</p>
                                            <p className="text-sm">{data?.duration?.time_line.replace(/_/g, ' ')}</p>
                                        </div>
                                    }
                                    {
                                        data?.type === 'HIRE_PURCHASE' &&
                                        <div className="flex justify-between bg-[#F5F5F5] rounded-lg w-full p-2 my-4 gap-4">
                                            <p className="font-bold">Hire Purchase Budget</p>
                                            <p className="text-sm">N{data?.hire_purchase_budget?.total_amount}</p>
                                        </div>
                                    }
                                    {
                                        data?.type === 'HIRE_PURCHASE' &&
                                        <div className="flex justify-between bg-[#F5F5F5] rounded-lg w-full p-2 my-4 gap-4">
                                            <p className="font-bold">Hire Purchase Balance</p>
                                            <p className="text-sm">N{data?.hire_purchase_budget?.balance}</p>
                                        </div>
                                    }
                                    <div className="flex justify-between bg-[#F5F5F5] rounded-lg w-full p-2 my-4 gap-4">
                                        <p className="font-bold">Is The Car In Good Condition</p>
                                        <p className="text-sm">{data?.is_car_in_good_condition}</p>
                                    </div>
                                    <div className="flex justify-between bg-[#F5F5F5] rounded-lg w-full p-2 my-4 gap-4">
                                        <p className="font-bold">Car Issues</p>
                                        <p className="text-sm">{data?.comments}</p>
                                    </div>
                                    <div className="flex justify-between bg-[#F5F5F5] rounded-lg w-full p-2 my-4 gap-4">
                                        <p className="font-bold">Payment Type</p>
                                        <p className="text-sm">{capitalizeAllFirstLetters(data?.payment_plan)}</p>
                                    </div>

                                    {
                                        hub && !hubLoading && data?.status === 'pending_inspection' &&
                                        <>
                                            <div className="flex justify-between bg-[#F5F5F5] rounded-lg w-full p-2 my-4 gap-4">
                                                <p className="font-bold">Assigned Hub Title</p>
                                                <p className="text-sm">{capitalizeAllFirstLetters(capitalizeAllFirstLetters(hub?.inspectionCenterTitle))}</p>
                                            </div>
                                            <div className="flex justify-between bg-[#F5F5F5] rounded-lg w-full p-2 my-4 gap-4">
                                                <p className="font-bold">Assigned Hub Name</p>
                                                <p className="text-sm">{capitalizeAllFirstLetters(capitalizeAllFirstLetters(hub?.inspectionCenterLocation))}</p>
                                            </div>
                                            <div className="flex justify-between bg-[#F5F5F5] rounded-lg w-full p-2 my-4 gap-4">
                                                <p className="font-bold">Assigned Inspector</p>
                                                <p className="text-sm">{capitalizeAllFirstLetters(capitalizeAllFirstLetters(hub?.inspectorFullname))}</p>
                                            </div>
                                        </>

                                    }
                                </Card>
                            }
                        />
                    )}
                    {isLoading && !data && !isError && (
                        <div className="pt-4 flex items-center justify-center">
                            <Loader size="medium" />
                        </div>
                    )}

                    {!isLoading && !data && isError && (
                        <div className="pt-4 flex flex-col gap-2 items-center justify-center">
                            <ErrorMessage message="Error Fetching Data" />
                            <Button title="Reload" onClick={refetch} />
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    )
}

export default SingleCar;