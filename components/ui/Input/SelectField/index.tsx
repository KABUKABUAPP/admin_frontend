import React, { ReactNode } from "react";

import s from "./styles.module.css";

import cn from "classnames";

interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
  className?: string;
  label?: string;
  error?: string | undefined;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  options?: { label: string; value: string | number }[];
  required?: boolean;
}

const SelectField: React.FC<Props> = (props) => {
  const {
    label,
    error,
    className,
    startIcon,
    endIcon,
    options,
    required,
    ...rest
  } = props;

  const rootClassName = cn(
    s.root,
    {
      [s.error]: error?.length,
      [s.startIconPadding]: startIcon && !endIcon,
      [s.endIconPadding]: endIcon && !startIcon,
    },
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-sm font-medium">
          {label} {required && <span className="text-rose-600">*</span>}
        </label>
      )}
      <div className="w-full relative">
        <select {...rest} className={rootClassName}>
          <option value={""} disabled hidden selected>
            Select
          </option>
          {options?.map((opt, idx) => {
            return <option value={opt.value} key={idx}>{opt.label}</option>;
          })}
        </select>
        {startIcon && !endIcon && (
          <span className="absolute top-2/4 -translate-y-1/2 left-2 cursor-pointer">
            {startIcon}
          </span>
        )}
        {endIcon && !startIcon && (
          <span className="absolute top-2/4 -translate-y-1/2 right-2 cursor-pointer">
            {endIcon}
          </span>
        )}
      </div>
      {error && <small className="text-[#dc3545] text-xs">{error}</small>}
    </div>
  );
};

export default SelectField;
