import React, { FC } from "react";
import s from "./style.module.css";

import cn from "classnames";

interface Props {
  size?: "small" | "medium" | "large";
}

const Loader: FC<Props> = ({ size = "small" }) => {
  const rootClassname = cn(s.root, {
    [s.small]: size === "small",
    [s.medium]: size === "medium",
    [s.large]: size === "large",
  });

  return <div className={rootClassname}></div>;
};

export default Loader;
