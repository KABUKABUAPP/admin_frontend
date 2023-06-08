import Avatar from "@/components/common/Avatar";
import React, { FC } from "react";

const UploadDetailsCard: FC = () => {
  return (
    <div className="bg-[#F8F8F8] border border-[#E6E6E6] rounded-lg flex flex-col gap-6 w-full p-4">
      <p className="text-base font-bold">Driver's Upload</p>
      <div className="flex gap-4">
        <div>
          <Avatar fallBack="A" imageUrl="/testUser.jpg" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-bold">Amaka Nweke</p>
          <p className="text-xs text-[#9A9A9A]">Mother</p>
          <p className="text-xs text-[#9A9A9A]">Mother</p>
          <p className="text-xs text-[#9A9A9A]">Mother</p>
        </div>
      </div>
    </div>
  );
};

export default UploadDetailsCard;
