import React, { FC } from "react";
import Button from "@/components/ui/Button/Button";
import Image from "next/image";
import useClickOutside from "@/hooks/useClickOutside";
import { useModalContext } from "@/contexts/ModalContext";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const DeclineSuccessCard: FC = () => {
  const { setModalContent } = useModalContext();
  const ref = useClickOutside<HTMLDivElement>(() => setModalContent(null));
  const router = useRouter();

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      whileInView={{ scale: 1, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
      ref={ref}
      className="bg-[#FFFFFF] w-[100%] max-w-[350px] rounded-lg p-4 py-6 flex flex-col gap-8"
    >
      <div>
        <p className="text-xs text-center font-semibold">Decline Request</p>
      </div>
      <div className="relative mx-auto w-28 h-28">
        <Image
          layout="fill"
          src={"/drivers/decline-success.png"}
          alt="sos success shield icon"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div>
        <p className="text-xs text-center font-semibold">
          Request Successfully Declined
        </p>
      </div>
      <div>
        <Button
          title="Continue"
          className="w-full"
          onClick={() => {
            setModalContent(null);
            router.push("/drivers/pending");
          }}
        />
      </div>
    </motion.div>
  );
};

export default DeclineSuccessCard;
