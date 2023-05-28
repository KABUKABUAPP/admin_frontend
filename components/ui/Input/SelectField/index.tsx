import React, { FC, useEffect, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import ChevronDown from "@/components/icons/ChevronDown";
import cn from "classnames";
import s from "./styles.module.css";
import ErrorMessage from "@/components/common/ErrorMessage";

interface Props {
  options?: {
    label: string | number;
    value: string | number;
    default?: boolean;
  }[];
  value?: string | number;
  handleChange?: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  error?: string | undefined;
}

const SelectField: FC<Props> = ({
  options,
  value,
  handleChange,
  placeholder,
  label,
  error,
}) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setIsDropDown(false));
  const [selectedLabel, setSelectedLabel] = useState<string | number>("");

  useEffect(() => {
    const defaultOption = options?.find((i) => i.default)?.label;
    if (defaultOption) setSelectedLabel(defaultOption);
  }, []);

  const rootClassName = cn(s.root, {
    [s.error]: error?.length,
  });

  return (
    <>
      {label && (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      )}
      <div className="relative cursor-pointer">
        <div
          className={rootClassName}
          onClick={() => setIsDropDown(!isDropDown)}
        >
          <p className="">
            {selectedLabel || (
              <span className="text-[#9A9A9A] text-xs">{placeholder}</span>
            )}
          </p>
          <ChevronDown />
        </div>
        {isDropDown && (
          <div
            ref={ref}
            className="bg-[#FFFFFF] rounded-lg p-3 absolute top-9 right-[0] w-full min-w-[250px] shadow-lg z-10 max-h-[250px] overflow-y-auto scrollbar-none"
          >
            {options && options.length ? (
              options?.map((option) => {
                return (
                  <p
                    className="py-4 border-b border-b-[#E6E6E6] last:border-none font-bold text-xs"
                    onClick={() => {
                      if (handleChange) {
                        handleChange(option.value);
                        setSelectedLabel(option.label);
                      }
                      setIsDropDown(false);
                    }}
                  >
                    {option.label}
                  </p>
                );
              })
            ) : (
              <p className="text-center">No records found</p>
            )}
          </div>
        )}
      </div>
      {error && <ErrorMessage message={error} />}
    </>
  );
};

export default SelectField;
