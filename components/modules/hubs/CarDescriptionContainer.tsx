import React, { FC, useState } from "react";

import Card from "@/components/common/Card";
import CarDescriptionItem from "./CarDescriptionItem";
import Button from "@/components/ui/Button/Button";

interface Props {
  cars?: {
    carModel: string;
    carColor: string;
    plateNumber: string;
    carImage: string;
    carId: string;
  }[];
  title: string;
}

const CarDescriptionContainer: FC<Props> = ({ cars, title }) => {
  const [isViewAll, setIsViewAll] = useState(false);

  return (
    <Card>
      <p className="text-lg font-semibold mb-2">{title}</p>
      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto scrollbar-none">
        {isViewAll && cars &&
          [...cars].map((car, idx) => <CarDescriptionItem {...car} key={idx} />)}
        {!isViewAll && cars &&
          [...cars].splice(0, 3).map((car, idx) => {
            return <CarDescriptionItem {...car} key={idx} />;
          })}
      </div>
      <div className="flex justify-center py-3">
        <Button
          onClick={() => setIsViewAll(!isViewAll)}
          variant="text"
          title={isViewAll ? "View Less" : "View All"}
        />
      </div>
    </Card>
  );
};

export default CarDescriptionContainer;
