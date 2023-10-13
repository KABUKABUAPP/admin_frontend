import React, { FC } from "react";

import SosContactItem from "./SosContactItem";

interface Props {
  data: {
    title: string;
    subLocation: string;
    phoneNumber: string;
    id: string;
  }[];
  handleView: (id: string) => any;
}

const SosContactItemContainer: FC<Props> = ({ data, handleView }) => {
  return (
    <div className="flex flex-col gap-6">
      {data.map((contact, idx) => (
        <SosContactItem {...contact} handleView={handleView} key={idx} />
      ))}
    </div>
  );
};

export default SosContactItemContainer;
