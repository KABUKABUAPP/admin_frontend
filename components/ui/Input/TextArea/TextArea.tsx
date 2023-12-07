import React, { ReactNode, useState } from "react";

import s from "./styles.module.css";

import cn from "classnames";
import { toast } from "react-toastify";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string | undefined;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const TextArea: React.FC<Props> = (props) => {
    const [messageBody, setMessageBody] = useState('')
  const { label, error, className, startIcon, endIcon, ...rest } = props;

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
        <label className="mb-1 block text-sm font-medium">{label}</label>
      )}
      <div className="w-full relative">
        {/*<input {...rest} className={rootClassName} />*/}
        <textarea 
            name="" 
            id="" 
            cols={85} 
            rows={5} 
            placeholder="Content here" 
            className="text-sm pt-2 pl-2 bg-[#F1F1F1] w-[100%]"
            value={messageBody}
            onChange={(e) => {
                if (messageBody.length < 500) setMessageBody(e.target.value);
                if (messageBody.length >= 500) toast.error('Maximum allowed message body')
            }}>
        </textarea>
        <p className="text-sm font-bold">Word Count: {messageBody.length}/500</p>
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

export default TextArea;
