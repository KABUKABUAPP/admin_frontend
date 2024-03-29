import React, { FC } from "react";

interface Props {
  fill?: string;
}

const LocationPinIcon: FC<Props> = ({ fill = "#9A9A9A" }) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0.875C3.48475 0.875 0.625 3.73475 0.625 7.25C0.625 10.9872 4.09675 13.2807 6.394 14.798L6.7915 15.062C6.8545 15.104 6.92724 15.125 6.99924 15.125C7.07124 15.125 7.144 15.104 7.207 15.062L7.6045 14.798C9.90175 13.2807 13.3735 10.9872 13.3735 7.25C13.375 3.73475 10.5153 0.875 7 0.875ZM7 9.125C5.96425 9.125 5.125 8.28575 5.125 7.25C5.125 6.21425 5.96425 5.375 7 5.375C8.03575 5.375 8.875 6.21425 8.875 7.25C8.875 8.28575 8.03575 9.125 7 9.125Z"
        fill={fill}
      />
    </svg>
  );
};

export default LocationPinIcon;
