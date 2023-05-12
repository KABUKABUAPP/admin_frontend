import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import DriversTable from "@/components/modules/drivers/DriversTable";
import CountHeader from "@/components/common/CountHeader";
import DriverOptionBar from "@/components/modules/drivers/DriverOptionBar";
import { driverOptionBarData, driverTypeFilterOptionsData } from "@/constants";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import DriverTypeFilterBox from "@/components/modules/drivers/DriverTypeFilterBox";
import { useRouter } from "next/router";
import { useGetAllDriversQuery } from "@/api-services/driversService";
import Pagination from "@/components/common/Pagination";

const Drivers: NextPage = () => {
  const router = useRouter();
  const [driverOptions, setDriverOptions] = useState(driverOptionBarData);
  const [driverTypeOptions, setDriverTypeOptions] = useState(
    driverTypeFilterOptionsData
  );
  const [carOwner, setCarOwner] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ pageSize, setPageSize ] = useState(5)

  const {
    data: drivers,
    isLoading: driversLoading,
    isError: driversError,
    refetch: reloadDrivers,
  } = useGetAllDriversQuery(
    {
      carOwner: carOwner,
      driverStatus: "declined",
      limit: pageSize,
      page: currentPage,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const handleActiveDriverOption = (keyVal: string) => {
    const mutatedOptions = driverOptions.map((option) => {
      if (option.keyVal === keyVal) return { ...option, isActive: true };
      return { ...option, isActive: false };
    });

    setDriverOptions(() => mutatedOptions);
  };

  useEffect(() => {
    handleActiveDriverOption("declined");
  }, []);

  const carOwnerObj: { [key: string]: boolean } = {
    "all-drivers": true,
    "sharp-drivers": false,
    "regular-drivers": true,
  };

  useEffect(() => {
    const activeOption = driverTypeOptions.find(
      (item) => item.isActive === true
    )?.keyVal;
    if (activeOption) setCarOwner(carOwnerObj[activeOption]);
  }, [JSON.stringify(driverTypeOptions)]);

  const handleDriverTypeOption = (keyVal: string) => {
    const mutatedOptions = driverTypeOptions.map((option) => {
      if (option.keyVal === keyVal) return { ...option, isActive: true };
      return { ...option, isActive: false };
    });

    setDriverTypeOptions(() => mutatedOptions);
  };

  return (
    <AppLayout>
      <CountHeader count={drivers?.totalCount} title="Drivers" />
      <DriverOptionBar
        options={driverOptions}
        handleClickOption={(keyVal) => {
          router.push(`/drivers/${keyVal}`);
        }}
      />
      <SearchFilterBar>
        <DriverTypeFilterBox
          options={driverTypeOptions}
          handleClickOption={(keyVal) => handleDriverTypeOption(keyVal)}
        />
      </SearchFilterBar>
      <div className="mt-5">
        <DriversTable
          tableData={drivers?.data}
          isError={driversError}
          isLoading={driversLoading}
          refetch={reloadDrivers}
        />
        {drivers && (
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={drivers.totalCount}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Drivers;
