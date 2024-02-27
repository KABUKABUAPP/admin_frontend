import { useGetSingleCarOwnerQuery } from '@/api-services/carOwnersService';
import ActionBar from '@/components/common/ActionBar';
import AppHead from '@/components/common/AppHead';
import Card from '@/components/common/Card';
import ErrorMessage from '@/components/common/ErrorMessage';
import UserInfoCard from '@/components/common/UserInfoCard';
import PhoneIcon from '@/components/icons/PhoneIcon';
import CarsList from '@/components/modules/car-owners/CarsList';
import ViewCarOwnerLayout from '@/components/modules/car-owners/ViewCarOwnerLayout';
import Button from '@/components/ui/Button/Button';
import Loader from '@/components/ui/Loader/Loader';
import AppLayout from '@/layouts/AppLayout';
import { capitalizeAllFirstLetters } from '@/utils';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ViewCarOwner = () => {
    const router = useRouter();

    const { id } = router.query;

    const { data, isLoading, isError, refetch } = useGetSingleCarOwnerQuery(
        { id: String(id) },
        { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );

    return (
        <>
            <AppHead title="Kabukabu | Car Owners" />
            <AppLayout>
            <div className="lg:h-screen lg:overflow-hidden p-4">
                <ActionBar handleBack={() => router.push(`/car-owners?currentPage=${router.query.current_page}`)}>
                    <Button title="Call Owner" startIcon={<PhoneIcon />} />
                </ActionBar>
                {data && !isLoading && !isError && (
                    <ViewCarOwnerLayout 
                        firstRow={
                            <>
                                <UserInfoCard 
                                    fullName={capitalizeAllFirstLetters(data?.full_name)}
                                    address={capitalizeAllFirstLetters(data?.address)}
                                    email={data?.email}
                                    phone={data?.phone_number}
                                    carCount={data?.total_cars}
                                    image={data?.profile_image}
                                />

                                <Card>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-semibold">Financials</p>
                                        </div>
                                        <>
                                            <div className="flex py-4 border-b border-b-[#D4D4D4]">
                                                <div className="pr-3 border-r border-r-[#D4D4D4]">
                                                <p className="text-2xl font-semibold">{data?.wallet_balance}</p>
                                                <p className="text-lg text-[#9A9A9A]">Wallet Balance</p>
                                                </div>

                                                <div className="pl-3">
                                                <p className="text-2xl font-semibold">{data?.total_amount_earned}</p>
                                                <p className="text-lg text-[#9A9A9A]">Total Amount Earned</p>
                                                </div>
                                            </div>
                                        </>
                                    </div>
                                </Card>
                            </>
                        }
                        secondRow={
                            <CarsList cars={data?.cars} />
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

export default ViewCarOwner;