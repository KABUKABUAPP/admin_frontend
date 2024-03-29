import React, { FC } from "react";
import { useEnlargedImageContext } from "@/contexts/EnlargeImageContext";

import Image from "next/image";

interface Props {
  title?: string;
  docId?: string;
  docImage?: string;
}

const Document: FC<Props> = ({ docId, docImage, title }) => {
  const { setImageUrl } = useEnlargedImageContext();

  return (
    <div className="flex flex-col gap-2">
      {docImage && (
        <div className="relative ">
          <div
            className="w-full h-[150px] max-w-[400px] cursor-pointer relative"
            onClick={() => {
              setImageUrl(docImage);
            }}
          >
            <Image
              layout="fill"
              src={docImage}
              alt="uploaded document"
              objectFit="cover"
            />
          </div>
        </div>
      )}
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm text-[#9A9A9A]">{docId}</p>
    </div>
  );
};

export default Document;
