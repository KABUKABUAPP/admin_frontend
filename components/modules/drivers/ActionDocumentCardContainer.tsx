import React, { FC } from "react";

import Card from "@/components/common/Card";
import ActionDocumentCard from "./ActionDocumentCard";
import { MappedDocument } from "@/models/Drivers";

interface Data extends MappedDocument {
  id: string
}

interface Props {
  data?: Data[];
}

const ActionDocumentCardContainer: FC<Props> = ({ data }) => {
  return (
    <Card maxHeight="800px">
      <p className="text-lg font-bold mb-4">Car Document</p>
      <div className="flex flex-col gap-4">
        {data?.map((item, idx) => {
          return <ActionDocumentCard {...item} key={idx} />;
        })}
      </div>
    </Card>
  );
};

export default ActionDocumentCardContainer;
