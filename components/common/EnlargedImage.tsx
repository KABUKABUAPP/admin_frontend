import Image from "next/image";
import React, { FC } from "react";
import { useEnlargedImageContext } from "@/contexts/EnlargeImageContext";
import useClickOutside from "@/hooks/useClickOutside";
import CloseIcon from "../icons/CloseIcon";
import { motion } from "framer-motion";

interface Props {
  imageUrl: string;
}

const EnlargedImage: FC<Props> = (props) => {
  const { setImageUrl } = useEnlargedImageContext();
  const ref = useClickOutside<HTMLDivElement>(() => setImageUrl(null));

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-[#00000056] backdrop-filter backdrop-blur-[3px] z-50 flex justify-center items-center p-4">
      <motion.div
        initial={{ translateY: -100 }}
        whileInView={{ translateY: 0, transition: { duration: 0.3 } }}
        viewport={{ once: true }}
        ref={ref}
        className="relative w-[70%] h-[75%] rounded-lg overflow-hidden  backdrop-blur-sm bg-black"
      >
        <span
          onClick={() => setImageUrl(null)}
          className="absolute top-5 right-10 z-30 cursor-pointer bg-[#FFFFFF] rounded-full"
        >
          <CloseIcon width="20" height="20" />
        </span>
        <Image src={props.imageUrl} layout="fill" objectFit="contain" />
      </motion.div>
    </div>
  );
};

export default EnlargedImage;
