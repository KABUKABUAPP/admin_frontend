import React, { FC } from "react";

interface Props {
  message: string;
}

const ErrorMessage: FC<Props> = ({ message }) => {
  return <p className="text-xs text-rose-700 pb-2">{message}</p>;
};

export default ErrorMessage;
