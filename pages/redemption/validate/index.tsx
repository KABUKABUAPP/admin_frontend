import AppHead from '@/components/common/AppHead';
import RedemptionNav from '@/components/modules/redemption/RedemptionNav';
import Button from '@/components/ui/Button/Button';
import TextField from '@/components/ui/Input/TextField/TextField';
import React, { useEffect, useState } from 'react';
import { useViewVoucherQuery, useUpdateValidateMutation } from '@/api-services/redemptionService';
import { capitalizeAllFirstLetters } from '@/utils';
import Loader from '@/components/ui/Loader/Loader';
import Avatar from '@/components/common/Avatar';
import { toast } from 'react-toastify';

const RedemptionValidate = () => {
    const [validationCode, setValidationCode] = useState<any>('');

    const { data, isLoading, error, refetch } = useViewVoucherQuery(
        {
          code: validationCode
        },
        { refetchOnReconnect: true }
    );

    const [updateValidate, { data: updateValidateData, isLoading: updateValidateLoading, error: updateValidateError, isSuccess: updateValidateSuccess }] = useUpdateValidateMutation();

    useEffect(() => {
        if (validationCode.length > 0) refetch();
    }, [validationCode]);

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    useEffect(() => {
        if (updateValidateData) console.log(updateValidateData);
    }, [updateValidateData]);

    useEffect(() => {
        if (updateValidateError) toast.error('There was an error redeeming the voucher')
    }, [updateValidateError])

    useEffect(() => {
        if (updateValidateSuccess) toast.success('Redeemed successfully')
    }, [updateValidateSuccess])

    return (
        <>
            <AppHead title={'Validate Redemption Code'} />
            <RedemptionNav />
            <div className="flex flex-col gap-2 p-3 items-center justify-center">
                <div className="w-[90%] sm:w-[60%] lg:w-[40%] mx-auto flex items-center justify-center">
                    <TextField
                        label="Enter Redeem Code"
                        placeholder="Enter here"
                        value={validationCode}
                        onChange={(e) => {
                            setValidationCode(e?.target?.value)
                            console.log(e?.target?.value)
                        }}
                    />
                </div>
                {
                    isLoading &&
                    <Loader />
                }
                {
                    data &&
                    <div className="w-[90%] sm:w-[60%] lg:w-[40%] mx-auto flex flex-col gap-3">
                        <div className='bg-[#E3FFE2] w-full rounded-md flex flex-col gap-2 p-2'>
                            <p className='text-xl font-semibold'>{capitalizeAllFirstLetters(data?.promotion?.name)}</p>
                            <div>{data?.promotion?.description}</div>
                            <div className="flex">
                                <div className="w-1/5">
                                    <Avatar imageUrl={data?.user?.profile_image} fallBack={data?.user?.full_name[0]} size="sm" />
                                </div>
                                <div className="w-4/5 flex flex-col gap-2">
                                    <p className='text-xs'>{capitalizeAllFirstLetters(data?.user?.full_name)}</p>
                                    <p className='text-xs'>{data?.user?.email}</p>
                                    <p className='text-xs'>{data?.user?.phone_number}</p>
                                </div>
                            </div>
                            {
                                data?.redeemed &&
                                <p>This voucher has been redeemed</p>
                            }
                        </div>
                        <Button
                            title="Validate"
                            className="w-full"
                            type="submit"
                            loading={updateValidateLoading}
                            disabled={data?.redeemed}
                            onClick={() => {
                                updateValidate({
                                    id: data._id,
                                    body: {}
                                })
                            }}
                        />
                    </div>
                }
            </div>
        </>
    )
}

export default RedemptionValidate;