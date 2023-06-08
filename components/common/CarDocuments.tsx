import React, { FC } from "react";

import Card from "@/components/common/Card";
import Document from "./Document";
import Button from "@/components/ui/Button/Button";

interface Props {
  documents?: { title?: string; docImage?: string; docId?: string }[];
  totalDocs: number;
  bg?:string
}

const CarDocuments: FC<Props> = ({ documents, totalDocs, bg='#FFFFFF' }) => {
  return (
    <Card bg={bg} maxHeight="750px">
      <p className="text-lg font-semibold">Car Documents</p>
      <div className="my-2">
        {documents?.map((doc, idx) => (
          <Document {...doc} key={idx} />
        ))}
      </div>
    </Card>
  );
};

export default CarDocuments;
