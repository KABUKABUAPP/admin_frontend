import Button from "@/components/ui/Button/Button";
import useClickOutside from "@/hooks/useClickOutside";
import React, { FC, useEffect } from "react";
import { motion } from "framer-motion";
import { useModalContext } from "@/contexts/ModalContext";
import { toast } from "react-toastify";
import { useVerifyGuarantorMutation } from "@/api-services/driversService";
import ApproveGuarantorSuccessCard from "./ApproveGuarantorSuccessCard";
import { useRouter } from "next/router";

const ApproveGuarantorRequestCard: FC = () => {
  const { setModalContent } = useModalContext();
  const ref = useClickOutside<HTMLDivElement>(() => setModalContent(null));
  const [approveRequest, { error, isLoading, isSuccess }] =
    useVerifyGuarantorMutation();
  const { id } = useRouter().query;

  useEffect(() => {
    if (isSuccess) {
      setModalContent(<ApproveGuarantorSuccessCard />);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      const { status }: any = error.data;
      toast.error(status);
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
      <p className="font-bold text-center text-sm">Approve Guarantor</p>

      <div>
        <p className="font-bold text-center text-sm">
          Are you sure you want to approve this guarantor?
        </p>
        <p className="font-bold text-center text-sm">
          This action cannot be undone
        </p>
      </div>
      <div className="flex gap-5 w-full flex-wrap justify-center items-center">
        <Button
          title="Cancel"
          size="large"
          color="primary"
          className="w-[43%]"
          onClick={() => setModalContent(null)}
        />
        <Button
          title="Approve Request"
          size="large"
          className={`w-[43%]  !text-[#FFFFFF]  ${
            isLoading ? "!bg-[#cccccc]" : "!bg-[#1FD11B]"
          }`}
          onClick={() => {
            approveRequest({ id: String(id), reason: "", status: "approve" });
          }}
          loading={isLoading}
          disabled={isLoading}
        />
      </div>
    </motion.div>
  );
};

export default ApproveGuarantorRequestCard;
