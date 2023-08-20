import React, { FC, PropsWithChildren } from "react";
import Button from "@/components/ui/Button/Button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import { useRouter } from "next/router";

interface Props {
  backButtonText?: string
  handleBack?: ()=>void
}

const ActionBar: FC<PropsWithChildren<Props>> = ({ children, backButtonText='Back', handleBack }) => {
  const router = useRouter();

  return (
    <div className="bg-[#FFFFFF] flex items-center max-sm:py-4 px-6 rounded-lg w-full max-sm:flex-col sm:h-[100px]">
      <div style={{ flex: 1 }}>
        <Button
          title={backButtonText}
          variant="text"
          startIcon={<ChevronLeft />}
          onClick={() => {
            if(handleBack) handleBack()
            else router.back()
          }}
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

export default ActionBar;
