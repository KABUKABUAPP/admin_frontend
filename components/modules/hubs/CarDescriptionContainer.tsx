import React, { FC, useState } from "react";

import Card from "@/components/common/Card";
import CarDescriptionItem from "./CarDescriptionItem";
import Button from "@/components/ui/Button/Button";
import { CarDescription } from "@/models/Hubs";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loader from "@/components/ui/Loader/Loader";

interface Props {
  cars?: CarDescription[];
  title: string;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  totalCount?: number;
  handleViewCount: (count: number) => void;
}

const CarDescriptionContainer: FC<Props> = ({
  cars,
  title,
  isLoading,
  isError,
  refetch,
  totalCount,
  handleViewCount,
}) => {
  const [isViewAll, setIsViewAll] = useState(false);

  return (
    <Card>
      <p className="text-lg font-semibold mb-2">{title}</p>
      {cars &&
        !isLoading &&
        !isError &&
        (cars.length ? (
          <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto scrollbar-none">
            {cars &&
              [...cars].map((car, idx) => (
                <CarDescriptionItem {...car} key={idx} />
              ))}
          </div>
        ) : (
          <p className="text-center">No Data</p>
        ))}
      {!cars && !isLoading && isError && (
        <div className="flex justify-center items-center flex-col gap-2">
          <ErrorMessage message="Oops! an error occured" />
          <Button title="Refetch" onClick={refetch} />
        </div>
      )}
      {!cars && isLoading && !isError && (
        <div className="flex justify-center items-center flex-col gap-2">
          <Loader size="small" />
        </div>
      )}
      {cars && totalCount && totalCount > 3 ? (
        <div className="flex justify-center py-3">
          <Button
            onClick={() => {
              if (cars.length <= 3) {
                handleViewCount(totalCount);
              } else handleViewCount(3);
            }}
            variant="text"
            title={cars.length > 3 ? "View Less" : "View All"}
          />
        </div>
      ) : null}
    </Card>
  );
};

export default CarDescriptionContainer;
