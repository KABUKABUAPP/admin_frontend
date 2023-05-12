import React, { FC } from "react";

import Card from "@/components/common/Card";
import Button from "@/components/ui/Button/Button";
import CarImage from "../modules/sharp-cars/CarImage";

interface Props {
  images?: { image: string; imageId: string }[];
  title?: string
}

const DeleteableImagesCard: FC<Props> = ({ images, title }) => {
  return (
    <Card>
      <p className="text-lg font-semibold pb-2">{title || `Car Images`}</p>
      <Button
        title="Click to upload"
        variant="text"
        color="tetiary"
        size="small"
        className="!text-[#9A9A9A]"
      />

      <div className="pt-2 flex max-w-[300px] overflow-x-auto scrollbar-none gap-2 ">
        {images?.map((img, idx) => (
          <CarImage {...img} key={idx} />
        ))}
      </div>
    </Card>
  );
};

export default DeleteableImagesCard;
