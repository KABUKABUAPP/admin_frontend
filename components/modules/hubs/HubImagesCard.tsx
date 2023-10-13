import React, { FC } from "react";

import DeleteableImagesCard from "@/components/common/DeleteableImagesCard";
import Card from "@/components/common/Card";
import Button from "@/components/ui/Button/Button";

interface Props {
  images: { image: File; imageId: string }[];
  handleChange: (file: File) => void;
  handleDelete: (imageId: string) => void;
}

const HubImagesCard: FC<Props> = ({ images, handleChange, handleDelete }) => {
  return (
    <Card>
      <div className="pt-2 flex max-w-[300px] overflow-x-auto scrollbar-none gap-2">
        <DeleteableImagesCard
          images={images}
          title="Hub Images"
          handleChange={(file) => handleChange(file)}
          handleDelete={handleDelete}
        />
      </div>
    </Card>
  );
};

export default HubImagesCard;
