import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AppLayout from "@/layouts/AppLayout";
import ViewSharpCarLayout from "@/components/modules/sharp-cars/ViewSharpCarLayout";
import ActionBar from "@/components/common/ActionBar";
import Card from "@/components/common/Card";
import AppHead from "@/components/common/AppHead";
import Select from 'react-select';
import { capitalizeAllFirstLetters } from "@/utils";
import { useGetAllHubsQuery } from "@/api-services/hubService";
import Avatar from "@/components/common/Avatar";
import { useGetAllSharpCarsQuery } from "@/api-services/sharpCarsService";
import TrashIcon from "@/components/icons/TrashIconRed";
import { toast } from "react-toastify";
import AddIcon from "@/components/icons/AddIcon";
import Button from "@/components/ui/Button/Button";
import { useCreateDeliveryMutation } from "@/api-services/sharpCarsService";
import TextField from "@/components/ui/Input/TextField/TextField";
import { useViewInspectorQuery } from "@/api-services/inspectorsService";

function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}


const SharpCarPending: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [carSearch, setCarSearch] = useState('');
  const [inspectorChosen, setInspectorChosen] = useState(false);
  const [inspector, setInspector] = useState('');
  const [inspectorId, setInspectorId] = useState('');
  const [inspectorPhone, setInspectorPhone] = useState('');
  const [hubChosen, setHubChosen] = useState(false);
  const [hubName, setHubName] = useState('');
  const [hubId, setHubId] = useState('');
  const [hubLocation, setHubLocation] = useState('');
  const [cars, setCars] = useState<any>([]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const currentPageUrl = router.query.current_page ? `currentPage=${router.query.current_page}` : '';
  const handleBackUrl = router.query.fallbackUrl ? router.query.fallbackUrl : `/sharp-cars?tab=car-deliveries&${currentPageUrl}`;

  const { data: hubs, isLoading: hubsLoading, isError: hubsError, refetch: hubsRefetch, error } = useGetAllHubsQuery(
    { limit: 10, page: 1, order: 'newest_first', search },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const { data: deliveryCars, isLoading: deliveryCarsLoading, isError: deliveryCarsError, refetch: deliveryCarsRefetch } = useGetAllSharpCarsQuery(
    { limit: 10, page: 1, activeStatus: 'no', assignedStatus: 'yes', search: carSearch },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const { data: inspectorData, isLoading: inspectorDataLoading, isError: inspectorDataIsError, refetch: inspectorDataRefetch, error: inspectorDataError } = useViewInspectorQuery(
    { inspectorId: inspectorId },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const [createDelivery, { isLoading: createDeliveryLoading, isError: createDeliveryIsError, isSuccess: createDeliverySuccess, error: createDeliveryError }] = useCreateDeliveryMutation();

  const submitCreateDelivery = () => {
    createDelivery({
      "hub":{
          "hub_id": hubId,
          "name": hubName,
          "location": hubLocation
      },
      "inspector":{
          "inspector_id": inspectorId,
          "name": inspector,
          "contact": inspectorData?.phone
      },
      "cars": cars.map((oneCar: any) => {
        return oneCar.carId;
      }),
      "estimated_delivery_date": formatDate(deliveryDate)
    })
  }

  useEffect(() => {
    if (createDeliverySuccess) {
      toast.success('Delivery created successfully');
      router.push(`${handleBackUrl}`)
    }
  }, [createDeliverySuccess])

  useEffect(() => {
    if (createDeliveryIsError) {
      toast.error('Error encountered while creating delivery');
    }
  }, [createDeliveryIsError])

  const handleInspectorAddition = (tag: any) => {
    setInspector(tag.hub.inspector);
    setInspectorId(tag.hub.inspectorId);
    if (inspectorData) setInspectorPhone(inspectorData?.phone);
    setHubName(tag.label);
    setHubId(tag.value);
    setHubLocation(tag.hub.address)
    setInspectorChosen(true);
    setHubChosen(true)
  };

  const handleCarDelete = (i: any) => {
    const newCars = [...cars];
    newCars.splice(i, 1);
    setCars(newCars);
  };

  const handleCarAddition = (car: any) => {
    const findDup = cars.find((carI: any) => {return carI.carId === car.car.carId});
    if (findDup) return toast.error('Duplicate car found');
    setCars([...cars, car.car]);
  };
  
  return (
    <>
    <AppHead title="Kabukabu | Sharp Cars Pending" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar backButtonText="Cancel" handleBack={() => router.push(`${handleBackUrl}`)} />

          <ViewSharpCarLayout
            firstRow={
              <>
                <div className="flex flex-col">
                  <div className="mb-3">
                    <Card>
                      <Select
                        options={hubs?.data?.map((hub: any) => {
                          return {
                            value: hub.hubId,
                            label: capitalizeAllFirstLetters(hub.hubName),
                            hub
                          }
                        })}
                        onKeyDown={(e: any) => {
                          setSearch(e.target.value)
                        }}
                        onChange={(optX: any) => {
                          handleInspectorAddition(optX)
                        }}
                      />

                      {
                        inspectorChosen && 
                        hubChosen &&
                        <>
                          <div className="mt-6">
                            <p className="text-sm font-bold">Inspector</p>
                          </div>
                          <div className="flex mt-4">
                            <div className="w-[20%]">
                              <Avatar fallBack={'I'} size="md" />
                            </div>
                            <div className="w-[80%] pt-3">
                              <p className="text-lg font-bold">{capitalizeAllFirstLetters(inspector)}</p>
                            </div>
                          </div>
                        </>
                      }
                    </Card>
                  </div>
                  <div className="mt-3">
                    <Card>
                      <p className="text-sm font-bold my-4">Type Car ID or Plate Number Here</p>
                      <Select
                        options={deliveryCars?.data?.map((car: any) => {
                          return {
                            value: car.carId,
                            label: `${capitalizeAllFirstLetters(car.carBrandModel)}, ${car.licenseNumber}`,
                            car
                          }
                        })}
                        onKeyDown={(e: any) => {
                          setCarSearch(e.target.value)
                        }}
                        onChange={(optX: any) => {
                          handleCarAddition(optX)
                        }}
                      />
                    </Card>
                  </div>
                  <div className="mt-3">
                    <Card>
                      <TextField
                        label="Estimated Delivery Date"
                        type="date"
                        onChange={(val) => {setDeliveryDate(val.target.value)}}
                        disabled={false}
                        value={deliveryDate}
                    />
                    </Card>
                  </div>
                </div>
              </>
            }
            secondRow={
                <>
                    {
                      <>
                        <Card>
                          <p className="text-lg font-bold my-3">Cars[{cars.length}]</p>
                          <div className="h-[50vh] overflow-y-scroll">
                            {
                              cars.map((oneCar: any) => (
                                <div className="flex my-3">
                                  <div className="w-[80%]">
                                    <Card bg="#F8F8F8">
                                      <p className="text-sm text-[#9A9A9A]">{oneCar.carId}</p>
                                      <div className="flex my-3">
                                        <div className="w-[20%]">
                                          <Avatar imageUrl={oneCar.images[0]} fallBack={'I'} size="md" shape="square" />
                                        </div>
                                        <div className="w-[80%] mx-3">
                                          <p className="text-md font-bold">{oneCar.carBrandModel}</p>
                                          <p className="bg-[#FFF5D8] rounded-md p-2">{oneCar.licenseNumber}</p>
                                        </div>
                                      </div>
                                    </Card>
                                  </div>
                                  <div className="w-[20%] pl-3 flex items-center">
                                    <p className="cursor-pointer" onClick={() => handleCarDelete(oneCar)}><TrashIcon /></p>
                                  </div>
                                </div>
                                
                              ))
                            }
                          </div>
                        </Card>
                        <div className="flex justify-end mt-3">
                          <Button title="Create Delivery" size="medium" startIcon={<AddIcon />} color="primary" loading={createDeliveryLoading} disabled={createDeliveryLoading} onClick={() => {submitCreateDelivery()}} />
                        </div>
                      </>
                    }
                </>
            }
          />
        </div>
      </AppLayout>
    </>
  );
};

export default SharpCarPending;

