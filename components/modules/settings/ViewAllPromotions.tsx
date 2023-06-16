import Divider from '@/components/common/Divider'
import Button from '@/components/ui/Button/Button'
import React, { FC } from 'react'
import PromotionItem from './PromotionItem'

interface Props {
    handleIsCreatePromotion: ()=>void;
    handleViewPromoItem: ()=>void
}

const ViewAllPromotions:FC<Props> = ({ handleIsCreatePromotion, handleViewPromoItem }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-4 py-1">
          <Button title="Active" variant="text" />
          <Divider />
          <Button title="Expired" variant="text" />
        </div>

        <div>
          <Button
            title="Create Promotion"
            onClick={() => handleIsCreatePromotion()}
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <PromotionItem handleClick={handleViewPromoItem}/>
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
      </div>
    </div>
  )
}

export default ViewAllPromotions