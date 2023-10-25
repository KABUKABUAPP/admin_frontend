import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";

import useClickOutside from "@/hooks/useClickOutside";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import { useResetStaffPasswordMutation } from "@/api-services/staffService";
import { toast } from "react-toastify";

interface Props {
  handleClose: () => void;
}

const ResetPasswordCard: FC<Props> = ({ handleClose }) => {
  const ref = useClickOutside<HTMLDivElement>(() => handleClose());

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetStaffPasswordMutation();

  const { id } = useRouter().query;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Staff password reset successfully");
      handleClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      const { message }: any = error.data;
      toast.error(message);
    }
  }, [error]);

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
        <Button
          title="Yes"
          size="large"
          className="w-[43%]"
          disabled={isLoading}
          loading={isLoading}
          onClick={() => {
            resetPassword({ staffId: String(id) });
          }}
        />
      </div>
    </motion.div>
  );
};

export default ResetPasswordCard;
