import React, { FC } from "react";

import Card from "@/components/common/Card";
import Button from "@/components/ui/Button/Button";
import Avatar from "@/components/common/Avatar";

interface Props {
  fullName: string;
  image?: string;
  address: string;
  phone: string;
}

const InspectorCard: FC<Props> = ({ fullName, address, image, phone }) => {
  return (
    <Card>
      <p className="text-lg font-semibold">Inspector</p>

      <div className="py-3 flex gap-3">
        <div>
          <Avatar imageUrl={image} fallBack={fullName[0]} size="md" />
        </div>
        <div>
          <p className="text-lg font-semibold">{fullName}</p>
          <p className="text-sm font-semibold text-[#9A9A9A]">{address}</p>
          <p className="text-sm font-semibold text-[#9A9A9A]">{phone}</p>
        </div>
      </div>

      <Button title="View Inspector Profile" variant="text" />
    </Card>
  );
};

export default InspectorCard;
