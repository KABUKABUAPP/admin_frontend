import Button from "@/components/ui/Button/Button";
import useClickOutside from "@/hooks/useClickOutside";
import React, { FC } from "react";
import { motion } from "framer-motion";
import TextField from "@/components/ui/Input/TextField/TextField";

interface Props {
  handleClose: () => void;
}

const DeleteHubCard: FC<Props> = ({ handleClose }) => {
  const ref = useClickOutside<HTMLDivElement>(() => handleClose());

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      whileInView={{ scale: 1, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
      ref={ref}
      className="bg-[#FFFFFF] rounded-xl w-full max-w-[450px] flex flex-col justify-center items-center p-4 py-5 gap-12"
    >
      <p className="font-bold text-center text-sm">Delete Hub</p>

      <div>
        <p className="font-bold text-center text-sm">
          Are you sure you want to delete this hub?
        </p>
        <p className="font-bold text-center text-sm">
          This action cannot be undone
        </p>
      </div>

      <div className="w-full">
        <p className="font-bold text-base mb-1">
          Reason
        </p>
        <div>
            <TextField placeholder="Select Reason"/>
        </div>
      </div>

      <div className="flex gap-5 w-full flex-wrap justify-center items-center">
        <Button
          title="Cancel"
          size="large"
          color="primary"
          className="w-[43%]"
          onClick={handleClose}
        />
        <Button
          title="Delete Hub"
          color="tetiary"
          size="large"
          className="w-[43%] !text-[#EF2C5B]"
        />
      </div>
    </motion.div>
  );
};

export default DeleteHubCard;
