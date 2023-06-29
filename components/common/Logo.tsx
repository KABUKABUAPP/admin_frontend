import React, { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Logo: FC = () => {
  const router = useRouter();

  return (
    <div
      className="relative h-8 w-22 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image
        src={
          "https://res.cloudinary.com/dt0wfaxft/image/upload/v1685130491/logo_sulnht.png"
        }
        layout="fill"
        objectFit="contain"
        objectPosition={'0 50%'}
        alt="Kabukabu, ride hailing service"
      />
    </div>
  );
};

export default Logo;
