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
          "https://res.cloudinary.com/dt0wfaxft/image/upload/v1685130491/logo_sulnht.png"
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
