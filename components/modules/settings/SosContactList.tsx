import React, { FC, useState } from "react";

import ViewAllSos from "./ViewAllSos";
import ViewSingleSOS from "./ViewSingleSOS";

const SosContactList: FC = () => {
  const [isViewAllSOS, setIsViewAllSos] = useState(true);

  return (
    <div className="rounded-lg bg-[#FFFFFF] h-full overflow-auto scrollbar-none p-6">
      {isViewAllSOS && <ViewAllSos setIsViewAllSos={setIsViewAllSos} />}
      {!isViewAllSOS && <ViewSingleSOS setIsViewAllSos={setIsViewAllSos} />}
    </div>
  );
};

export default SosContactList;
