import Card from "@/components/common/Card";
import CarIcon from "@/components/icons/CarIcon";
import Button from "@/components/ui/Button/Button";
import React, { FC } from "react";
import Image from "next/image";

interface Props {
  carsCount: number;
}

const CarsInHubCard: FC<Props> = ({ carsCount }) => {
  return (
    <Card>
      <p className="text-lg font-semibold">Cars in hub [{carsCount}]</p>

      <div className="py-8 flex flex-col items-center gap-8">
        <div className="relative h-[300px] max-w-[400px] w-full flex justify-center">
          <Image
            src={"/inspectors/taxi.png"}
            objectFit="contain"
            layout="fill"
            alt="kabukabu"
            style={{ objectPosition: "50% 50%" }}
          />
        </div>
        {carsCount < 1 ? (
          <p className="text-center text-sm font-semibold">
            There are no cars in inspector's hub
          </p>
        ) : null}

        <Button
          startIcon={<CarIcon />}
          className="w-full !text-[16px]"
          size="large"
          title="Create new delivery"
        />
      </div>
    </Card>
  );
};

export default CarsInHubCard;
