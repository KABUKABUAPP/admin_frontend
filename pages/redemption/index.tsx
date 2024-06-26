import { useViewAllPromosNewQuery } from '@/api-services/redemptionService';
import AppHead from '@/components/common/AppHead';
import Divider from '@/components/common/Divider';
import Pagination from '@/components/common/Pagination';
import RedemptionNav from '@/components/modules/redemption/RedemptionNav';
import PromotionItemNew from '@/components/modules/settings/PromotionItemNew';
import Button from '@/components/ui/Button/Button';
import React, { useEffect, useState } from 'react';

const Redemption = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [promoStatus, setPromoStatus] = useState<string>("active");

    const { data: allPromos, isLoading: allPromosLoading, error: allPromosError, refetch: allPromosRefetch } = useViewAllPromosNewQuery(
        {
          limit: pageSize,
          page: currentPage,
          status: promoStatus,
          category: 'VOUCHER'
        },
        { refetchOnReconnect: true }
    );

    useEffect(() => {
        if (allPromos) console.log({allPromos})
    }, [allPromos])
    
    return (
        <>
            <AppHead title={'Redemption'} />
            <RedemptionNav />
            <div className="w-full sm:w-[60vw] justify-center items-center mx-auto">
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
                            //router.push(`/settings?promoId=${item.id}&promoPageSize=${pageSize}&promoCurrentPage=${currentPage}&promoPageStatus=${promoStatus}`);
                            console.log('Twisted')
                        }}
                        key={idx}
                        />
                    );
                    })}
                {allPromos && (
                    <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={allPromos?.pagination?.totalCount}
                    pageSize={pageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                    />
                )}

                </div>
            </div>
        </>
    )
}

export default Redemption;