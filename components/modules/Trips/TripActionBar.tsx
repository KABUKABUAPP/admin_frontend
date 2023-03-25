import React, { FC, PropsWithChildren } from "react";
import Button from "@/components/ui/Button/Button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import { useRouter } from "next/router";

const TripActionBar: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="bg-[#FFFFFF] flex items-center py-4 px-6 rounded-lg w-full max-sm:flex-col">
      <div style={{ flex: 1 }}>
        <Button
          title="Back"
          variant="text"
          startIcon={<ChevronLeft />}
          onClick={() => router.back()}
        />
      </div>

      <div
        style={{ flex: 4 }}
        className="flex items-center gap-8 justify-end max-sm:flex-col max-sm:mt-4"
      >
        {children}
      </div>
    </div>
  );
};

export default TripActionBar;
