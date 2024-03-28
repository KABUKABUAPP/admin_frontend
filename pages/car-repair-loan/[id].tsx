import { useGetSingleCarRepairLoanQuery, useUpdateCarRepairLoanStatusMutation } from "@/api-services/carRepairLoanService";
import ActionBar from "@/components/common/ActionBar";
import AppHead from "@/components/common/AppHead";
import CarDetailsCard from "@/components/common/CarDetailsCard";
import Card from "@/components/common/Card";
import UserInfoCard from "@/components/common/UserInfoCard";
import PhoneIcon from "@/components/icons/PhoneIcon";
import ViewCarRepairLayout from "@/components/modules/car-repair-loan/ViewCarRepairLayout";
import Button from "@/components/ui/Button/Button";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import Loader from '@/components/ui/Loader/Loader';
import ErrorMessage from '@/components/common/ErrorMessage';
import { capitalizeAllFirstLetters, capitalizeFirstLetter } from "@/utils";
import Avatar from "@/components/common/Avatar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useModalContext } from "@/contexts/ModalContext";
import { toast } from "react-toastify";
import CloseIcon from "@/components/icons/CloseIcon";
import SelectField from "@/components/ui/Input/SelectField";
import TextField from "@/components/ui/Input/TextField/TextField";
import ArrowUpDown from "@/components/icons/ArrowUpDown";


ChartJS.register(ArcElement, Tooltip, Legend);

interface ModalProps {
    currentLoanRepairStatus: string;
}

const UpdateStatus:FC<ModalProps> = ({ currentLoanRepairStatus }) => {
    const { setModalContent } = useModalContext();
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [viewStatusForm, setViewStatusForm] = useState(true);
    const [currentStatus, setCurrentStatus] = useState(currentLoanRepairStatus);
    const [mechanicName, setMechanicName] = useState('');
    const [mechanicAddress, setMechanicAddress] = useState('');
    const [mechanicContact, setMechanicContact] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [repaymentAmount, setRepaymentAmount] = useState('');
    const [repaymentFrequency, setRepaymentFrequency] = useState('');

    const router = useRouter();
    const { id } = router.query;

    const [updateCarRepairLoanStatus, { isLoading, isError, isSuccess, error }] = useUpdateCarRepairLoanStatusMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success('Status updated successfully')
            setUpdateSuccess(true);
            router.push(`${router.query.fallbackUrl}?currentPage=${router.query.current_page}`)
        }
    }, [isSuccess])
    
    useEffect(() => {
        if (isError) toast.error('Status update failed')
    }, [isError])

    return (
        <Card bg="#FFF" width="40vw">
            <div className="flex justify-end">
                <div className="cursor-pointer" onClick={() => setModalContent(null)}><CloseIcon /></div>
            </div>
            
            {
                viewStatusForm &&
                <>
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-bold my-6">Update Status</p>
                        <p className="font-bold">Update the progress of this loan</p>
                    </div>

                    <div className="my-4">
                    <SelectField
                        label="Status"
                        options={[
                            { label: "Pending Attention", value: "pending" },
                            { label: "Visit Mechanic", value: "visit_mechanic" },
                            { label: "Active", value: "active" },
                            //{ label: "Completed", value: "completed" }
                        ]}
                        placeholder="Select Country"
                        onChange={(e) => {
                            setCurrentStatus(e.target.value);
                        }}
                        value={currentStatus}
                    />
                    </div>

                    <div className="flex justify-center items-center gap-4">
                        <Button title="Cancel" size="large" styles={{backgroundColor: '#F8F8F8'}} onClick={() => {
                            setModalContent(null)
                        }} />

                        <Button title="Confirm" size="large" loading={isLoading} disabled={isLoading} onClick={() => {
                            if (currentStatus.length > 0) setViewStatusForm(false);                            
                        }} />
                    </div>
                </>
            }

            {
                currentStatus === 'visit_mechanic' && !viewStatusForm &&
                <>
                    <p className="text-md font-bold my-2">Mechanic's Details</p>
                    <TextField
                        placeholder="Name Here"
                        label="Mechanic Name"
                        onChange={(e) =>
                            setMechanicName(e.target.value)
                        }
                        className="my-3"
                        required
                    />

                    <TextField
                        placeholder="Address Here"
                        label="Mechanic Address"
                        onChange={(e) =>
                            setMechanicAddress(e.target.value)
                        }
                        className="my-3"
                        required
                    />

                    <TextField
                        placeholder="000 0000 0000"
                        label="Mechanic Contact"
                        onChange={(e) =>
                            setMechanicContact(e.target.value)
                        }
                        className="my-3"
                        required
                    />

                    <div className="flex justify-center items-center gap-4 mt-3">
                        <Button title="Cancel" size="large" styles={{backgroundColor: '#F8F8F8'}} onClick={() => {
                            setCurrentStatus('')
                            setViewStatusForm(true); 
                        }} />

                        <Button title="Assign Mechanic" size="large" loading={isLoading} disabled={isLoading} onClick={() => {
                            console.log({currentStatus, mechanicName, mechanicAddress, mechanicContact})
                            const data = {
                                status: currentStatus,
                                mechanic_details: {
                                    name: mechanicName,
                                    address: mechanicAddress,
                                    contact: mechanicContact
                                }
                            }

                            updateCarRepairLoanStatus({id: String(id), data});
                        }} />
                    </div>
                </>
            }

            {
                currentStatus === 'active' && !viewStatusForm &&
                <>
                    <p className="text-md font-bold my-2">Loan Activation</p>
                    <TextField
                        placeholder="Amount Here"
                        label="Loan Amount"
                        onChange={(e) => {
                            setLoanAmount(e.target.value);
                        }}
                        className="my-3"
                        required
                    />

                    <TextField
                        placeholder="Repayment Amount Here"
                        label="Loan Repayment"
                        onChange={(e) => {
                            setRepaymentAmount(e.target.value);
                        }}
                        className="my-3"
                        required
                    />

                    <div className="my-4">
                        <SelectField
                            label="Repayment Frequency"
                            options={[
                                { label: "Weekly", value: "WEEKLY" },
                                { label: "Monthly", value: "MONTHLY" },
                            ]}
                            placeholder="Frequency"
                            onChange={(e) => {
                                setRepaymentFrequency(e.target.value);
                            }}
                        />
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-3">
                        <Button title="Cancel" size="large" styles={{backgroundColor: '#F8F8F8'}} onClick={() => {
                            setCurrentStatus('')
                            setViewStatusForm(true); 
                        }} />

                        <Button title="Update Status" size="large" loading={isLoading} disabled={isLoading} onClick={() => {
                            console.log({currentStatus, loanAmount, repaymentAmount, repaymentFrequency})
                            const data = {
                                status: currentStatus,
                                total_cost: loanAmount,
                                installment_amount: repaymentAmount,
                                payment_type: repaymentFrequency
                            }

                            updateCarRepairLoanStatus({id: String(id), data});
                        }} />
                    </div>
                </>
            }
        </Card>
    )
}

const SinglePendingLoan = () => {
    const { setModalContent } = useModalContext();
    const router = useRouter();

    const { id } = router.query;

    const { data, isLoading, isError, refetch } = useGetSingleCarRepairLoanQuery(
        { id: String(id) },
        { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );

    const dataSets = {
        labels: [],
        datasets: [
            {
                label: '',
                data: [data?.repair_details?.total_paid, data?.repair_details?.total_cost - data?.repair_details?.total_paid],
                backgroundColor: [
                '#FFBF00',
                '#E6E6E6'
                ],
                borderColor: [
                '#FFBF00',
                '#E6E6E6'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        legend: {
            display: false
        },
        maintainAspectRatio: false, // Disable the aspect ratio lock
        responsive: true,
        aspectRatio: 1, // Set the width and height ratio (1:1 in this case for a square chart)
    };
    
    return (
        <>
            <AppHead title="Kabukabu | Car Owners" />
            <AppLayout>
            <div className="lg:h-screen lg:overflow-hidden p-4">
                <ActionBar handleBack={() => router.push(`${router.query.fallbackUrl}?currentPage=${router.query.current_page}`)}>
                    <Button title="Call Owner" startIcon={<PhoneIcon />} />
                    <Button title="Update Status" startIcon={<ArrowUpDown />} onClick={() => setModalContent(<UpdateStatus currentLoanRepairStatus={data?.repair_details?.status} />)} />
                </ActionBar>
                {//data && !isLoading && !isError && (
                    <ViewCarRepairLayout 
                        firstRow={
                            <>
                                <UserInfoCard 
                                    fullName={capitalizeAllFirstLetters(data?.repair_details?.driver?.full_name)}
                                    address={capitalizeAllFirstLetters(`${data?.repair_details?.driver?.driver?.city}, ${data?.repair_details?.driver?.driver?.state}, ${data?.repair_details?.driver?.driver?.country}`)}
                                    email={data?.repair_details?.driver?.email}
                                    phone={data?.repair_details?.driver?.phone_number}
                                    image={data?.repair_details?.driver?.profile_image}
                                />

                                <Card>
                                    <div className="flex flex-col gap-4">
                                        <CarDetailsCard
                                            carImages={data?.repair_details?.driver?.driver?.current_car?.images}
                                            carModel={capitalizeAllFirstLetters(`${data?.repair_details?.driver?.driver?.current_car?.brand_name}, ${data?.repair_details?.driver?.driver?.current_car?.year}`)}
                                            carColor={capitalizeAllFirstLetters(data?.repair_details?.driver?.driver?.current_car?.color)}
                                            plateNumber={data?.repair_details?.driver?.driver?.current_car?.plate_number.toUpperCase()}
                                        />
                                    </div>
                                </Card>

                                {
                                     (data?.repair_details?.status === 'active' || data?.repair_details?.status === 'completed') &&
                                    <>
                                        <div className="mb-4">
                                            <Card>
                                                <p className="text-lg font-bold">Mechanic's Details</p>
                                                <p className="text-md my-3">Name: {capitalizeAllFirstLetters(data?.repair_details?.mechanic_details?.name)}</p>
                                                <p className="text-md my-3">Address: {capitalizeAllFirstLetters(data?.repair_details?.mechanic_details?.address)}</p>
                                                <p className="text-md my-3">Phone Number: {capitalizeAllFirstLetters(data?.repair_details?.mechanic_details?.contact)}</p>
                                            </Card>
                                        </div>

                                        <div className="mb-4">
                                            <Card>
                                                <p className="text-lg font-bold">Car's fault</p>
                                                <p className="text-md my-3">{capitalizeFirstLetter(data?.repair_details?.fault_name)}</p>
                                                
                                                <p className="text-lg font-bold">Detailed Explanation</p>
                                                <p className="text-md my-3">{capitalizeFirstLetter(data?.repair_details?.fault_description)}</p>
                                            </Card>
                                        </div>

                                        <div className="mb-4">
                                            <Card>
                                                <p className="text-lg font-bold">Image Uploaded</p>
                                                <div className="flex max-w-[300px] overflow-x-auto scrollbar-none gap-2 mt-4">
                                                    {data?.repair_details?.images_of_fault?.map((image: string) => {
                                                        return (
                                                        <div>
                                                            <Avatar imageUrl={image} fallBack="" shape="square" size="lg" />
                                                        </div>
                                                        );
                                                    })}
                                                </div>
                                            </Card>
                                        </div>
                                    </>
                                }

                            </>
                        }
                        secondRow={
                            <>
                                {   data?.repair_details?.status === 'visit_mechanic' &&
                                    <div className="mb-4">
                                        <Card>
                                            <p className="text-lg font-bold">Mechanic's Details</p>
                                            <p className="text-md my-3">Name: {capitalizeAllFirstLetters(data?.repair_details?.mechanic_details?.name)}</p>
                                            <p className="text-md my-3">Address: {capitalizeAllFirstLetters(data?.repair_details?.mechanic_details?.address)}</p>
                                            <p className="text-md my-3">Phone Number: {capitalizeAllFirstLetters(data?.repair_details?.mechanic_details?.contact)}</p>
                                        </Card>
                                    </div>
                                }

                                {
                                    (data?.repair_details?.status === 'visit_mechanic' || data?.repair_details?.status === 'pending') &&
                                    <>
                                        <div className="mb-4">
                                            <Card>
                                                <p className="text-lg font-bold">Car's fault</p>
                                                <p className="text-md my-3">{capitalizeFirstLetter(data?.repair_details?.fault_name)}</p>
                                            </Card>
                                        </div>

                                        <div className="mb-4">
                                            <Card>
                                                <p className="text-lg font-bold">Detailed Explanation</p>
                                                <p className="text-md my-3">{capitalizeFirstLetter(data?.repair_details?.fault_description)}</p>
                                            </Card>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <Card>
                                                <p className="text-lg font-bold">Image Uploaded</p>
                                                <div className="flex max-w-[300px] overflow-x-auto scrollbar-none gap-2 mt-4">
                                                    {data?.repair_details?.images_of_fault?.map((image: string) => {
                                                        return (
                                                        <div>
                                                            <Avatar imageUrl={image} fallBack="" shape="square" size="lg" />
                                                        </div>
                                                        );
                                                    })}
                                                </div>
                                            </Card>
                                        </div>
                                    </>
                                }
                                {
                                    (data?.repair_details?.status === 'active' || data?.repair_details?.status === 'completed') &&
                                    <>
                                        <div className="mb-4">
                                            <Card>
                                                <div className="flex flex-col">
                                                    <div className="flex my-3">
                                                        <div className="w-1/5">
                                                            <Doughnut data={dataSets} options={options} height={'75px'} />
                                                        </div>
                                                        <div className="w-4/5 flex items-center">
                                                            {`N${data?.repair_details?.total_paid} of N${data?.repair_details?.total_cost} paid`}
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="flex flex-col">
                                                        <p className="text-md my-2">{`N${data?.repair_details?.installment_amount} ${data?.repair_details?.payment_type.toLowerCase()}`}</p>
                                                        <p className="text-md my-2">{`Next payment due: ${new Date(data?.next_due_date).toUTCString()}`}</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>

                                        <div className="mb-4">
                                            <Card>
                                                <p className="text-lg font-bold">Payment History</p>
                                                <div className="flex flex-col mt-3">
                                                    {
                                                        data?.payment_history?.map((history: any) => {
                                                            return (
                                                                <div className="rounded-md bg-[#F8F8F8] p-4 gap-3 my-2">
                                                                    <p className="text-md font-bold">N{history.amount_to_be_paid}</p>
                                                                    <p className="text-sm">N{new Date(history.date_paid).toUTCString()}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Card>
                                        </div>
                                    </>
                                }
                            </>
                        }
                    />
                //)
                }
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

export default SinglePendingLoan