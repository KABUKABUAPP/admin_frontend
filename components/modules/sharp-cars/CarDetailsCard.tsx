import React, { FC } from "react";

import Card from "@/components/common/Card";
import TextField from "@/components/ui/Input/TextField/TextField";

const CarDetailsCard: FC = () => {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <TextField label="Car Brand" placeholder="Toyota" />
        <TextField label="Car Model" placeholder="Corolla" />
        <TextField label="Car Year" placeholder="2009" />
        <TextField label="Car Colour" placeholder="Black" />
        <TextField label="Plate Number" placeholder="ABC233 CVGG" />
      </div>
    </Card>
  );
};

export default CarDetailsCard;
