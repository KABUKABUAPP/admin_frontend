import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import ViewRiderLayout from "@/components/modules/riders/ViewRiderLayout";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import PhoneIcon from "@/components/icons/PhoneIcon";
import BlockIcon from "@/components/icons/BlockIcon";
import UserInfoCard from "@/components/common/UserInfoCard";
import FinancialsCard from "@/components/modules/riders/FinancialsCard";
import NextOfKinCard from "@/components/modules/riders/NextOfKinCard";
import TripHistoryCard from "@/components/common/TripHistoryCard";
import { useViewRiderQuery } from "@/api-services/ridersService";
import { useRouter } from "next/router";
import { useGetDriverTripHistoryQuery } from "@/api-services/tripsService";

const Rider: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, isError } = useViewRiderQuery(
    { id: String(id), status: "" },
    { skip: !id, refetchOnReconnect: true, refetchOnMountOrArgChange: true }
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

  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar>
          <Button title="Call Rider" startIcon={<PhoneIcon />} size="large" />
          <Button
            title="Block Rider"
            startIcon={<BlockIcon />}
            size="large"
            color="secondary"
          />
        </ActionBar>

        <ViewRiderLayout
          firstRow={
            <>
              <UserInfoCard {...data?.driver} />
              <FinancialsCard {...data?.financials} />
              <NextOfKinCard {...data?.nextOfKin} />
            </>
          }
          secondRow={
            <>
              {tripHistory && <TripHistoryCard
                tripHistoryData={tripHistory.data}
                totalCount={tripHistory.totalCount}
                currentCount={tripHistory.data.length}
                handleViewMore={() => {
                  setPageSize((ps) => ps + 5);
                }}
              />}
            </>
          }
        />
      </div>
    </AppLayout>
  );
};

export default Rider;

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
