import React, { FC } from "react";
import Image from "next/image";
import IconButton from "../ui/IconButton";
import MicIcon from "../icons/MicIcon";
import PhoneIcon from "../icons/PhoneIcon";
import { useCallContext } from "@/contexts/CallContext";
import { motion } from "framer-motion";

interface Props {
  imageUri: string;
  fullname: string;
}

const CallCard: FC<Props> = ({ imageUri, fullname }) => {
  const { setIsCalling } = useCallContext();

  return (
    <motion.div
      initial={{ translateY: "-100%" }}
      whileInView={{ translateY: 0, transition: { duration: 0.5 } }}
      viewport={{ once: true }}
      className="bg-[#FFFFFF] rounded-lg fixed top-28 right-10 z-50 flex items-center gap-2 p-4 py-6 shadow-lg"
    >
      <div className="relative w-10 h-10 overflow-hidden rounded-full">
        <Image
          layout="fill"
          src={imageUri}
          style={{ objectFit: "contain" }}
          alt="user image"
        />
      </div>

      <div className="min-w-[100px]">
        <p className="font-bold">{fullname}</p>
        <p className="text-sm">Calling...</p>
      </div>

      <div className="flex items-center gap-3">
        <IconButton icon={<MicIcon />} color="tetiary" />
        <IconButton
          icon={
            <span style={{ color: "#FDFDFD" }}>
              <PhoneIcon />
            </span>
          }
          handleClick={() => {
            setIsCalling(false);
          }}
        />
      </div>
    </motion.div>
  );
};

export default CallCard;
