import React, { useRef, ReactNode } from "react";

import s from "./styles.module.css";
import useRipple from "@/hooks/useRipple";
import Loader from "../Loader/Loader";

import cn from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  color?: "primary" | "secondary" | "tetiary";
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined" | "text";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  loading?: boolean;
  width?: string;
  styles?: {};
}

const Button: React.FC<Props> = (props) => {
  const {
    title,
    color = "primary",
    disabled = false,
    size = "medium",
    variant = "contained",
    startIcon,
    endIcon,
    loading = false,
    className,
    width,
    styles,
    ...rest
  } = props;

  const rootClassName = cn(
    s.root,
    {
      [s.primary]: color === "primary",
      [s.secondary]: color === "secondary",
      [s.tetiary]: color === "tetiary",
      [s.disabled]: disabled === true,
      [s.small]: size === "small",
      [s.medium]: size === "medium",
      [s.large]: size === "large",
      [s.contained]: variant === "contained",
      [s.outlined]: variant === "outlined",
      [s.text]: variant === "text",
    },
    className
  );

  const ref = useRef<HTMLButtonElement>(null);
  const ripples = useRipple(ref, variant);

  return (
    <button
      ref={ref}
      type="button"
      className={rootClassName}
      {...rest}
      style={{ width, ...styles }}
      disabled={disabled}
    >
      {!disabled && ripples}
      {loading ? <Loader /> : title}
      {startIcon && !endIcon && startIcon}
      {endIcon && !startIcon && endIcon}
    </button>
  );
};

export default Button;
