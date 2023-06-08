import Button from "@/components/ui/Button/Button";
import useClickOutside from "@/hooks/useClickOutside";
import React, { FC, useEffect } from "react";
import { motion } from "framer-motion";
import { useApproveDeclineDriverMutation } from "@/api-services/driversService";
import ApproveSuccessCard from "./ApproveSuccessCard";
import { useModalContext } from "@/contexts/ModalContext";
import { toast } from "react-toastify";

interface Props {
  id: string;
}

const ApproveRequestCard: FC<Props> = ({ id }) => {
  const { setModalContent } = useModalContext();
  const ref = useClickOutside<HTMLDivElement>(() => setModalContent(null));

  const [
    approveRequest,
    {
      data: approvedData,
      isSuccess: approvedSuccess,
      error,
      isLoading: approvedLoading,
    },
  ] = useApproveDeclineDriverMutation();

  useEffect(() => {
    if (approvedSuccess) {
      setModalContent(<ApproveSuccessCard />);
    }
  }, [approvedSuccess]);

  useEffect(()=>{
    if(error && "data" in error){
      const { message }: any = error.data
      toast.error(message)
    }
  },[error])

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      whileInView={{ scale: 1, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
      ref={ref}
      className="bg-[#FFFFFF] rounded-xl w-full max-w-[450px] flex flex-col justify-center items-center p-2 py-5 gap-12"
    >
      <p className="font-bold text-center text-sm">Approve Request</p>

      <div>
        <p className="font-bold text-center text-sm">
          Are you sure you want to approve this request?
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
          className={`w-[43%] ${
            approvedLoading ? "!bg-[#cccccc]" : "!bg-[#1FD11B]"
          } !text-[#FFFFFF]`}
          onClick={() => {
            approveRequest({
              driverId: String(id),
              status: "approve",
            });
          }}
          loading={approvedLoading}
          disabled={approvedLoading}
        />
      </div>
    </motion.div>
  );
};

export default ApproveRequestCard;
