import Button from "@/components/ui/Button/Button";
import useClickOutside from "@/hooks/useClickOutside";
import React, { FC } from "react";
import { motion } from "framer-motion";

interface Props {
  handleClose: () => void;
}

const StartSurgeCard: FC<Props> = ({ handleClose }) => {
  const ref = useClickOutside<HTMLDivElement>(() => handleClose());

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      whileInView={{ scale: 1, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
      ref={ref}
      className="bg-[#FFFFFF] rounded-xl w-full max-w-[450px] flex flex-col justify-center items-center p-2 py-5 gap-12"
    >
      <p className="font-bold text-center text-sm">Start Surge</p>
      <p className="font-bold text-center text-sm">
        Are you sure you want to start surge?
      </p>
      <div className="flex gap-5 w-full flex-wrap justify-center items-center">
        <Button
          title="Cancel"
          size="large"
          color="tetiary"
          className="w-[43%]"
          onClick={handleClose}
        />
        <Button title="Start Surge" size="large" className="w-[43%]" />
      </div>
    </motion.div>
  );
};

export default StartSurgeCard;
