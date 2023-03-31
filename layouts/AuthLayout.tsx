import React, { FC, PropsWithChildren } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import Transition from "@/components/common/Transition";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="h-screen flex">
      <section className="relative h-full w-5/12 max-lg:hidden">
        <Image
          src={"/auth/auth-image.png"}
          alt="Login to Kabukabu app"
          style={{ objectFit: "cover" }}
          layout="fill"
          priority
        />
        <p className="absolute bottom-5 text-white text-2xl w-full text-center">
          Manage Kabukabu's Affairs
        </p>
      </section>
      <section className="flex justify-center items-center w-7/12 p-2 py-20 max-lg:w-full">
        <div className="border-[#FFBF00] min-h-[100%] border w-full rounded-lg max-w-[70%] p-1 max-sm:max-w-full">
          <Transition>{children}</Transition>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
