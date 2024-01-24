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
import { useGetAllSharpCarsQuery, useGetSingleDeliveryQuery } from "@/api-services/sharpCarsService";
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

function formatDateTime(inputTime: string) {
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedTime = new Date(inputTime).toLocaleDateString('en-US', options);
  
    // Extracting time part and formatting it
    const timePart = new Date(inputTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  
    return `${formattedTime} at ${timePart}`;
}

const SingleCarDelivery: NextPage = () => {
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

  const { id } = router.query;

  const { data: singleDelivery, isLoading: singleDeliveryLoading, isError: singleDeliveryIsError, refetch: singleDeliveryRefetch } = useGetSingleDeliveryQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  useEffect(() => {
    if (singleDelivery) console.log('mende', singleDelivery)
  }, [singleDelivery]);
  
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
                        <p className="text-sm font-bold">#{id}</p>
                        <div className="flex flex-col my-3">
                            <p className="text-sm font-bold">Delivering to:</p>
                            <p className="text-lg font-bold">{capitalizeAllFirstLetters(singleDelivery?.hub.name)}</p>
                            <p className="text-xs font-bold cursor-pointer" onClick={() => router.push(`/hubs/${singleDelivery?.hub.hub_id}?current_page=1`)}>View Hub</p>
                        </div>
                        <hr />
                        <div className="flex flex-col my-3">
                            <p className="text-sm font-bold">Hub Inspector:</p>
                            <p className="text-lg font-bold">{capitalizeAllFirstLetters(singleDelivery?.inspector.name)}</p>
                            <p className="text-xs font-bold cursor-pointer" onClick={() => router.push(`/inspectors/${singleDelivery?.inspector.inspector_id}?current_page=1`)}>View Inspector</p>
                        </div>
                        <hr />
                        <div className="flex flex-col my-3">
                            <p className="text-sm font-bold">Total cars:</p>
                            <p className="text-lg font-bold">{singleDelivery?.cars.length}</p>
                        </div>
                        <hr />
                        <div className="flex flex-col my-3">
                            <p className="text-sm font-bold">Estimated delivery:</p>
                            <p className="text-lg font-bold">{formatDate(singleDelivery?.estimated_delivery_date)}</p>
                        </div>
                        <hr />
                        <div className="flex flex-col my-3">
                            <p className="text-sm font-bold">Status:</p>
                            <p className="text-lg font-bold">{capitalizeAllFirstLetters(singleDelivery?.status)}</p>
                        </div>
                        <hr />
                        <div className="flex flex-col my-3">
                            <p className="text-sm font-bold">Confirmed by:</p>
                            <p className="text-lg font-bold">{capitalizeAllFirstLetters(singleDelivery?.inspector.name)}</p>
                        </div>
                        <hr />
                        <div className="flex flex-col my-3">
                            <p className="text-sm font-bold">Phone number:</p>
                            <p className="text-lg font-bold">{singleDelivery?.inspector.contact}</p>
                        </div>
                        <hr />
                        <div className="flex flex-col my-3">
                            <p className="text-sm font-bold">Created on:</p>
                            <p className="text-lg font-bold">{formatDateTime(singleDelivery?.updated_at)}</p>
                        </div>
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
                          <p className="text-lg font-bold my-3">Cars[{singleDelivery?.cars.length}]</p>
                          <div className="h-[auto]">
                            {
                              singleDelivery?.cars.map((oneCar: any) => (
                                <div className="flex my-3">
                                  <div className="w-full">
                                    <Card bg="#F8F8F8">
                                      <p className="text-sm text-[#9A9A9A]">{oneCar._id}</p>
                                      <div className="flex my-3">
                                        <div className="w-[20%]">
                                          <Avatar imageUrl={oneCar.images[0]} fallBack={'I'} size="md" shape="square" />
                                        </div>
                                        <div className="w-[80%] mx-3">
                                          <p className="text-md font-bold">{capitalizeAllFirstLetters(`${oneCar.brand_name} ${oneCar.year} ${oneCar.color}`)}</p>
                                          <p className="bg-[#FFF5D8] rounded-md p-2">{oneCar.plate_number}</p>
                                        </div>
                                      </div>
                                    </Card>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </Card>
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

export default SingleCarDelivery;

