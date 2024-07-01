import Card from "@/components/common/Card";
import TimesIconRed from "@/components/icons/TimesIconRed";
import { useModalContext } from "@/contexts/ModalContext";
import { FC, useEffect } from "react";
import OnboardStepForm from "./OnboardStepForm";

interface Props {
    onboardStepsData: any
}

const UpdateOnboardStatus:FC<Props> = ({onboardStepsData}) => {
    const { setModalContent } = useModalContext();

    useEffect(() => {
        console.log({onboardStepsData})
    }, [])

    return (
        <>
            <div className="mx-auto w-[90vw] sm:w-[50vw]">
                <Card bg="#FFF">
                    <div className="p-2">
                        <div className="flex justify-end">
                            <div className="w-auto cursor-pointer" onClick={() => setModalContent(null)}><TimesIconRed /></div>
                        </div>
                        <OnboardStepForm onboardStepsData={onboardStepsData} />
                    </div>
                </Card>
            </div>
        </>
    )
}

export default UpdateOnboardStatus;