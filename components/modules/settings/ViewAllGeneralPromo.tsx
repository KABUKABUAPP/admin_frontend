import Divider from "@/components/common/Divider";
import Button from "@/components/ui/Button/Button";
import React, { FC, useState, useEffect } from "react";
import PromotionItem from "./PromotionItem";
import { useViewAllPromosNewQuery, useViewAllPromosQuery } from "@/api-services/settingsService";
import Loader from "@/components/ui/Loader/Loader";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/router";
import useUserPermissions from "@/hooks/useUserPermissions";
import PromotionItemNew from "./PromotionItemNew";

interface Props {
  handleIsCreatePromotion: () => void;
  handleViewPromoItem: () => void;
}

const ViewAllGeneralPromo: FC<Props> = ({
  handleIsCreatePromotion,
  handleViewPromoItem
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [promoStatus, setPromoStatus] = useState<string>("active");
  const { data, isLoading, error, refetch } = useViewAllPromosQuery(
    {
      limit: pageSize,
      page: currentPage,
      status: promoStatus,
    },
    { refetchOnReconnect: true }
  );

  const { data: allPromos, isLoading: allPromosLoading, error: allPromosError, refetch: allPromosRefetch } = useViewAllPromosNewQuery(
    {
      limit: pageSize,
      page: currentPage,
      status: promoStatus,
    },
    { refetchOnReconnect: true }
  );

  const router = useRouter();

  const { userPermissions } = useUserPermissions();

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-4 py-1">
            <Button
              title="Active"
              variant="text"
              onClick={() => {
                if (promoStatus !== "active") setPromoStatus("active");
              }}
              className={`${
                promoStatus === "active" ? "!text-[#000]" : "!text-[#9A9A9A]"
              }`}
            />
            <Divider />
            <Button
              title="Closed"
              variant="text"
              onClick={() => {
                if (promoStatus !== "expired") setPromoStatus("expired");
              }}
              className={`${
                promoStatus === "expired" ? "!text-[#000]" : "!text-[#9A9A9A]"
              }`}
            />
          </div>

          <div>
            {userPermissions && userPermissions.promotions_permissions.write && (
              <Button
                title="Create Promotion"
                onClick={() => {
                  handleIsCreatePromotion();
                }}
              />
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          {allPromos &&
            !allPromosLoading &&
            !allPromosError &&
            allPromos?.data.map((item: any, idx: any) => {
              return (
                <PromotionItemNew
                  data={item}
                  handleClick={() => {
                    router.push(`/settings?promoId=${item.id}&promoPageSize=${pageSize}&promoCurrentPage=${currentPage}&promoPageStatus=${promoStatus}`, undefined, {
                      shallow: true,
                    });
                    handleViewPromoItem();
                  }}
                  key={idx}
                />
              );
            })}
          {data && (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={allPromos?.pagination?.totalCount}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}

          {isLoading && !error && !data && (
            <div className="mt-6 flex justify-center items-center">
              <Loader />
            </div>
          )}

          {error && !data && !isLoading && (
            <div className="mt-6 flex justify-center items-center">
              <Button title="Refetch" onClick={refetch} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewAllGeneralPromo;
