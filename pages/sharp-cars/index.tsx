import { NextPage } from "next";
import React, { useState, useEffect } from "react";

import AppLayout from "@/layouts/AppLayout";
import CountHeader from "@/components/common/CountHeader";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import SharpCarsTable from "@/components/modules/sharp-cars/SharpCarsTable";
import SharpCarOptionBar from "@/components/modules/sharp-cars/SharpCarOptionBar";
import { sharpCarsOptionsData } from "@/constants";
import { useGetAllSharpCarsQuery, useGetCarDeliveriesQuery } from "@/api-services/sharpCarsService";
import Pagination from "@/components/common/Pagination";
import AppHead from "@/components/common/AppHead";
import { useRouter } from "next/router";
import SharpCarsDeliveryTable from "@/components/modules/sharp-cars/SharpCarsDeliveryTable";
import DriverPendingTable from "@/components/modules/sharp-cars/DriverPendingTable";
import { useGetAllDriversQuery } from "@/api-services/driversService";
import { useDashboardState } from "@/contexts/StateSegmentationContext";

const headCellData = [
  { title: "ID", flex: 1 },
  { title: "Origin/Destination", flex: 2 },
  { title: "Rider", flex: 1 },
  { title: "Driver", flex: 1 },
  { title: "Car", flex: 1 },
  { title: "Status", flex: 1 },
  { title: "Reason", flex: 1 },
];


const SharpCars: NextPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);
  const [pageSize, setPageSize] = useState(5);
  const [activeStatus, setActiveStatus] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [assignedStatus, setAssignedStatus] = useState('yes');
  const [search, setSearch] = useState('');
  const [carDeliveryView, setCarDeliveryView] = useState(false);
  const [driverPendingView, setDriverPendingView] = useState(false);
  const { dashboardState, setDashboardState } = useDashboardState();

  const { data, isLoading, isError, refetch } = useGetAllSharpCarsQuery(
    { limit: pageSize, page: currentPage, activeStatus: activeStatus, assignedStatus: assignedStatus, search: search },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const { data: deliveries, isLoading: deliveriesLoading, isError: deliveriesError, refetch: deliveriesRefetch } = useGetCarDeliveriesQuery(
    { limit: pageSize, page: currentPage, deliveryStatus: deliveryStatus },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const {
    data: drivers,
    isLoading: driversLoading,
    isError: driversError,
    refetch: reloadDrivers,
  } = useGetAllDriversQuery(
    {
      carOwner: false,
      driverStatus: "pending",
      limit: pageSize,
      page: currentPage,
      search: search,
      order: 'newest_first',
      statusRemark: '',
      onboardStatus: '',
      sharpApprovalStatus: 'pending',
      dashboard_state: dashboardState
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const [options, setOptions] = useState(sharpCarsOptionsData);
  const [tab, setTab] = useState<any>('');
  const [tabInnerFilter, setTabInnerFilter] = useState<any[]>([]);
  const [innerFilterValue, setInnerFilterValue] = useState('');

  useEffect(() => {
    if (router.pathname === '/sharp-cars' && router.query.tab === undefined) {
      setTabInnerFilter([])
      setCarDeliveryView(false);
      setDriverPendingView(false);
    }

    if (router.pathname === '/sharp-cars' && router.query.tab === 'pending') {
      setTabInnerFilter(pendingInnerFilter);
      setInnerFilterValue(router.query.sub_tab ? `${router.query.sub_tab}` : 'assigned');
      setCarDeliveryView(false);
      setDriverPendingView(false);
    }

    if (router.pathname === '/sharp-cars' && router.query.tab === 'car-deliveries') {
      setTabInnerFilter(carDeliveriesInnerFilter)
      setInnerFilterValue(router.query.sub_tab ? `${router.query.sub_tab}` : 'pending-deliveries');
      setCarDeliveryView(true);
      setDriverPendingView(false)
    }

    if (router.pathname === '/sharp-cars' && router.query.tab === 'pending-drivers') {
      setTabInnerFilter([])
      setInnerFilterValue('');
      setCarDeliveryView(false);
      setDriverPendingView(true);
    }
  }, [router.query.tab]);

  const handleFilterClick = async (value: string) => {
    setInnerFilterValue(value)
  }

  const pendingInnerFilter = [
    {
      key: 'Assigned Cars',
      value: 'assigned',
      isActive: false
    },
    {
      key: 'Unassigned Cars',
      value: 'unassigned',
      isActive: false
    }
  ]

  const carDeliveriesInnerFilter = [
    {
      key: 'Pending Deliveries',
      value: 'pending-deliveries',
      isActive: false
    },
    {
      key: 'Active Deliveries',
      value: 'active-deliveries',
      isActive: false
    },
    {
      key: 'Delivered',
      value: 'delivered',
      isActive: false
    }
  ];

  const handleClickOption = (key: string) => {
    const mutatedOptions = options.map((option) => {
      if (option.keyVal === key) return { ...option, isActive: true };
      return { ...option, isActive: false };
    });

    setOptions(mutatedOptions);
    if (key.length > 0) {
      router.push(`${router.pathname}?tab=${key}`);

      if (key === 'pending') {
        setActiveStatus('no');
        if (innerFilterValue === 'assigned') setAssignedStatus('yes')
        if (innerFilterValue === 'unassigned') setAssignedStatus('no')
      }
    }
    if (key.length === 0) {
      router.push(`${router.pathname}`);
      setActiveStatus('yes');
      setAssignedStatus('yes');
    }
  };

  const filterOptions = [
    { label: "Newest First", value: "", default: true },
    { label: "Oldest First", value: "", default: false },
  ];

  const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
    filterOptions.find((opt) => opt.default === true)?.value || ""
  );

  useEffect(() => {
    if (router.query.tab !== undefined) {
      setTab(router.query.tab)
      handleClickOption(String(router?.query?.tab));
    }

    if (router.query.tab === undefined) {
      setActiveStatus('yes');
      setAssignedStatus('yes');
      setDeliveryStatus('pending')
    }
  }, [router.query.tab])

  useEffect(() => {
    if (innerFilterValue === 'assigned') setAssignedStatus('yes');
    if (innerFilterValue === 'unassigned') setAssignedStatus('no');
    if (innerFilterValue === 'pending-deliveries') setDeliveryStatus('pending');
    if (innerFilterValue === 'active-deliveries') setDeliveryStatus('active');
    if (innerFilterValue === 'delivered') setDeliveryStatus('delivered');
  }, [innerFilterValue])

  const formatTripData = (data: any) : any => {
    const formattedData = data.map((trip: any) => {
      return {
        id: trip._id,
        origin: `${trip.start_address.city || ""}, ${
          trip.start_address.state || ""
        }, ${trip.start_address.country || ""}`,
        destination: `${trip.end_address.city || ""}, ${
          trip.end_address.state || ""
        }, ${trip.end_address.country || ""}`,
        rider: trip.user?.full_name || "",
        driver: trip?.driver?.full_name,
        carModel: trip?.car?.brand_name + ' ' + trip?.car?.model,
        plateNumber: trip?.car?.plate_number,
        status: trip.status,
        reason: trip.cancel_trip_reason
      };
    });

    return formattedData;
  };

  useEffect(() => {
    if(drivers) console.log('drivers', drivers)
  }, [])

  return (
    <>
      <AppHead title="Kabukabu | Sharp Cars" />
      <AppLayout>
        {carDeliveryView ? <CountHeader title="Sharp Cars" count={deliveries?.pagination?.totalCount} /> : <CountHeader title="Sharp Cars" count={data?.totalCount} />}
        <SharpCarOptionBar
          handleClickOption={(key) => handleClickOption(key)}
          options={options}
        />
        <SearchFilterBar
          handleSearch={(val: string) => setSearch(val)}
          filterOptions={filterOptions}
          dropDownOptionSelected={selectedFilterOption}
          handleDropDown={(val) => setSelectedFilterOption(String(val))}
          pendingInnerFilter={pendingInnerFilter}
          carDeliveriesInnerFilter={carDeliveriesInnerFilter}
          tabInnerFilter={tabInnerFilter}
          innerFilterValue={innerFilterValue}
          handleFilterClick={handleFilterClick}
          carDeliveryView={carDeliveryView}
        />
        {
          !carDeliveryView && !driverPendingView && 
          <>
            <SharpCarsTable
              data={data?.data}
              isLoading={isLoading}
              isError={isError}
              refetch={refetch}
              currentPage={currentPage}
              innerFilterValue={innerFilterValue}
            />
            {data && (
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={data.totalCount}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </>
        }

        {
          carDeliveryView && !driverPendingView && 
          <>
            <SharpCarsDeliveryTable 
              data={deliveries?.data}
              isLoading={deliveriesLoading}
              isError={deliveriesError}
              refetch={deliveriesRefetch}
              currentPage={currentPage}
              innerFilterValue={innerFilterValue}
            />
            {deliveries?.data && (
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={deliveries?.pagination?.totalCount}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </>
        }

        {
          !carDeliveryView && driverPendingView && 
          <>
            {
              <DriverPendingTable
                data={drivers?.data}
                isError={driversError}
                isLoading={driversLoading}
                refetch={reloadDrivers}
                currentPage={currentPage}
                innerFilterValue={innerFilterValue}
              />
            }
            {drivers && (
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={drivers?.totalCount}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </>
        }
      </AppLayout>
    </>
  );
};

export default SharpCars;
