import Divider from "@/components/common/Divider";
import Button from "@/components/ui/Button/Button";
import React, { FC, useState } from "react";
import PromotionItem from "./PromotionItem";
import ViewPromotionItem from "./ViewPromotionItem";
import ViewAllPromotions from "./ViewAllPromotions";

interface Props {
  handleIsCreatePromotion: () => void;
}

const ViewPromotions: FC<Props> = ({ handleIsCreatePromotion }) => {
  const [isViewingItem, setIsViewingItem] = useState(false);
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
