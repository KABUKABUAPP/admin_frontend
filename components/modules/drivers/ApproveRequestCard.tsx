import Button from "@/components/ui/Button/Button";
import useClickOutside from "@/hooks/useClickOutside";
import React, { FC, useEffect } from "react";
import { motion } from "framer-motion";
import { useApproveDeclineDriverMutation, useApproveSharpRequestMutation } from "@/api-services/driversService";
import ApproveSuccessCard from "./ApproveSuccessCard";
import { useModalContext } from "@/contexts/ModalContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface Props {
  id: string;
}

const ApproveRequestCard: FC<Props> = ({ id }) => {
  const router = useRouter();
  const { setModalContent } = useModalContext();
  const ref = useClickOutside<HTMLDivElement>(() => setModalContent(null));

  console.log(router.query, router.query.fallbackUrl)
  const [
    approveRequest,
    {
      data: approvedData,
      isSuccess: approvedSuccess,
      error,
      isLoading: approvedLoading,
    },
  ] = useApproveDeclineDriverMutation();

  const [
    approveSharpRequest,
    {
      data: approvedSharpData,
      isSuccess: approvedSharpSuccess,
      error: approvedSharpError,
      isLoading: approvedSharpLoading,
    },
  ] = useApproveSharpRequestMutation();

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

  useEffect(() => {
    if (approvedSharpSuccess) {
      setModalContent(<ApproveSuccessCard />);
    }
  }, [approvedSharpSuccess]); 

  useEffect(()=>{
    if(approvedSharpError && "data" in approvedSharpError){
      const { message }: any = approvedSharpError.data
      toast.error(message)
    }
  },[approvedSharpError])

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

        {
          router.query.fallbackUrl && router.query.fallbackUrl.includes('/sharp-cars?tab=pending-drivers') &&
          
          <Button
            title="Approve Sharp Request"
            size="large"
            className={`w-[43%] ${
              approvedSharpLoading ? "!bg-[#cccccc]" : "!bg-[#1FD11B]"
            } !text-[#FFFFFF]`}
            onClick={() => {
              approveSharpRequest({
                driverId: String(id),
                status: "approve",
              });
            }}
            loading={approvedSharpLoading}
            disabled={approvedSharpLoading}
          />
        }
        {
          !router.query.fallbackUrl &&
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
        }
      </div>
    </motion.div>
  );
};

export default ApproveRequestCard;
