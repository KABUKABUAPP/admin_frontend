import React, { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Button from "@/components/ui/Button/Button";

const ForgotPasswordSuccess: FC = () => {
  
  const router = useRouter()

  return (
    <div className="max-w-[70%] mx-auto px-2">
      <div>
        <p className="text-xl font-medium text-center pt-10">Forgot Password</p>
        <p className="text-center font-medium mt-2 text-xs w-56 mx-auto py-6">
          Your request has been sent to the admin. You’ll get an mail when reset
          is successful
        </p>
      </div>

      <div>
        <div className="relative mx-auto w-32 h-32">
          <Image
            src={"/auth/open-envelope.svg"}
            alt="forgot password success kabukabu"
            layout="fill"
            style={{objectFit: 'contain'}}
          />
        </div>
      </div>

      <div>
        <Button title="Okay" className="w-full mt-12" onClick={()=>router.push('/auth/login')}/>
      </div>
    </div>
  );
};

export default ForgotPasswordSuccess;
