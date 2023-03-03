import React, { FC, useState } from "react";

import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";

const ForgotPasswordContainer: FC = () => {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);

  return (
    <div>
      {!isSubmitSuccess ? (
        <ForgotPasswordForm
          handleSubmitFormSuccess={() => {
            setIsSubmitSuccess(true);
          }}
        />
      ) : (
        <ForgotPasswordSuccess />
      )}
    </div>
  );
};

export default ForgotPasswordContainer;
