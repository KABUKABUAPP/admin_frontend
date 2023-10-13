import CloseIcon from "@/components/icons/CloseIcon";
import Button from "@/components/ui/Button/Button";
import React, { FC } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { useModalContext } from "@/contexts/ModalContext";
import { motion } from "framer-motion";
import RaiseSosItem from "./RaiseSosItem";
import RaiseSosSuccessCard from "./RaiseSosSuccessCard";

interface Props {
  data?: {
    topLocation: string;
    subLocation: string;
    isChecked: boolean;
  }[];
}

const RaiseSosCard: FC<Props> = ({ data }) => {
  const { setModalContent } = useModalContext();
  const ref = useClickOutside<HTMLDivElement>(() => {
    setModalContent(null);
  });

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      whileInView={{ scale: 1, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
      ref={ref}
      className="w-full max-w-[360px] bg-[#FFFFFF] rounded-lg px-2 py-6 flex flex-col justify-between h-[80%]"
    >
      <div style={{ height: "10%" }}>
        <p className="text-xs font-bold text-center relative">
          Send to RRS
          <span
            className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setModalContent(null)}
          >
            <CloseIcon />
          </span>
        </p>
      </div>
      <div
        style={{ height: "80%" }}
        className="overflow-hidden 
      overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
    scrollbar-thumb-gray-900 scrollbar-track-gray-300"
      >
        {data?.map((item, idx) => (
          <RaiseSosItem {...item} key={idx} />
        ))}
      </div>
      <div style={{ height: "10%" }}>
        <Button
          title="Send to RRS"
          color="secondary"
          className="w-full"
          onClick={() => setModalContent(<RaiseSosSuccessCard />)}
        />
      </div>
    </motion.div>
  );
};

export default RaiseSosCard;
