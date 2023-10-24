import React, { FC } from "react";

import useClickOutside from "@/hooks/useClickOutside";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import Image from "next/image";

interface Props {
  handleClose: () => void;
}

const ResetPasswordNotification: FC<Props> = ({ handleClose }) => {
  const ref = useClickOutside<HTMLDivElement>(() => handleClose());

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      whileInView={{ scale: 1, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
      ref={ref}
      className="bg-[#FFFFFF] rounded-xl w-full max-w-[450px] flex flex-col justify-center items-center p-2 pb-8 py-5 gap-12"
    >
      <p className="font-bold text-center text-sm">Reset Password</p>

      <div className="relative w-1/2 h-[150px]">
        <Image
          src={"/staff/reset-success.png"}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <p className="font-bold text-center text-sm">
        Reset link has been sent to staff's email address
      </p>
      <div className="flex gap-5 w-full flex-wrap justify-center items-center">
        <Button title="Continue" size="large" className="w-full !text-base" onClick={handleClose}/>
      </div>
    </motion.div>
  );
};

export default ResetPasswordNotification;
