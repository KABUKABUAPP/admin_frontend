import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AppLayout from "@/layouts/AppLayout";
import ViewSharpCarLayout from "@/components/modules/sharp-cars/ViewSharpCarLayout";
import ActionBar from "@/components/common/ActionBar";
import UserInfoCard from "@/components/common/UserInfoCard";
import TripHistoryCard from "@/components/common/TripHistoryCard";
import CarDetailsCard from "@/components/common/CarDetailsCard";
import GuarantorDetailsCard from "@/components/common/GuarantorDetailsCard";
import Button from "@/components/ui/Button/Button";
import BlockIcon from "@/components/icons/BlockIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import CarDocuments from "@/components/common/CarDocuments";
import FinancialsCard from "@/components/common/FinancialsCard";
import AppHead from "@/components/common/AppHead";
import CarAssignedCard from "@/components/modules/sharp-cars/CarAssignedCard";
import { useGetOneSharpCarsQuery } from "@/api-services/sharpCarsService";
import { capitalizeAllFirstLetters } from "@/utils";
import { useGetSingleCarOwnerQuery } from "@/api-services/carOwnersService";

const SharpCarPending: NextPage = () => {
  const router = useRouter();
  const currentPageUrl = router.query.current_page ? `&currentPage=${router.query.current_page}` : '';
  const subTabUrl = router.query.sub_tab ? `&sub_tab=${router.query.sub_tab}` : '';
  const handleBackUrl = router.query.fallbackUrl ? router.query.fallbackUrl : `/sharp-cars?tab=pending${currentPageUrl}${subTabUrl}`;
  const [carOwnerId, setCarOwnerId] = useState('');

  const { id } = router.query;

  const { data, isLoading, isError, refetch } = useGetOneSharpCarsQuery(
    { id: String(id) },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  
  return (
    <>
    <AppHead title="Kabukabu | Sharp Cars Pending" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar handleBack={() => router.push(`${handleBackUrl}`)} />

          <ViewSharpCarLayout
            firstRow={
              <>
                <CarDetailsCard
                  carImages={data?.car?.images}
                  carModel={`${capitalizeAllFirstLetters(data?.car?.brand_name)}, ${capitalizeAllFirstLetters(data?.car?.model)}, ${data?.car?.year}`}
                  carColor={capitalizeAllFirstLetters(data?.car?.color)}
                  plateNumber={data?.car?.plate_number}
                  assignDriver={true}
                  addedDateTime={data?.car?.updated_at}
                />
                <CarAssignedCard assignDriver={data?.car?.assigned} driverData={data?.assigned_driver} />
              </>
            }
          />
        </div>
      </AppLayout>
    </>
  );
};

export default SharpCarPending;

