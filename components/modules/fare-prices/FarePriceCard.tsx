import React, { FC } from "react";

import IconButton from "@/components/ui/IconButton";
import EditIcon from "@/components/icons/EditIcon";
import FarePriceItem from "./FarePriceItem";

interface Props {
  title?: string;
  handleEdit?: () => void;
  cardData?: { title: string; body: string }[];
}

const FarePriceCard: FC<Props> = ({ title, handleEdit, cardData }) => {
  return (
    <div className="bg-[#FFFFFF] p-4 w-full rounded-lg shadow-md xl:max-w-[550px]">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">{title}</p>
        <IconButton
          className="!rounded-lg"
          color="tetiary"
          icon={<EditIcon />}
          handleClick={() => {
            if (handleEdit) handleEdit();
          }}
        />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {cardData?.map((item, idx) => {
          return <FarePriceItem {...item} key={idx} />;
        })}
      </div>
    </div>
  );
};

export default FarePriceCard;
