import Button from "@/components/ui/Button/Button";
import React, { FC } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { motion } from "framer-motion";
import CloseIcon from "@/components/icons/CloseIcon";

interface Props {
  isRider: boolean;
  handleCall?: () => any;
  handleClose: () => any;
}

const ConfirmCallCard: FC<Props> = ({ isRider, handleCall, handleClose }) => {
  const callingTitle = isRider ? "Rider" : "Driver";
  const ref = useClickOutside<HTMLDivElement>(() => handleClose());

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      whileInView={{ scale: 1, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
      ref={ref}
      className="bg-[#FFFFFF] rounded-lg px-5 py-8 w-[100%] max-w-[400px] flex flex-col gap-12"
    >
      <div className="relative">
        <p className="font-bold text-sm text-center">Call {callingTitle}</p>
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={handleClose}
        >
          <CloseIcon />
        </span>
      </div>

      <div>
        <p className="text-xs text-center font-body">
          Call {callingTitle} when anything unusual is noticed or an SOS is
          raised
        </p>
      </div>

      <div>
        <Button
          title={`Call ${callingTitle}`}
          className="w-full"
          onClick={handleCall}
        />
      </div>
    </motion.div>
  );
};

export default ConfirmCallCard;
