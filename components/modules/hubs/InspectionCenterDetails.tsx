import React, { FC } from "react";

import Card from "@/components/common/Card";
import Avatar from "@/components/common/Avatar";
import OriginIcon from "@/components/icons/OriginIcon";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/router";

interface Props {
  images: string[];
  title: string;
  id: string;
  location: string;
  inspector: string;
  addedOn: string;
  inspectorId: string
}

const InspectionCenterDetails: FC<Props> = ({
  images,
  title,
  id,
  location,
  inspector,
  addedOn,
  inspectorId
}) => {
  const router = useRouter();
  return (
    <Card>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">#{id}</p>
        <p className="text-lg font-semibold">{title}</p>
        <div className="max-w-[350px] overflow-x-auto scrollbar-none flex gap-3">
          {images.map((img, idx) => (
            <div>
              <Avatar
                fallBack="I"
                imageUrl={img}
                shape="square"
                size="lg"
                key={idx}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <OriginIcon />
          <p className="text-sm font-semibold">{location}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold">Inspector: </p>
          <p className="text-sm font-semibold">{inspector}</p>
          <Button title="View Inspector" variant="text" size="small" onClick={()=>{
            router.push(`/inspectors/${inspectorId}`)
          }}/>
        </div>

        <p className="text-sm font-semibold">Added on: {addedOn}</p>
      </div>
    </Card>
  );
};

export default InspectionCenterDetails;
