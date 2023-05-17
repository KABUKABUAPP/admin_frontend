import React, { FC } from "react";

import useClickOutside from "@/hooks/useClickOutside";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button/Button";

interface Props {
  handleClose: () => void;
}

const ResetPasswordCard: FC<Props> = ({ handleClose }) => {
  const ref = useClickOutside<HTMLDivElement>(() => handleClose());

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      whileInView={{ scale: 1, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
      ref={ref}
      className="bg-[#FFFFFF] rounded-xl w-full max-w-[450px] flex flex-col justify-center items-center p-2 py-5 gap-12"
    >
      <p className="font-bold text-center text-sm">Reset Password</p>
      <p className="font-bold text-center text-sm">
        Are you sure you want to reset password for this staff?
      </p>
      <div className="flex gap-5 w-full flex-wrap justify-center items-center">
        <Button
          title="No"
          size="large"
          color="tetiary"
          className="w-[43%]"
          onClick={handleClose}
        />
        <Button title="Yes" size="large" className="w-[43%]" />
      </div>
    </motion.div>
  );
};

export default ResetPasswordCard;
