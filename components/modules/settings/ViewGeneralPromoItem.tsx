import { useRouter } from "next/router";
import React, { FC, useState, useEffect, useRef, useLayoutEffect } from "react";

import ChevronLeft from "@/components/icons/ChevronLeft";
import Button from "@/components/ui/Button/Button";
import PromotionItem from "./PromotionItem";
import Subscriber from "./Subscriber";
import { useViewAllPromosNewQuery, useGetPromoSubscribersQuery, useRewardPromoSubscribersMutation } from "@/api-services/settingsService";
import Loader from "@/components/ui/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import Pagination from "@/components/common/Pagination";
import { useDeletePromoMutation } from "@/api-services/settingsService";
import TrashIcon from "@/components/icons/TrashIcon";
import { toast } from "react-toastify";
import useUserPermissions from "@/hooks/useUserPermissions";
import PromotionItemNew from "./PromotionItemNew";
import SubscriberNew from "./SubscriberNew";
import DropDownTwo from "@/components/ui/DropDownTwo";

interface Props {
  handleBack: () => void;
}



const ViewGeneralPromoItem: FC<Props> = ({ handleBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPromo, setCurrentPromo] = useState<any>(null)
  const [periodFilter, setPeriodFilter] = useState('all_time');
  const [paidStatus, setPaidStatus] = useState(false);
  const { promoId, promoPageSize, promoCurrentPage, promoPageStatus } = useRouter().query;

  const { data, isLoading, error, refetch } = useViewAllPromosNewQuery(
    {
      limit: promoPageSize,
      page: promoCurrentPage,
      status: promoPageStatus
    },
    { refetchOnReconnect: true }
  );

  const { data: promoSubs, isLoading: promoSubsLoading, error: promoSubsError, refetch: promoSubsRefetch } = useGetPromoSubscribersQuery(
    {
      limit: pageSize,
      page: currentPage,
      promoId: String(promoId),
      promoStatus: promoPageStatus,
      redemptionType: 'unredeemed',
      periodFilter: periodFilter
    },
    { refetchOnReconnect: true }
  );

  useEffect(() => {
    if (data) {
        const theCurrentPromo = data?.data?.find((d: any) => {
            return d.id === promoId
        })

        setCurrentPromo(theCurrentPromo);
    }
  }, [data]);

  const { userPermissions } = useUserPermissions();

  const periodFilterOptions = [
    { label: "Yesterday", value: "yesterday"},
    { label: "Today", value: "today" },
    { label: "This Week", value: "this_week" },
    { label: "This Month", value: "this_month" },
    { label: "Last 6 Months", value: "6_months" },
    { label: "Last 12 Months", value: "12_months" },
    { label: "Last 2 Years", value: "2_years" },
    { label: "All Time", value: "all_time", default: true }
  ];

  const handlePeriodFilter = (e: any) => {
    setPeriodFilter(e)
  }
  
  const [
      rewardPromo,
      {
        isSuccess: rewardPromoSuccess,
        isLoading: rewardPromoLoading,
        error: rewardPromoError,
      },
  ] = useRewardPromoSubscribersMutation();

  const rewardAll = () => {
    const user_ids = promoSubs?.data.map((sub: any) => {
      return sub.user._id
    })

    rewardPromo({user_ids})
  }

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }

      if (rewardPromoSuccess) toast.success('User Rewarded');
      setPaidStatus(true);
  }, [rewardPromoSuccess]);

  useLayoutEffect(() => {
      if (rewardPromoError) toast.error('Error encountered');
  }, [rewardPromoError])

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <Button
          onClick={handleBack}
          title="Back"
          variant="text"
          startIcon={<ChevronLeft />}
        />
      </div>
      <span className="absolute top-3 left-0"></span>
      {data && !error && !isLoading && (
        <>
          <div className="pt-14">
            {currentPromo !== null && <PromotionItemNew data={currentPromo} />}
          </div>

          {promoSubs && <div className="mt-6">
            <div className="flex justify-between">
              <p className="text-xl font-medium mb-6">
                {promoSubs?.pagination?.totalCount ? `${promoSubs?.pagination?.totalCount} Subscribers` : "No Subscribers"}
              </p>
              {
              promoSubs?.data && promoSubs?.data.length > 0 &&  
                <div className="flex">
                  <div className="mx-2">
                    <>
                      {
                        paidStatus ? 
                        <Button title="Paid" disabled={true} /> :
                        <Button title="Pay All" onClick={rewardAll} loading={rewardPromoLoading} disabled={rewardPromoLoading} />
                      }
                    </>
                  </div>
                  <div className="mx-2 mt-1">
                    <p><b>|</b></p>
                  </div>
                  <div className="mx-2 mt-2">
                    <DropDownTwo  
                      placeholder="Timeline"
                      options={periodFilterOptions}
                      value={periodFilter}
                      handleChange={(val) => {
                        handlePeriodFilter(String(val));
                      }}
                    />
                  </div>
                </div>
              }
            </div>
            
            <div className="mt-2 grid grid-cols-2 gap-4">
              {promoSubs?.data &&
                promoSubs?.data.map((sub: any, idx: any) => (
                  <SubscriberNew key={idx} data={sub} allPaid={paidStatus} />
                ))}
            </div>
          </div>}
        </>
      )}

      {!promoSubs && !promoSubsError && promoSubsLoading === null && (
        <div className="p-4 py-10 flex flex-col gap-4 items-center">
          <Loader />
        </div>
      )}

      {!promoSubs && promoSubsError && !promoSubsLoading && (
        <div className="p-4 py-10 flex flex-col gap-4 items-center">
          <ErrorMessage message="Error retrieving data" />
          <Button title="Reload" onClick={promoSubsRefetch} />
        </div>
      )}

      {data && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={promoSubs?.pagination?.totalCount}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default ViewGeneralPromoItem;
