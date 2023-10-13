import React, { FC } from "react";
import s from "./styles.module.css";
import c from "classnames";

interface Props {
  color?: "primary" | "secondary" | "tetiary";
  icon: React.ReactNode;
  className?: string;
  handleClick?: ()=>any
}

const IconButton: FC<Props> = ({ color = "secondary", icon, className, handleClick }) => {
  const rootClassName = c(
    s.root,
    {
      [s.primary]: color === "primary",
      [s.secondary]: color === "secondary",
      [s.tetiary]: color === "tetiary",
    },
    className
  );

  return <button className={rootClassName} onClick={handleClick}>{icon}</button>;
};

export default IconButton;
