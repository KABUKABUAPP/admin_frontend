import React, { FC } from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const PhoneIcon: FC<Props> = ({
  fill = "currentColor",
  width = 15,
  height = 15,
}) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6252 11.1742L17.2682 12.7502C17.8142 13.0762 18.0961 13.7102 17.9711 14.3342C17.4601 16.8932 14.8902 18.5332 12.3732 17.8422C6.4342 16.2122 1.79509 11.5872 0.159086 5.63524C-0.532914 3.11724 1.10519 0.545222 3.66519 0.0332217L3.68204 0.030231C4.30704 -0.094769 4.94419 0.188232 5.26919 0.737232L6.83218 3.37624C7.38818 4.31524 7.11203 5.52422 6.20303 6.12822L4.54214 7.23323C5.71414 10.0402 7.95408 12.2892 10.7531 13.4592L11.8681 11.7942C12.4771 10.8872 13.6872 10.6152 14.6252 11.1742Z"
        fill={fill}
      />
    </svg>
  );
};

export default PhoneIcon;
