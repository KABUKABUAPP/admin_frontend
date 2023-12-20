import Avatar from "@/components/common/Avatar";
import React, { FC, useEffect, useState, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { capitalizeAllFirstLetters } from "@/utils";
import Button from "@/components/ui/Button/Button";
import { useRewardPromoSubscribersMutation } from "@/api-services/settingsService";
import { toast } from "react-toastify";

interface Props {
  data: any;
  allPaid: boolean;
}

const SubscriberNew: FC<Props> = (data, allPaid) => {
    const [paidStatus, setPaidStatus] = useState(false);
    const [
        rewardPromo,
        {
          isSuccess,
          isLoading,
          error,
        },
    ] = useRewardPromoSubscribersMutation();

    const handleRewardPromo = (idX: string) => {
        const user_ids = [idX];
        rewardPromo({user_ids})
    }

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
        }

        if (isSuccess) toast.success('User Rewarded');
        setPaidStatus(true);
    }, [isSuccess]);

    useLayoutEffect(() => {
        if (error) toast.error('Error encountered');
    }, [error])

    const router = useRouter();
    return (
        <>
        {
            data?.data &&
            <div className="flex justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={()=>router.push(`/drivers/active/${data?.data.user._id}?fallbackUrl=${router.asPath}`)}>
                    <Avatar fallBack={data?.data.user.full_name[0]} shape="round" imageUrl={data?.data.user.profile_image}/>
                    <p className="text-sm font-semibold">{capitalizeAllFirstLetters(data?.data.user.full_name)}</p>
                </div>
                <div>
                    {   
                        paidStatus ?
                        <Button
                            title="Paid"
                            disabled={true}
                        /> :
                        <Button
                            onClick={() => handleRewardPromo(String(data?.data.promotion.id))}
                            title="Pay Now"
                            variant="outlined"
                            loading={isLoading}
                            disabled={allPaid ? allPaid : isLoading}
                        />
                    }
                </div>
            </div>
        }
        </>
    );
};

export default SubscriberNew;
