import React, { FC } from "react";

import Card from "@/components/common/Card";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";

const CarDocumentsCard: FC = () => {
  return (
    <div className="lg:mt-14">
      <Card>
        <p className="text-lg font-semibold pb-2">Car Documents</p>
      </Card>
      <div className="flex justify-end mt-6">
        <Button title="Add Car" size="large" startIcon={<AddIcon />} />
      </div>
    </div>
  );
};

export default CarDocumentsCard;
