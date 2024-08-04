import { useGetAllSurgeInStateQuery, useUpdateSurgeMutation } from "@/api-services/farePricesService";
import Card from "@/components/common/Card"
import AddIcon from "@/components/icons/AddIcon";
import TimesIconRed from "@/components/icons/TimesIconRed";
import TrashIcon from "@/components/icons/TrashIconRed";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import { useModalContext } from "@/contexts/ModalContext"
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateSurgeTimeModal:FC<any> = ({surgeDeets}) => {
    const { setModalContent } = useModalContext();
    const [currentCityView, setCurrentCityView] = useState<any>(surgeDeets)
        
    const router = useRouter();

    const { id } = router.query;

    const [updateSurgeOp, { isSuccess: updateSurgeSuccess, isError: updateSurgeError, error, isLoading: updateSurgeLoading }] =
    useUpdateSurgeMutation();

    const deleteSurgeHourAndSetState = (index: any) => {
        setCurrentCityView((prevState: any) => {
          const updatedSurgeHours = prevState.surge_hours.filter((_: any, idx: any) => idx !== index);
          return {
            ...prevState,
            surge_hours: updatedSurgeHours
          };
        });
      };
    
      const createUpdatedCityViewWithDeletedSurgeHour = (originalCityView: any, index: any) => {
        const updatedSurgeHours = originalCityView.surge_hours.filter((_: any, idx: any) => idx !== index);
        return {
          ...originalCityView,
          surge_hours: updatedSurgeHours
        };
      };
    


    const handleUpdateSurge = () => {
        const payload = {
            "surge_multiplier": currentCityView?.surge_multiplier,
            "active": currentCityView?.active,
            "surge_hours": currentCityView?.surge_hours
        }

        const surgeDeetsId = currentCityView?._id;

        updateSurgeOp({id: surgeDeetsId, payload})
    }

    const addSurgeHourAndSetState = (newSurgeHour: any) => {
        setCurrentCityView((prevState: any) => ({
          ...prevState,
          surge_hours: [...prevState.surge_hours, newSurgeHour]
        }));
    };

    const createUpdatedCityViewWithNewSurgeHour = (originalCityView: any, newSurgeHour: any) => {
        return {
            ...originalCityView,
            surge_hours: [...originalCityView.surge_hours, newSurgeHour]
        };
    };

    const handleAddSurgeHour = () => {
        const newSurgeHour = { start: 23, stop: 24, multiplier: 1.8, active: 1 };
        addSurgeHourAndSetState(newSurgeHour);
    };

    const handleLogNewCityView = () => {
        const newSurgeHour = { start: 23, stop: 24, multiplier: 1.8, active: 1 };
        const newCityView = createUpdatedCityViewWithNewSurgeHour(currentCityView, newSurgeHour);
    };

    useEffect(() => {
        if (updateSurgeSuccess) {
          toast.success("Surge Time Successfully Updated");
          setModalContent(null);
          window.location.reload();
        }
    }, [updateSurgeSuccess]);
    
    useEffect(() => {
        if (updateSurgeError) {
            console.log(error)
            toast.error("Error encountered");
        }
    }, [updateSurgeError]);

    const handleInputChange = (index: any, field: any, value: any) => {
        setCurrentCityView((prevState: any) => {
          const updatedSurgeHours = prevState.surge_hours.map((hour: any, idx: any) => {
            if (idx === index) {
              return { ...hour, [field]: parseInt(value) };
            }
            return hour;
          });
          return { ...prevState, surge_hours: updatedSurgeHours };
        });
    };

    return (
        <div className="mx-auto w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw]">
            <Card bg="#FFF">
                <p className="text-center font-semibold text-sm">Update Surge Time</p>
                <div className="my-4">
                    {
                        currentCityView && currentCityView.surge_hours.map((hr: any, index: any) => (
                            <div className="flex gap-2 my-3">
                                <div className="flex w-[90%] gap-4">
                                    <TextField
                                        label="Start Time"
                                        placeholder="Start Time Here"
                                        value={hr.start}
                                        onChange={(e) => {
                                            handleInputChange(index, 'start', e?.target?.value)
                                        }}
                                        className="w-1/3"
                                        type="number"
                                    />
                                    <TextField
                                        label="End Time"
                                        placeholder="End Time Here"
                                        value={hr.stop}
                                        onChange={(e) => {
                                            handleInputChange(index, 'stop', e?.target?.value)
                                        }}
                                        className="w-1/3"
                                        type="number"
                                    />
                                    <TextField
                                        label="Multiplier"
                                        placeholder="Multiplier"
                                        value={hr.multiplier}
                                        onChange={(e) => {
                                            handleInputChange(index, 'multiplier', e?.target?.value)
                                        }}
                                        className="w-1/3"
                                        type="number"
                                    />
                                </div>
                                <div className="flex w-[10%] justify-center mt-6">
                                    <div className="w-auto cursor-pointer" onClick={() => {
                                        deleteSurgeHourAndSetState(index);
                                        createUpdatedCityViewWithDeletedSurgeHour(currentCityView, index)
                                    }}>
                                        <TrashIcon />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-start my-4">
                    <div className="w-auto cursor-pointer flex items-center justify-center gap-3" onClick={() => {
                        handleAddSurgeHour()
                        handleLogNewCityView()
                    }}>
                        <AddIcon />
                        <p>Add New</p>
                    </div>
                </div>
                <div className="flex gap-3 w-full">
                    <div className="w-1/2">
                        <Button
                            title="Cancel"
                            className="!text-[16px] mt-6 w-full"
                            size="large"
                            disabled={false}
                            loading={false}
                            color="tetiary"
                            onClick={() => setModalContent(null)}
                        />
                    </div>
                    <div className="w-1/2">
                        <Button
                            title="Save Changes"
                            className="!text-[16px] mt-6 w-full"
                            size="large"
                            type="submit"
                            disabled={updateSurgeLoading}
                            loading={updateSurgeLoading}
                            onClick={handleUpdateSurge}
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default UpdateSurgeTimeModal;