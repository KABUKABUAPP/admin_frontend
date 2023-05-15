import React, { FC } from "react";

import Card from "@/components/common/Card";

interface Props {
  fullname?: string;
  relationship?: string;
  phone?: string;
}

const NextOfKinCard: FC<Props> = ({ fullname, relationship, phone }) => {
  return (
    <Card>
      <p className="text-lg font-semibold pb-3">Next of kin</p>

      <div className="flex justify-between py-2">
        {fullname && (
          <div className="pr-3 border-r border-r-[#D4D4D4]">
            <p className="text-lg font-semibold">{fullname}</p>
            <p className="text-xs text-[#9A9A9A]">Full Name</p>
          </div>
        )}

        {relationship && (
          <div className="pr-3 border-r border-r-[#D4D4D4]">
            <p className="text-lg font-semibold">{relationship}</p>
            <p className="text-xs text-[#9A9A9A]">Relationship</p>
          </div>
        )}

        {phone && (
          <div>
            <p className="text-lg font-semibold">{phone}</p>
            <p className="text-xs text-[#9A9A9A]">Phone</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NextOfKinCard;
