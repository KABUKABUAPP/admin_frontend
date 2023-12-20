import React, { FC, useState, useEffect } from "react";
import NewPromotionForm from "./NewPromotionForm";
import RewardPromoForm from "./RewardPromoForm";

const initialValues = {
  name: "",
  audience: "",
  promo_type: "manual",
  amount_type: "",
  value: "",
  cap: "",
  total_quantity: "",
  start_date: "",
  end_date: "",
  condition: "",
  count: "",
};

interface Props {
  handleBack: () => void;
}

const NewerPromotionForm: FC<Props> = ({ handleBack }) => {
    const [userType, setUserType] = useState('driver');
    const [userTypeText, setUserTypeText] = useState('Drivers');
    const [summaryView, setSummaryView] = useState(true);

    const driverBold = summaryView ? 'font-bold' : '';
    const riderBold = !summaryView ? 'font-bold' : '';
  return (
    <>
        <div className="text-md flex">
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

        {userType === 'rider' && <NewPromotionForm handleBack={()=>{handleBack()}} />}

        {userType === 'driver' && <RewardPromoForm handleBack={()=>{handleBack()}} />}
    </>
  )
};

export default NewerPromotionForm;
