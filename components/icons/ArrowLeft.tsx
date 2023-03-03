import React, { FC } from "react";

interface Props {
  handleClick?: () => any;
}

const ArrowLeft: FC<Props> = ({ handleClick }) => {
  return (
    <svg
      onClick={handleClick}
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.603994 4.69798L5.79809 0.318098C6.67109 -0.417902 7.99999 0.206034 7.99999 1.35203V10.6479C7.99999 11.7939 6.67009 12.4179 5.79809 11.6819L0.603994 7.30198C-0.201006 6.62298 -0.201006 5.37698 0.603994 4.69798Z"
        fill="#161616"
      />
    </svg>
  );
};

export default ArrowLeft;
