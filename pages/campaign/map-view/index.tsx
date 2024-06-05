import MarketerNav from "@/components/modules/campaign/MarketerNav"
import React, { useState, useEffect } from 'react';
import MapOverlay from '@/components/modules/campaign/Map/mapOverlay';
import styles from '@/components/modules/campaign/Map/style.module.css'; 
import { useFormik, Form, FormikProvider } from "formik";
import DropDown from '@/components/ui/DropDown';
import { useDashboardState } from "@/contexts/StateSegmentationContext";
import { useGetMarketerMapQuery } from "@/api-services/marketerService";

const MapViewCampaign = () => {
    const [dropDownOptionSelected, setDropDownOptionSelected] = useState('');
    const [expandTrue, setExpandTrue] = useState(true);
    const [onlineStatusOption, setOnlineStatusOption] = useState<string>("online");
    const [onlineStatusOptionRider, setOnlineStatusOptionRider] = useState<string>("online");
    const [enableDriverOption, setEnableDriverOption] = useState(true);
    const [enableRiderOption, setEnableRiderOption] = useState(true);
    const [periodFilter, setPeriodFilter] = useState('today');
    const { dashboardState, setDashboardState } = useDashboardState();
    const [currentPage, setCurrentPage] = useState(1)

    const {
        data: mapInsights,
        isLoading: mapInsightsLoading,
        isError: mapInsightError,
        refetch: reloadMaps,
    } = useGetMarketerMapQuery({limit: 10, page: currentPage}, { refetchOnReconnect: true });

    const filterOptions = [
        {
        label: 'Today',
        value: 'today',
        default: true
        },
        {
        label: 'This Week',
        value: 'this_week',
        default: false
        },
        {
        label: 'This Month',
        value: 'this_month',
        default: false
        }
    ]

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {
        
        },
    });

    const formikTwo = useFormik({
        initialValues: {},
        onSubmit: (values) => {
        
        },
    });

    
    return (
        <>
            <MarketerNav />
            <div className={styles.app}>
              <MapOverlay onlineStatusDriver={onlineStatusOption} onlineStatusRider={onlineStatusOptionRider} enableDriverOption={enableDriverOption} enableRiderOption={enableRiderOption} />

              {/* Elements above the map as overlay */}
              <div className={styles.overlay}>
                <div className="bg-[#FDFDFD] w-full gap-5 p-4 rounded-lg items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex">
                      <div className="w-[20%]">
                        <img src="/taxiOnline.svg" alt="" />
                      </div>
                      <div className="w-[80%]">
                        <p className="text-lg"><b>{mapInsights?.online_drivers?.data.length}</b></p>
                        <p><b>Drivers Online</b></p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-[20%]">
                        <img src="/taxiOfflineMod.png" alt="" />
                      </div>
                      <div className="w-[80%]">
                        <p className="text-lg"><b>{mapInsights?.offline_drivers?.data.length}</b></p>
                        <p><b>Drivers Offline</b></p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-[20%]">
                        <img src="/riderOnline.svg" alt="" />
                      </div>
                      <div className="w-[80%]">
                        <p className="text-lg"><b>{mapInsights?.online_riders?.data.length}</b></p>
                        <p><b>Riders Online</b></p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-[20%]">
                        <img src="/riderOfflineMod.png" alt="" />
                      </div>
                      <div className="w-[80%]">
                        <p className="text-lg"><b>{mapInsights?.offline_riders?.data.length}</b></p>
                        <p><b>Riders Offline</b></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.overlaySecond}>
                <div className="gap-4 mt-6">
                  <div className={`bg-[#FDFDFD] ${expandTrue ? 'w-full' : 'w-[75%]'} gap-5 p-4 rounded-lg`}>
                    <div className="flex justify-between items-center my-2">
                    <div className="font-bp flex gap-3 items-center cursor-pointer">
                      <span>View:</span>
                      <div className="flex justify-right">
                        <DropDown
                          placeholder="Filter"
                          options={filterOptions}
                          value={dropDownOptionSelected}
                          handleChange={(val) => {}}
                          rightSet={4}
                        />
                      </div>
                      
                    </div>
                      <p className="font-bold text-lg cursor-pointer" onClick={() => setExpandTrue(!expandTrue)}>
                        <img src="/arrowLeftFromLine.svg" alt="" />
                      </p>
                    </div>
                    <div className="bg-[#F8F8F8] rounded-md p-4">
                      <p className="text-xl font-bold text-left">Show</p>
                      <FormikProvider value={formik}>
                        <Form>
                          <div className="flex">
                            <div className="flex justify-center items-center gap-4">
                              <input type="radio" className="form-radio text-yellow-400  bg-yellow-400" name="enable-driver" onClick={() => {setEnableDriverOption(!enableDriverOption)}} checked={enableDriverOption} onChange={() => {}} />
                              <div className="text-lg font-bold">|</div>
                            </div>
                            <div className="flex flex-col space-y-2 p-3">
                              <label className="inline-flex items-center">
                                <input type="radio" className="form-radio text-yellow-400  bg-yellow-400" name="radio-option" onClick={() => {setOnlineStatusOption('online')}} checked={onlineStatusOption === 'online' ? true : false} onChange={() => {}} disabled={!enableDriverOption ? true : false} />
                                <span className="ml-2">Driver Online</span>
                              </label>

                              <label className="inline-flex items-center mb-4">
                                <input type="radio" className="form-radio text-yellow-400  bg-yellow-400" name="radio-option" onClick={() => setOnlineStatusOption('offline')} checked={onlineStatusOption === 'offline' ? true : false} onChange={() => {}} disabled={!enableDriverOption ? true : false} />
                                <span className="ml-2">Driver Offline</span>
                              </label>
                            </div>
                          </div>
                        </Form>
                      </FormikProvider>

                      <FormikProvider value={formikTwo}>
                        <Form>
                          <div className="flex">
                              <div className="flex justify-center items-center pt-3 gap-4">
                                <input type="radio" className="form-radio text-yellow-400  bg-yellow-400" name="enable-rider" onClick={() => {setEnableRiderOption(!enableRiderOption)}} checked={enableRiderOption} onChange={() => {}} />
                                <div className="text-lg font-bold">|</div>
                              </div>
                              <div className="flex flex-col space-y-2 p-3">
                                <label className="inline-flex items-center mt-4">
                                  <input type="radio" className="form-radio text-yellow-400  bg-yellow-400" name="radio-option" onClick={() => setOnlineStatusOptionRider('online')} checked={onlineStatusOptionRider === 'online' ? true : false} onChange={() => {}} disabled={!enableRiderOption ? true : false} />
                                  <span className="ml-2">Rider Online</span>
                                </label>

                                <label className="inline-flex items-center">
                                  <input type="radio" className="form-radio text-yellow-400  bg-yellow-400" name="radio-option" onClick={() => setOnlineStatusOptionRider('offline')} checked={onlineStatusOptionRider === 'offline' ? true : false} onChange={() => {}} disabled={!enableRiderOption ? true : false} />
                                  <span className="ml-2">Rider Offline</span>
                                </label>
                              </div>
                          </div>
                          
                        </Form>
                      </FormikProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}

export default MapViewCampaign;