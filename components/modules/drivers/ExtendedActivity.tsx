import Card from '@/components/common/Card';
import ArrowForwardRight from '@/components/icons/ArrowForwardRight';
import SearchIcon from '@/components/icons/SearchIcon';
import TimesIconRed from '@/components/icons/TimesIconRed';
import TextField from '@/components/ui/Input/TextField/TextField';
import { useModalContext } from '@/contexts/ModalContext';
import { capitalizeFirstLetter } from '@/utils';
import React, { FC } from 'react';

function formatTime(dateString: any) {
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date value');
    }
  
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${hours}:${formattedMinutes}${ampm}`;
}
  
function calculateHoursBetween(startTime: any, endTime: any) {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
  
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date value');
    }
  
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  
    return Math.round(differenceInHours);
}

const ExtendedActivity:FC<any> = ({setTimeline, setFixedDate, extendedView, lastFiveDays, setExtendedView, onlineMonitorData}) => {
    const { setModalContent } = useModalContext();
    
    return (
        <div className="w-[90%] sm:w-[50%] md:w-[40%] lg:w-[40%]">
            <Card bg="#FFF">
                <div className="flex justify-end w-full">
                <div className="w-auto cursor-pointer" onClick={() => {
                    setModalContent(null)
                }}>
                    <TimesIconRed />
                </div>
                </div>

                <div className="w-full mt-4">
                <TextField
                    placeholder="Search by a single date or range"
                    label="Search by a single date or range"
                    type="date"
                    onChange={(e) =>{
                        setTimeline('')
                        setFixedDate(e.target.value)
                    }
                    }
                    className="my-3"
                    startIcon={<SearchIcon />}
                />
                </div>

                {
                !extendedView ?
                <div className="w-full mt-4">

                    {
                        lastFiveDays.map((day: any) => (
                        <div className="flex justify-between mt-2 mb-2 mx-3 p-4 bg-[#F6F6F6] rounded-lg cursor-pointer" onClick={() => {
                            setFixedDate(day?.day)
                            setExtendedView(true)
                        }}>
                            <div className="mt-1 mb-1 font-bold text-xs">{capitalizeFirstLetter(day?.day)}</div>
                            <div className="mt-1 mb-1 font-bold text-xs flex items-center justify-center gap-2">
                            <p className="w-auto">({day?.date})</p>
                            <ArrowForwardRight />
                            </div>
                        </div>
                        ))
                    }
                </div> :
                <>
                    <div className="flex flex-col overflow-y-scroll w-full h-[60vh]">
                    <div className="flex justify-start items-center cursor-pointer">
                        <div className="w-auto transform rotate-180 flex items-center justify-center" onClick={() => setExtendedView(false)}>
                        <ArrowForwardRight />
                        </div>
                    </div>
                    {
                        onlineMonitorData?.data?.trackers?.map((track: any) => (
                        <div className="flex flex-col mt-2 mb-2 mx-3 p-4 bg-[#F6F6F6] rounded-lg">
                            <div className="mx-3 flex justify-between">
                            <p className="mt-1 mb-1 font-bold">{track.type === 'online' ? `${formatTime(track.online_switch_time)} - ${formatTime(track.offline_switch_time)}` : `${formatTime(track.offline_switch_time)} - ${formatTime(track.online_switch_time)}`}</p>
                            <p className="mt-1 mb-1 font-bold text-xs">{track.type === 'online' ? `Online for ${calculateHoursBetween(track.online_switch_time, track.offline_switch_time)} hours` : `Offline for ${calculateHoursBetween(track.offline_switch_time, track.online_switch_time)} hours`}</p>
                            </div>
                        </div>
                        ))
                    }
                    </div>
                </>
                }
            </Card>
        </div>
    )
}

export default ExtendedActivity;