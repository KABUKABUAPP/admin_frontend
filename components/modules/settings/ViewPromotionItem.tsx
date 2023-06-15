import ChevronLeft from "@/components/icons/ChevronLeft";
import Button from "@/components/ui/Button/Button";
import React, { FC } from "react";
import PromotionItem from "./PromotionItem";
import Subscriber from "./Subscriber";

interface Props {
  handleBack: () => void;
}

const ViewPromotionItem: FC<Props> = ({ handleBack }) => {
  return (
    <div className="relative">
      <span className="absolute top-3 left-0">
        <Button
          onClick={handleBack}
          title="Back"
          variant="text"
          startIcon={<ChevronLeft />}
        />
      </span>
      <div className="pt-14">
        <PromotionItem />
      </div>

      <div className="mt-6">
        <p className="text-xl font-medium mb-6">Subscribers</p>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <Subscriber />
          </div>
          <div>
            <Subscriber />
          </div>
          <div>
            <Subscriber />
          </div>
          <div>
            <Subscriber />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPromotionItem;
