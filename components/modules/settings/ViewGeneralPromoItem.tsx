import { useRouter } from "next/router";
import React, { FC, useState, useEffect } from "react";

import ChevronLeft from "@/components/icons/ChevronLeft";
import Button from "@/components/ui/Button/Button";
import PromotionItem from "./PromotionItem";
import Subscriber from "./Subscriber";
import { useViewAllPromosNewQuery, useGetPromoSubscribersQuery } from "@/api-services/settingsService";
import Loader from "@/components/ui/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import Pagination from "@/components/common/Pagination";
import { useDeletePromoMutation } from "@/api-services/settingsService";
import TrashIcon from "@/components/icons/TrashIcon";
import { toast } from "react-toastify";
import useUserPermissions from "@/hooks/useUserPermissions";
import PromotionItemNew from "./PromotionItemNew";

interface Props {
  handleBack: () => void;
}

const ViewGeneralPromoItem: FC<Props> = ({ handleBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPromo, setCurrentPromo] = useState<any>(null)
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
      limit: promoPageSize,
      page: promoCurrentPage,
      promoId: promoId,
      promoStatus: promoPageStatus,
      redemptionType: 'unredeemed'
    },
    { refetchOnReconnect: true }
  );

  const [
    deletePromo,
    {
      isSuccess: promoDeleteSuccess,
      isLoading: promoDeleteLoading,
      error: promoDeleteError,
    },
  ] = useDeletePromoMutation();

  useEffect(() => {
    if (promoDeleteSuccess) {
      toast.success("Promo Successfully Deleted");
      handleBack();
    }
  }, [promoDeleteSuccess]);

  useEffect(() => {
    if (promoDeleteError && "data" in promoDeleteError) {
      const { message }: any = promoDeleteError;
      toast.error(message);
    }
  }, [promoDeleteError]);

  useEffect(() => {
    if (data) {
        const theCurrentPromo = data?.data?.find((d: any) => {
            return d.id === promoId
        })

        setCurrentPromo(theCurrentPromo);
    }
  }, [data]);

  useEffect(() => {
    if (promoSubs) {
      console.log('the Subs', promoSubs)
    }
  }, [promoSubs]);

  const { userPermissions } = useUserPermissions()

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <Button
          onClick={handleBack}
          title="Back"
          variant="text"
          startIcon={<ChevronLeft />}
        />
        {/*data &&
          userPermissions &&
          userPermissions.promotions_permissions.write && (
            <Button
              onClick={() => deletePromo({ promoId: String(promoId) })}
              title="Delete Promotion"
              color="secondary"
              startIcon={<TrashIcon />}
              loading={promoDeleteLoading}
              disabled={promoDeleteLoading}
            />
          )*/}
      </div>
      <span className="absolute top-3 left-0"></span>
      {data && !error && !isLoading && (
        <>
          <div className="pt-14">
            {currentPromo !== null && <PromotionItemNew data={currentPromo} />}
          </div>

          {/*<div className="mt-6">
            <p className="text-xl font-medium mb-6">
              {data.subscribers.totalCount ? "Subscribers" : ""}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-4">
              {data?.subscribers &&
                data.subscribers.data.map((sub, idx) => (
                  <Subscriber key={idx} {...sub} />
                ))}
            </div>
          </div>*/}
        </>
      )}

      {!data && !error && isLoading && currentPromo === null && (
        <div className="p-4 py-10 flex flex-col gap-4 items-center">
          <Loader />
        </div>
      )}

      {/*!data && error && !isLoading && (
        <div className="p-4 py-10 flex flex-col gap-4 items-center">
          <ErrorMessage message="Error retrieving data" />
          <Button title="Reload" onClick={refetch} />
        </div>
      )}

      {data && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.subscribers.totalCount}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )*/}
    </div>
  );
};

export default ViewGeneralPromoItem;
