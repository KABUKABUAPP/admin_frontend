import React, { FC } from "react";

import Image from "next/image";

interface Props {
  title?: string;
  docId?: string;
  docImage?: string;
}

const Document: FC<Props> = ({ docId, docImage, title }) => {
  return (
    <div className="flex flex-col gap-2">
      {docImage && (
        <div className="relative w-full max-w-[400px] h-[200px]">
          <Image
            layout="fill"
            src={docImage}
            style={{ objectFit: "cover" }}
            alt="uploaded document"
          />
        </div>
      )}
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm text-[#9A9A9A]">{docId}</p>
    </div>
  );
};

export default Document;
