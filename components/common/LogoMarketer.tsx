import React, { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const LogoMarketer: FC = () => {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image
        src={
          "https://res.cloudinary.com/kabukabu/image/upload/v1714335039/landing/Black_Variation_1_qjdlqj.png"
        }
        width={'100%'}
        height={'25vh'}
        objectFit="contain"
        alt="Kabukabu, ride hailing service"
      />
    </div>
  );
};

export default LogoMarketer;
