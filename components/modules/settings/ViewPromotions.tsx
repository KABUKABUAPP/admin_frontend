import Divider from "@/components/common/Divider";
import Button from "@/components/ui/Button/Button";
import React, { FC, useEffect, useState } from "react";
import PromotionItem from "./PromotionItem";
import ViewPromotionItem from "./ViewPromotionItem";
import ViewAllPromotions from "./ViewAllPromotions";
import { useRouter } from "next/router";

interface Props {
  handleIsCreatePromotion: () => void;
}

const ViewPromotions: FC<Props> = ({ handleIsCreatePromotion }) => {
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
        <ViewPromotionItem handleBack={() => setIsViewingItem(false)} />
      ) : (
        <ViewAllPromotions handleViewPromoItem={()=>{setIsViewingItem(true)}} handleIsCreatePromotion={handleIsCreatePromotion}/>
      )}
    </>
  );
};

export default ViewPromotions;
