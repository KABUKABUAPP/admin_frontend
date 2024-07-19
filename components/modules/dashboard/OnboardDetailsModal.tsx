import Avatar from "@/components/common/Avatar";
import Card from "@/components/common/Card";
import TimesIconRed from "@/components/icons/TimesIconRed";
import { useModalContext } from "@/contexts/ModalContext";
import { capitalizeAllFirstLetters } from "@/utils";
import { FC } from "react";

function formatTime(dateString: any) {
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date value');
    }
  
    let dateNumber = date.toLocaleDateString();
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${dateNumber}, ${hours}:${formattedMinutes}${ampm}`;
}

const OnboardDetailsModal:FC<any> = ({onboardSelectedData}) => {
    console.log({onboardSelectedData})
    const { setModalContent } = useModalContext();

    return (
        <div className="w-[90vw] sm:w-[50vw] md:w-[50vw] lg:w-[40vw] mx-auto">
            <Card bg={'#FFF'}>
                <div className="flex justify-end my-4">
                    <div className="w-auto cursor-pointer" onClick={() => {setModalContent(null)}}>
                        <TimesIconRed />
                    </div>
                </div>
                <div className="max-h-[80vh] overflow-y-scroll">
                    {
                        onboardSelectedData?.data_list?.map((ref: any) => (
                            <div className="flex mt-2 mb-2 mx-3 p-4 bg-[#F6F6F6] rounded-lg">
                                <div className="mx-3">
                                    <Avatar imageUrl={''} fallBack={ref.full_name[0].toUpperCase()} size="sm" />
                                </div>
                                <div className="mx-3">
                                    <p className="mt-1 mb-1">{capitalizeAllFirstLetters(ref.full_name)}</p>
                                    <p className="mt-1 mb-1">Onboarding step: {ref.onboarding_step}</p>
                                    
                                    <p className="mt-1 mb-1">Date Created: {formatTime(ref.created_at)}</p>
                                    <p className="mt-1 mb-1">Status Remark: {ref.driver.status_remark}</p>
                                    <p className="mt-1 mb-1 text-xs text-[#9A9A9A]">{ref.driver.car_owner ? 'Owns the car' : 'Does not own the car'}</p>
                                    {
                                    ref.is_onboarding_complete &&
                                    <p className="mt-1 mb-1 text-xs text-[#9A9A9A]">User has completed onboarding</p>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Card>
        </div>
    )
}

export default OnboardDetailsModal