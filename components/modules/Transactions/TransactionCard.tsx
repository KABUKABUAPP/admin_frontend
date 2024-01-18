import React, { FC, useEffect } from "react";
import Image from "next/image";

import Card from "@/components/common/Card";
import useClickOutside from "@/hooks/useClickOutside";
import OriginAltIcon from "@/components/icons/OriginAltIcon";
import DestinationAltIcon from "@/components/icons/DestinationAltIcon";
import WalletIcon from "@/components/icons/WalletIcon";
import PlateNumber from "@/components/common/PlateNumber";
import Avatar from "@/components/common/Avatar";
import RatingIcon from "@/components/icons/RatingIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import { useGetSingleTransactionQuery } from "@/api-services/transactionsService";
import Loader from "@/components/ui/Loader/Loader";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  handleClose: () => void;
  narrationId?: string;
  narration?: string;
  id?: string;
  theModalData?: any;
}

const getFormattedTimeDate = (utcDate: any) => {
  const theDate = new Date(utcDate);
  const year = theDate.getFullYear();
  const month = String(theDate.getMonth() + 1).padStart(2, '0');
  const day = String(theDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${String(theDate.getHours()).padStart(2, '0')}:${String(theDate.getMinutes()).padStart(2, '0')}:${String(theDate.getSeconds()).padStart(2, '0')}`;

  return { formattedDate, formattedTime }
}

const TransactionCard: FC<Props> = (props) => {

  const ref = useClickOutside<HTMLDivElement>(() => props.handleClose());

  
  const { data, isLoading, isError, refetch } = useGetSingleTransactionQuery(
    { narration: props.narration, narration_id: props.narrationId, id: props.id },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  return (
    <Card elevation={true} maxWidth="400px" maxHeight="95vh">
        <div ref={ref}>
        {
            isLoading ?
            <Loader /> :
            <div>
                {
                    props.narration === 'TRIP_COUPON' &&
                    <div className="flex flex-col gap-4 pb-6 border-b border-b-[#9A9A9A]">
                        <div className="flex justify-between items-center gap-3">
                        <p className="text-xs text-[#9A9A9A]">Coupon Name</p>
                        <p className="text-xs font-semibold">{capitalizeAllFirstLetters(data?.coupon_name)}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                        <p className="text-xs text-[#9A9A9A]">Coupon Type</p>
                        <p className="text-xs font-semibold">{capitalizeAllFirstLetters(data?.coupon_type)}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                        <p className="text-xs text-[#9A9A9A]">Driver</p>
                        <p className="text-xs font-semibold">{capitalizeAllFirstLetters(data?.driver)}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                        <p className="text-xs text-[#9A9A9A]">Rider</p>
                        <p className="text-xs font-semibold">{capitalizeAllFirstLetters(data?.rider)}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                        <p className="text-xs text-[#9A9A9A]">Coupon Value</p>
                        <p className="text-xs font-semibold">{data?.coupon_value_implemented}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                        <p className="text-xs text-[#9A9A9A]">Date Applied</p>
                        <p className="text-xs font-semibold">{`${getFormattedTimeDate(data?.date_applied).formattedDate} at ${getFormattedTimeDate(data?.date_applied).formattedTime}`}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                        <p className="text-xs text-[#9A9A9A]">Original Price</p>
                        <p className="text-xs font-semibold">₦{data?.price_details?.original_price}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                        <p className="text-xs text-[#9A9A9A]">Total Price</p>
                        <p className="text-xs font-semibold">₦{data?.price_details?.total_charge}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                        <p className="text-xs text-[#9A9A9A]">Origin</p>
                        <p className="text-xs font-semibold">{`${data?.start_address?.street}, ${data?.start_address?.city}, ${data?.start_address?.state}`}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                        <p className="text-xs text-[#9A9A9A]">Destination</p>
                        <p className="text-xs font-semibold">{`${data?.end_address?.street}, ${data?.end_address?.city}, ${data?.end_address?.state}`}</p>
                        </div>
                    </div>
                }

                {
                    props.narration === 'TRIP_CHARGES_TO_KABUKABU' &&
                    <div className="flex flex-col gap-4 pb-6 border-b border-b-[#9A9A9A]">
                        <div className="flex justify-between items-center gap-3">
                            <p className="text-xs text-[#9A9A9A]">Transaction ID</p>
                            <p className="text-xs font-semibold">{props.theModalData?.transactionId}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            <p className="text-xs text-[#9A9A9A]">Trip ID</p>
                            <p className="text-xs font-semibold">{props.theModalData?.tripId}</p>
                        </div>
                        {
                            props.theModalData.userType === 'driver' &&
                            <div className="flex justify-between items-center gap-3">
                                <p className="text-xs text-[#9A9A9A]">Driver</p>
                                <p className="text-xs font-semibold">{capitalizeAllFirstLetters(props.theModalData?.name)}</p>
                            </div>
                        }
                        {
                            props.theModalData.userType === 'rider' &&
                            <div className="flex justify-between items-center gap-3">
                                <p className="text-xs text-[#9A9A9A]">Rider</p>
                                <p className="text-xs font-semibold">{capitalizeAllFirstLetters(props.theModalData?.name)}</p>
                            </div>
                        }
                        <div className="flex justify-between items-center gap-3">
                            <p className="text-xs text-[#9A9A9A]">Charge</p>
                            <p className="text-xs font-semibold">{props.theModalData?.price}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            <p className="text-xs text-[#9A9A9A]">Date</p>
                            <p className="text-xs font-semibold">{`${getFormattedTimeDate(props.theModalData?.date).formattedDate} at ${getFormattedTimeDate(props.theModalData?.date).formattedTime}`}</p>
                        </div>
                    </div>
                }

                {
                    (props.narration === 'WALLET_TOPUP' || props.narration === 'DRIVER_TRIP_CHARGES' || props.narration === 'DRIVER_WALLET_WITHDRAWAL') &&
                    <div className="flex flex-col gap-4 pb-6 border-b border-b-[#9A9A9A]">
                        <div className="flex justify-between items-center gap-3">
                            <p className="text-xs text-[#9A9A9A]">Transaction ID</p>
                            <p className="text-xs font-semibold">{props.theModalData?.transactionId}</p>
                        </div>
                        {
                            props.theModalData.userType === 'driver' &&
                            <div className="flex justify-between items-center gap-3">
                                <p className="text-xs text-[#9A9A9A]">Driver</p>
                                <p className="text-xs font-semibold">{capitalizeAllFirstLetters(props.theModalData?.name)}</p>
                            </div>
                        }
                        {
                            props.theModalData.userType === 'rider' &&
                            <div className="flex justify-between items-center gap-3">
                                <p className="text-xs text-[#9A9A9A]">Rider</p>
                                <p className="text-xs font-semibold">{capitalizeAllFirstLetters(props.theModalData?.name)}</p>
                            </div>
                        }
                        <div className="flex justify-between items-center gap-3">
                            <p className="text-xs text-[#9A9A9A]">User Type</p>
                            <p className="text-xs font-semibold">{props.theModalData?.userType}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            <p className="text-xs text-[#9A9A9A]">Narration</p>
                            <p className="text-xs font-semibold">{props.theModalData?.narration}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            <p className="text-xs text-[#9A9A9A]">Amount</p>
                            <p className="text-xs font-semibold">{props.theModalData?.price}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            <p className="text-xs text-[#9A9A9A]">Transaction Type</p>
                            <p className="text-xs font-semibold">{props.theModalData?.type === 'CR' ? 'Credit' : 'Debit'}</p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            <p className="text-xs text-[#9A9A9A]">Date</p>
                            <p className="text-xs font-semibold">{`${getFormattedTimeDate(props.theModalData?.date).formattedDate} at ${getFormattedTimeDate(props.theModalData?.date).formattedTime}`}</p>
                        </div>
                    </div>
                }
            </div>
        }
        </div>
      
    </Card>
  );
};

export default TransactionCard;
