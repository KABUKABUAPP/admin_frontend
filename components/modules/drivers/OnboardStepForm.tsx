import React, { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { capitalizeAllFirstLetters } from '@/utils';
import { useUpdateOnboardingStepMutation } from '@/api-services/driversService';
import { toast } from 'react-toastify';
import { useModalContext } from '@/contexts/ModalContext';
import { useRouter } from 'next/router';

const OnboardStepForm:FC<any> = ({onboardStepsData}) => {
    const router = useRouter();
    const { setModalContent } = useModalContext();
    const [
        initiateOnboardingUpdate,
        {
            isLoading,
            isSuccess,
            error,
            isError
        },
    ] = useUpdateOnboardingStepMutation();

    const formik = useFormik({
        initialValues: {
        option: '',
        },
        onSubmit: (values):any => {
            console.log('Form values:', values);
        },
    });

    useEffect(() => {
        if (isSuccess) {
          toast.success("Updated Successfully.");
          setModalContent(null)
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error('Error encountered while updating onboarding step');
        }
    }, [isError]);

    const id = String(router.query.id);

    return (
        <div className="h-auto flex items-center justify-center p-4">
        <form
            className="w-full"
        >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Choose Onboarding Step</h2>
            
            {Object.values(onboardStepsData).map((option: any, index: any) => (
            <label key={index} className="flex items-center mb-4 cursor-pointer">
                <input
                    type="radio"
                    name="option"
                    value={option.queue_number}
                    onChange={(e: any) => {
                        console.log(e)
                        const reqData = {
                            step: parseInt(e.target.value)
                        }
            
                        toast.success('Updating, please wait')
                        initiateOnboardingUpdate({data: reqData, id})
                    }}
                    className="form-radio h-5 w-5 text-yellow-400 border-gray-300 focus:ring-yellow-500 cursor-pointer"
                />
                <span className="ml-2 text-gray-700 text-lg">{capitalizeAllFirstLetters(option.description)}({option.queue_number})</span>
            </label>
            ))}

            {formik.touched.option && formik.errors.option ? (
            <div className="text-red-500 text-sm mb-4">{formik.errors.option}</div>
            ) : null}
        </form>
        </div>
    );
};

export default OnboardStepForm;
