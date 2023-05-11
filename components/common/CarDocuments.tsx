import React, { FC } from "react";

import Card from "@/components/common/Card";
import Document from "./Document";
import Button from "@/components/ui/Button/Button";

interface Props {
  documents?: { title?: string; docImage?: string; docId?: string }[];
  totalDocs: number;
}

const CarDocuments: FC<Props> = ({ documents, totalDocs }) => {
  return (
    <Card>
      <p className="text-lg font-semibold">Car Documents</p>
      <div className="my-2">
        {documents?.map((doc, idx) => (
          <Document {...doc} key={idx} />
        ))}
      </div>
      {totalDocs > 1 && (
        <Button
          title={`View ${totalDocs} more`}
          variant="text"
          color="tetiary"
        />
      )}
    </Card>
  );
};

export default CarDocuments;
