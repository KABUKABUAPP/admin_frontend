import React, { FC } from "react";
import { useRouter } from "next/router";

import Card from "@/components/common/Card";
import Avatar from "@/components/common/Avatar";
import Skeleton from "react-loading-skeleton";
import PlateNumber from "@/components/common/PlateNumber";
import Button from "@/components/ui/Button/Button";

function formatDateTime(inputTime: string) {
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedTime = new Date(inputTime).toLocaleDateString('en-US', options);
  
    // Extracting time part and formatting it
    const timePart = new Date(inputTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  
    return `${formattedTime} at ${timePart}`;
}

interface Props {
  isLoading?: boolean;
  carImages?: string[];
  carModel?: string;
  carColor?: string;
  plateNumber?: string;
  carStatus?: string;
  bg?: string;
  hub?: string;
  inspector?: string;
  addedDateTime?: string;
  assignDriver?: boolean;
  hubId?: string;
  inspectorId?: string;
}

const CarDetailsCard: FC<Props> = ({
  carImages,
  carModel,
  isLoading,
  carColor,
  carStatus,
  plateNumber,
  bg='#FFFFFF',
  hub,
  inspector,
  addedDateTime,
  assignDriver
}) => {
  const router = useRouter();
  const isDeleted = router.pathname.includes('deleted')

  return (
    <Card bg={bg}>
      <div className={`flex flex-col gap-3 ${isDeleted ? '!text-[#9A9A9A]' : ''}`}>
        <p className="text-lg font-semibold">Car Details</p>

        <div className="flex max-w-[300px] overflow-x-auto scrollbar-none gap-2">
          {carImages?.map((image) => {
            return (
              <div>
                <Avatar imageUrl={image} fallBack="" shape="square" size="lg" />
              </div>
            );
          })}
        </div>
        <p className="text-lg font-semibold">
          {carModel || <Skeleton enableAnimation={isLoading} />}
        </p>
        <p className="text-sm text-[#9A9A9A]">
          {carColor || <Skeleton enableAnimation={isLoading} />}
        </p>
        {plateNumber ? (
          <PlateNumber plateNumber={plateNumber} />
        ) : (
          <Skeleton enableAnimation={isLoading} />
        )}
        <p className="text-sm text-[#9A9A9A]">
          {carStatus || <Skeleton enableAnimation={isLoading} />}
        </p>
        
        {hub && (
          <div className="flex gap-4">
            <p className="font-bold">Hub: {hub}</p>
            <p className="text-sm cursor-pointer">View Hub</p>
          </div>
        )}
        {inspector && (
          <div className="flex gap-4">
            <p className="font-bold">Inspector: {inspector}</p>
            <p className="text-sm cursor-pointer">View Inspector</p>
          </div>
        )}
        {addedDateTime && (
           <p className="font-bold">Added On: {formatDateTime(addedDateTime)}</p>
        )}
        {!assignDriver && 
        <Button
          title="View Location History"
          variant="text"
          color="tetiary"
          disabled={true}
          className={`w-fit ${isDeleted ? '!text-[#9A9A9A]' : ''}`}
        />}
      </div>
    </Card>
  );
};

export default CarDetailsCard;
