import Image from "next/image";
import React, { FC } from "react";
import { useEnlargedImageContext } from "@/contexts/EnlargeImageContext";
import useClickOutside from "@/hooks/useClickOutside";
import CloseIcon from "../icons/CloseIcon";

interface Props {
  imageUrl: string;
}

const EnlargedImage: FC<Props> = (props) => {
  const { setImageUrl } = useEnlargedImageContext();
  const ref = useClickOutside<HTMLDivElement>(() => setImageUrl(null));

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-[#00000056] backdrop-filter backdrop-blur-[3px] z-50 flex justify-center items-center p-4">
      <div
        ref={ref}
        className="relative w-[70%] h-[75%] rounded-lg overflow-hidden  backdrop-blur-sm bg-black"
      >
        <span
          onClick={() => setImageUrl(null)}
          className="absolute top-5 right-10 z-30 cursor-pointer bg-[#FFFFFF] rounded-full"
        >
          <CloseIcon />
        </span>
        <Image src={props.imageUrl} layout="fill" objectFit="contain" />
      </div>
    </div>
  );
};

export default EnlargedImage;
