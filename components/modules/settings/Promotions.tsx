import React, { FC, PropsWithChildren, useState } from 'react'
import ViewPromotions from './ViewPromotions'
import NewerPromotionForm from './NewerPromotionForm'

const Promotions:FC<PropsWithChildren> = ({children}) => {
    
    const [ isCreatePromotions, setIsCreatePromotions ] = useState(false)

  return (
    <div className='rounded-lg bg-[#FFFFFF] h-full overflow-auto scrollbar-none p-6'>
       {!isCreatePromotions && <ViewPromotions handleIsCreatePromotion={()=>{setIsCreatePromotions(true)}}/>}
       {isCreatePromotions && <NewerPromotionForm handleBack={()=>{setIsCreatePromotions(false)}} />}
    </div>
  )
}

export default Promotions