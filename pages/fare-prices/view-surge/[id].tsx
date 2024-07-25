import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AppLayout from "@/layouts/AppLayout";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import TrashIcon from "@/components/icons/TrashIcon";
import ViewFarePriceLayout from "@/components/modules/fare-prices/ViewFarePriceLayout";
import { useModalContext } from "@/contexts/ModalContext";
import { useGetAllSurgeInStateQuery, useUpdateSurgeMutation } from "@/api-services/farePricesService";
import Loader from "@/components/ui/Loader/Loader";
import AppHead from "@/components/common/AppHead";
import Select from "react-select";
import { capitalizeAllFirstLetters } from "@/utils";
import Card from "@/components/common/Card";
import FareDetailsCard from "@/components/modules/fare-prices/FareDetailsCard";
import SurgeDetailsCard from "@/components/modules/fare-prices/SurgeDetailsCard";
import EditIcon from "@/components/icons/EditIcon";
import { current } from "@reduxjs/toolkit";
import Switch from "react-switch";
import { toast } from "react-toastify";
import UpdateSurgeTimeModal from "@/components/modules/fare-prices/UpdateSurgeTime";

const FareSurge: NextPage = () => {
    const { setModalContent } = useModalContext();
    const [currentCityView, setCurrentCityView] = useState<any>()
    const router = useRouter();

    const { id } = router.query;

    const { data, isLoading, isError, refetch } = useGetAllSurgeInStateQuery(
        { id: id as string },
        { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );
    
    const [updateSurgeOp, { isSuccess: updateSurgeSuccess, isError: updateSurgeError, error, isLoading: updateSurgeLoading }] = useUpdateSurgeMutation();

    useEffect(() => {
        if (updateSurgeSuccess) {
            toast.success("Surge Time Successfully Updated");
        }
    }, [updateSurgeSuccess]);

    useEffect(() => {
        if (updateSurgeError) {
            console.log(error)
            toast.error("Error encountered");
        }
    }, [updateSurgeError]);

    useEffect(() => {
        if (data) {
            console.log({data})
            setCurrentCityView(data?.data[0])
        }
    }, [data])
  
  const createUpdatedCityView = (originalCityView: any, index: any, newActiveValue: any) => {
    // Create a new surge_hours array with the updated value
    const updatedSurgeHours = originalCityView.surge_hours.map((hour: any, idx: any) =>
      idx === index ? { ...hour, active: newActiveValue } : hour
    );

    console.log({
        ...originalCityView,
        surge_hours: updatedSurgeHours
    })

    const payload = {
        "surge_multiplier": currentCityView.surge_multiplier,
        "active": currentCityView.active,
        "surge_hours": updatedSurgeHours
    }

    const surgeDeetsId = currentCityView._id;

    updateSurgeOp({id: surgeDeetsId, payload})
  };

  const updateSurgeHourActive = (index: any, newActiveValue: any) => {
    setCurrentCityView((prevState: any) => {
      const updatedSurgeHours = prevState.surge_hours.map((hour: any, idx: any) => 
        idx === index ? { ...hour, active: newActiveValue } : hour
      );

      return {
        ...prevState,
        surge_hours: updatedSurgeHours
      };
    });
  };


  useEffect(() => {
    if (currentCityView) {
        console.log('{currentCityView}')
    }
  }, [currentCityView])
  
  return (
    <>
      <AppHead title="Kabukabu | Fare Prices" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar handleBack={() => router.push(`/fare-prices/${id}?current_tab=${router.query.tab}`)}>
            <Button
              title="Delete Surge"
              size="large"
              color="secondary"
              startIcon={<TrashIcon />}
            />
          </ActionBar>
          {isLoading && !data && !isError && (
            <div className="pt-6 flex justify-center w-full">
              <Loader size="medium" />
            </div>
          )}
          {!data && isError && !isLoading && (
            <div className="flex flex-col items-center gap-3 pt-6">
              <p className="text-rose-600">Oops! Something went wrong</p>
              <div>
                <Button title="Reload" onClick={refetch} />
              </div>
            </div>
          )}
          {data && !isLoading && !isError && (
            <ViewFarePriceLayout
              asideComponents={
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                        <p className="text-sm w-full">Surge City: <span className="font-bold">{currentCityView?.city}</span></p>
                        <Select
                            options={data?.data?.map((oneSurge: any) => {
                                return {
                                    value: oneSurge.city,
                                    label: capitalizeAllFirstLetters(oneSurge.city),
                                    option: oneSurge
                                }
                            })}
                            className="w-full"
                            /*onKeyDown={(e: any) => {
                                setSearch(e.target.value)
                            }}*/
                            onChange={(optX: any) => {
                                setCurrentCityView(optX.option)
                            }}
                        />
                    </div>

                    {
                        isLoading && !data && !currentCityView &&
                        <div className="flex justify-center items-center">
                            <Loader />
                        </div>
                    }

                    {
                        !isLoading && data && currentCityView &&
                        <SurgeDetailsCard
                            surgeId={`${currentCityView._id}`}
                            surgeCity={currentCityView.city}
                            surgeMultiplier={currentCityView.surge_multiplier}
                            createdOn={new Date(currentCityView.created_at).toLocaleDateString()}
                            surgeDeets={currentCityView}
                        />
                    }
                </div>
              }
              mainComponents={
                <Card bg="#FFF">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between my-5">
                            <p className="text-sm w-full font-bold">Surge Time</p>
                            <div className="w-auto cursor-pointer" onClick={() => setModalContent(<UpdateSurgeTimeModal surgeDeets={currentCityView} />)}>
                                <EditIcon />
                            </div>
                        </div>

                        {
                            data && currentCityView && currentCityView.surge_hours.map((hr: any, index: any) => (
                                <div className="flex justify-between bg-[#F1F1F1] rounded-lg p-3">
                                    <p>{hr.start} - {hr.stop}</p>
                                    <div className="w-auto">
                                        <Switch onChange={() => {
                                            updateSurgeHourActive(index, hr.active ? 0 : 1)
                                            createUpdatedCityView(currentCityView, index, hr.active ? 0 : 1);
                                        }} checked={hr.active} />
                                    </div>
                                </div>
                            )) 
                        }

                    </div>
                </Card>
              }
            />
          )}
        </div>
      </AppLayout>
    </>
  );
};

export default FareSurge;
