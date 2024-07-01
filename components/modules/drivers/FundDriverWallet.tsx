import { useCompleteDriverFundingMutation, useInitiateDriverFundingMutation } from '@/api-services/driversService';
import Card from '@/components/common/Card';
import TimesIconRed from '@/components/icons/TimesIconRed';
import Button from '@/components/ui/Button/Button';
import TextField from '@/components/ui/Input/TextField/TextField';
import { useModalContext } from '@/contexts/ModalContext';
import { useUserContext } from '@/contexts/UserContext';
import useClickOutside from '@/hooks/useClickOutside';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const FundDriverWallet = () => {
    const router = useRouter();
    const { setModalContent } = useModalContext();
    const { user } = useUserContext();
    const [inputAmount, setInputAmount] = useState<number>();
    const [password, setPassword] = useState('');
    const [initiateStage, setInitiateStage] = useState(true);
    const [OTP, setOTP] = useState<string>()

    const [
        initiateDriverFunding,
        {
          isLoading: initiateLoading,
          isSuccess: initiateSuccess,
          error: initiateError,
        },
    ] = useInitiateDriverFundingMutation();

    const [
        completeDriverFunding,
        {
          isLoading: completeLoading,
          isSuccess: completeSuccess,
          error: completeError,
        },
    ] = useCompleteDriverFundingMutation();

    useEffect(() => {
        if (initiateSuccess) {
          toast.success("Funding Initiated Successfully. Check Email For OTP");
          setInitiateStage(false)
        }
    }, [initiateSuccess]);

    useEffect(() => {
        if (initiateError && "data" in initiateError) {
            const { message, status }: any = initiateError;
            if (message) toast.error(message);
            if (status) toast.error(status);
        }
    }, [initiateError]);

    useEffect(() => {
        if (completeSuccess) {
          toast.success("Funding Completed Successfully");
          setModalContent(null)
        }
    }, [completeSuccess]);

    useEffect(() => {
        if (completeError && "data" in completeError) {
            const { data, status }: any = completeError;
            console.log({completeError})
            if (data?.message) toast.error(data?.message);
            //if (status) toast.error(status);
        }
    }, [completeError]);
    
    const ref = useClickOutside<HTMLDivElement>(() => setModalContent(null));
    
    return (
        <div className="mx-auto bg-[#FFFFFF] rounded-xl w-full max-w-[450px] flex flex-col justify-center items-center p-4 py-5 gap-12" ref={ref}>
            <Card>
                <div className="flex justify-end">
                    <span className="cursor-pointer" onClick={() => {setModalContent(null)}}><TimesIconRed /></span>
                </div>
                {
                    initiateStage ?
                    <div className="my-4">
                        <p className="text-lg font-bold flex justify-center">Fund Wallet</p>
                        <TextField
                            placeholder="Enter Amount Here"
                            label="Enter Amount"
                            onChange={(e) =>
                                setInputAmount(parseInt(e.target.value))
                            }
                            className="my-3"
                            type="number"
                        />
                        <Button
                            title="Continue" 
                            size="large" 
                            loading={initiateLoading} 
                            disabled={initiateLoading} 
                            onClick={() => {
                                initiateDriverFunding({driverId: router.query.id, data: { amount: inputAmount }, adminid: user?._id});
                        }} />
                    </div> :
                    <div className="my-4">
                        <p className="text-lg font-bold flex justify-center">Verify Identity</p>
                        <TextField
                            placeholder="Enter Password Here"
                            label="Enter Password"
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="my-3"
                            type="password"
                        />
                        <TextField
                            placeholder="Enter OTP Here"
                            label="Enter OTP"
                            onChange={(e) =>
                                setOTP(e.target.value)
                            }
                            className="my-3"
                            type="number"
                        />
                        <div className="flex justify-center gap-4">
                            <Button
                                title="Cancel" 
                                size="large" 
                                color="secondary"
                                onClick={() => {
                                    setInitiateStage(true)
                                }} 
                            />
                            <Button
                                title="Complete Funding" 
                                size="large" 
                                loading={completeLoading} 
                                disabled={completeLoading} 
                                onClick={() => {
                                    completeDriverFunding({data: {otp: OTP, password: password }, adminid: user?._id});
                                }} 
                            />
                        </div>
                    </div>
                }
                
            </Card>
        </div>
    )
}

export default FundDriverWallet;