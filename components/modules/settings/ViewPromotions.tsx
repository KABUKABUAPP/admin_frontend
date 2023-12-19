import Divider from "@/components/common/Divider";
import Button from "@/components/ui/Button/Button";
import React, { FC, useEffect, useState } from "react";
import PromotionItem from "./PromotionItem";
import ViewPromotionItem from "./ViewPromotionItem";
import ViewAllPromotions from "./ViewAllPromotions";
import { useRouter } from "next/router";
import ViewAllGeneralPromo from "./ViewAllGeneralPromo";
import ViewGeneralPromoItem from "./ViewGeneralPromoItem";

interface Props {
  handleIsCreatePromotion: () => void;
}

const ViewPromotions: FC<Props> = ({ handleIsCreatePromotion }) => {
  const [userType, setUserType] = useState('driver');
  const [userTypeText, setUserTypeText] = useState('Drivers');
  const [summaryView, setSummaryView] = useState(true);
  const [currentGeneralPromo, setCurrentGeneralPromo] = useState<any>();
  
  const driverBold = summaryView ? 'font-bold' : '';
  const riderBold = !summaryView ? 'font-bold' : '';
  const [isViewingItem, setIsViewingItem] = useState(false);
  const router = useRouter()

  useEffect(()=>{
    if(isViewingItem===false){
      router.push('/settings', undefined, { shallow: true })
    }
  },[isViewingItem])
  return (
    <>
      {isViewingItem ? (
        <>
          {userType === 'rider' && <ViewPromotionItem handleBack={() => setIsViewingItem(false)} />}

          {userType === 'driver' && <ViewGeneralPromoItem handleBack={() => setIsViewingItem(false)} />}
        </>
      ) : (
        <>
          <div className="text-md flex my-5">
            <p className={`cursor-pointer mx-5 ${driverBold}`} onClick={() => {
              setSummaryView(true);
              setUserTypeText('Drivers')
              setUserType('driver')
            }}>Driver</p>
            <p>|</p>
            <p className={`cursor-pointer mx-5 ${riderBold}`} onClick={() => {
              setSummaryView(false);
              setUserTypeText('Riders')
              setUserType('rider')
            }}>Rider</p>
          </div>

          {userType === 'rider' && <ViewAllPromotions handleViewPromoItem={()=>{setIsViewingItem(true)}} handleIsCreatePromotion={handleIsCreatePromotion}/>}

          {userType === 'driver' && <ViewAllGeneralPromo handleViewPromoItem={()=>{setIsViewingItem(true)}} handleIsCreatePromotion={handleIsCreatePromotion} />}
          
        </>
      )}
    </>
  );
};

export default ViewPromotions;
