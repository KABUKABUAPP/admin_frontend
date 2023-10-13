import React, { FC } from "react";

interface Props {
  fill?: string;
}

const BlockIcon: FC<Props> = ({ fill = "white" }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 0C5.435 0 0.5 4.935 0.5 11C0.5 17.065 5.435 22 11.5 22C17.565 22 22.5 17.065 22.5 11C22.5 4.935 17.565 0 11.5 0ZM2.5 11C2.5 6.038 6.537 2 11.5 2C13.622 2 15.5711 2.7421 17.1111 3.9751L4.4751 16.6111C3.2421 15.0711 2.5 13.122 2.5 11ZM11.5 20C9.378 20 7.42892 19.2579 5.88892 18.0249L18.5249 5.38892C19.7579 6.92992 20.5 8.879 20.5 11C20.5 15.962 16.463 20 11.5 20Z"
        fill={fill}
      />
    </svg>
  );
};

export default BlockIcon;
