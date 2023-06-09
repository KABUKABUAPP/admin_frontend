import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import React, { useState } from "react";

import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import PhoneIcon from "@/components/icons/PhoneIcon";
import BlockIcon from "@/components/icons/BlockIcon";
import ViewDriverLayout from "@/components/modules/drivers/ViewDriverLayout";
import DriverInfoCard from "@/components/common/UserInfoCard";
import CarDetailsCard from "@/components/common/CarDetailsCard";
import FinancialsCard from "@/components/common/FinancialsCard";
import GuarantorDetailsCard from "@/components/common/GuarantorDetailsCard";
import CarDocuments from "@/components/common/CarDocuments";
import TripHistoryCard from "@/components/common/TripHistoryCard";
import { useRouter } from "next/router";
import { useViewDriverQuery } from "@/api-services/driversService";
import Loader from "@/components/ui/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useGetDriverTripHistoryQuery } from "@/api-services/tripsService";

const Driver: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, isError, refetch } = useViewDriverQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    data: tripHistory,
    isLoading: tripHistoryLoading,
    isError: tripHistoryError,
    refetch: refetchTripHistory,
  } = useGetDriverTripHistoryQuery(
    { driverId: String(id), limit: pageSize, page: currentPage },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );
    console.log(data)
  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar>
          <Button title="Call Driver" startIcon={<PhoneIcon />} size="large" />
          <Button
            title="Block Driver"
            startIcon={<BlockIcon />}
            size="large"
            color="secondary"
          />
        </ActionBar>

        {data && !isLoading && !isError && (
          <ViewDriverLayout
            secondRow={
              <>
                {tripHistory && !tripHistoryLoading && !tripHistoryError && (
                  <TripHistoryCard
                    tripHistoryData={tripHistory.data}
                    totalCount={tripHistory.totalCount}
                    currentCount={tripHistory.data.length}
                    handleViewMore={()=>{
                      setPageSize((ps)=>ps+5)
                    }}
                  />
                )}
                {!tripHistoryLoading && !tripHistory && tripHistoryError && (
                  <div className="pt-4 flex flex-col gap-2 items-center justify-center">
                    <ErrorMessage message="Error Fetching Trip History" />
                    <Button title="Reload" onClick={refetchTripHistory} />
                  </div>
                )}
                {tripHistoryLoading && !tripHistory && !tripHistoryError && (
                  <div className="pt-4 flex items-center justify-center">
                    <Loader size="medium" />
                  </div>
                )}
              </>
            }
            firstRow={
              <>
                <DriverInfoCard {...data.driverInfo} />

                <CarDetailsCard {...data.carDetails} />

                <FinancialsCard {...data.financials} />

                <GuarantorDetailsCard {...data.guarantor} />

                <CarDocuments {...data.carDocs} />
              </>
            }
          />
        )}
        {isLoading && !data && !isError && (
          <div className="pt-4 flex items-center justify-center">
            <Loader size="medium" />
          </div>
        )}

        {!isLoading && !data && isError && (
          <div className="pt-4 flex flex-col gap-2 items-center justify-center">
            <ErrorMessage message="Error Fetching Data" />
            <Button title="Reload" onClick={refetch} />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Driver;

const mockTripHistory = [
  {
    originTop: "Kuvuki Land",
    originBottom: "",
    destinationTop: "Filmhouse Cinemas IMAX Lekki",
    destinationBottom: "22, Ozumba Mbadiwe Street, Lekki, Lagos",
    paymentMethod: "Wallet Payment",
    date: "20 January, 2023 at 3:30pm",
    amount: 1300,
    id: "#12345",
  },
  {
    originTop: "Kuvuki Land",
    originBottom: "",
    destinationTop: "Filmhouse Cinemas IMAX Lekki",
    destinationBottom: "22, Ozumba Mbadiwe Street, Lekki, Lagos",
    paymentMethod: "Wallet Payment",
    date: "20 January, 2023 at 3:30pm",
    amount: 1300,
    id: "#12345",
  },
  {
    originTop: "Kuvuki Land",
    originBottom: "",
    destinationTop: "Filmhouse Cinemas IMAX Lekki",
    destinationBottom: "22, Ozumba Mbadiwe Street, Lekki, Lagos",
    paymentMethod: "Wallet Payment",
    date: "20 January, 2023 at 3:30pm",
    amount: 1300,
    id: "#12345",
  },
];
