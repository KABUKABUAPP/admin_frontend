import React, { FC } from "react";

import Card from "@/components/common/Card";
import Document from "./Document";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/router";

interface Props {
  documents?: { title?: string; docImage?: string; docId?: string }[];
  totalDocs: number;
  bg?:string
}

const CarDocuments: FC<Props> = ({ documents, totalDocs, bg='#FFFFFF' }) => {
  const router = useRouter();
  const isDeleted = router.pathname.includes('deleted')

  return (
    <Card bg={bg} maxHeight="750px">
      <p className={`text-lg font-semibold ${isDeleted ? '!text-[#9A9A9A]' : ''}`}>Car Documents</p>
      <div className="my-2">
        {documents?.map((doc, idx) => (
          <Document {...doc} key={idx} />
        ))}
      </div>
    </Card>
  );
};

export default CarDocuments;
