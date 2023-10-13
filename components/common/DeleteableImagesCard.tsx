import React, { FC, useRef } from "react";

import Card from "@/components/common/Card";
import Button from "@/components/ui/Button/Button";
import CarImage from "../modules/sharp-cars/CarImage";
import { getImageUrl } from "@/utils";

interface Props {
  images?: { image: File; imageId: string }[];
  title?: string;
  handleChange: (file: File) => void;
  handleDelete: (imageId: string)=> void
}

const DeleteableImagesCard: FC<Props> = ({ images, title, handleChange, handleDelete }) => {
  const fileInputRef = useRef<any>();

  return (
    <Card>
      <p className="text-lg font-semibold pb-2">{title || `Car Images`}</p>
      <Button
        title="Click to upload"
        variant="text"
        color="tetiary"
        size="small"
        className="!text-[#9A9A9A]"
        onClick={() => {
          if (fileInputRef) {
            fileInputRef.current.click();
          }
        }}
      />
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files) {
            handleChange(e.target.files[0]);
          }
        }}
      />

      <div className="pt-2 flex max-w-[300px] overflow-x-auto scrollbar-none gap-2 ">
        {images?.map((img, idx) => (
          <CarImage handleDelete={handleDelete} {...img} image={getImageUrl(img.image)} key={idx} />
        ))}
      </div>
    </Card>
  );
};

export default DeleteableImagesCard;
