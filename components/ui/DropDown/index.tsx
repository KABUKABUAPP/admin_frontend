import React, { FC, useEffect, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import ChevronDown from "@/components/icons/ChevronDown";

interface Props {
  options?: { label: string | number; value: string | number, default?: boolean, pseudoLabel?: string }[];
  value?: string | number;
  handleChange?: (value: string | number) => void;
  placeholder?: string;
}

const DropDown: FC<Props> = ({ options, value, handleChange, placeholder }) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setIsDropDown(false));
  const [ selectedLabel, setSelectedLabel ] = useState<string | number>('')

  useEffect(()=>{
    const defaultOption = options?.find((i)=>i.default)?.label
    if(defaultOption) setSelectedLabel(defaultOption)
  },[])

  const [ currentPseudoLabel, setCurrentPseudoLabel ] = useState('')

  useEffect(()=>{
    
    const hasPseudoLabel = options?.find((item)=>item.pseudoLabel?.length)
    if(hasPseudoLabel?.pseudoLabel){
      setCurrentPseudoLabel(hasPseudoLabel.pseudoLabel)
    }
    else setCurrentPseudoLabel('')

  },[JSON.stringify(options)])

  return (
    <div className="relative cursor-pointer">
      <div className="flex justify-between gap-3 items-center" onClick={() => setIsDropDown(!isDropDown)}>
        <p className="font-bold text-xs">{currentPseudoLabel || selectedLabel || placeholder}</p>
        <ChevronDown />
      </div>
      {isDropDown && (
        <div
          ref={ref}
          className="bg-[#FFFFFF] rounded-lg p-3 absolute top-6 right-[0] min-w-[250px] shadow-md"
        >
          {options && options.length ? options?.map((option) => {
            return (
              <p className="py-4 border-b border-b-[#E6E6E6] last:border-none font-bold text-xs" onClick={()=>{
                if(handleChange){
                    handleChange(option.value)
                    setSelectedLabel(option.label)
                }
                setIsDropDown(false)
              }}>{option.label}</p>
            );
          }) : <p className="text-center">No records found</p>}
        </div>
      )}
    </div>
  );
};

export default DropDown;
