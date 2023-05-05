import useClickOutside from "@/hooks/useClickOutside";
import React, { FC } from "react";

interface Props {
  handleClose: () => void;
}

const EditFareCard: FC<Props> = ({ handleClose }) => {
  const ref = useClickOutside<HTMLDivElement>(() => handleClose());

  return (
    <div
      ref={ref}
      className="bg-[#FFFFFF] rounded-xl w-full max-w-[750px] p-2 py-5 gap-12"
    >
      EditFareCard
    </div>
  );
};

export default EditFareCard;
