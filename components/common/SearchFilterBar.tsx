import React, { FC, PropsWithChildren } from "react";
import TextField from "@/components/ui/Input/TextField/TextField";
import SearchIcon from "@/components/icons/SearchIcon";
import ChevronDown from "@/components/icons/ChevronDown";
import DropDown from "../ui/DropDown";

interface Props {
  filterOptions?: {
    label: string | number;
    value: string | number;
    default?: boolean;
  }[];
  dropDownOptionSelected?: string;
  handleDropDown?: (val: string | number) => void;
  searchValue: string;
  handleSearch: (val: string)=>void
}

const SearchFilterBar: FC<PropsWithChildren<Props>> = ({
  children,
  filterOptions,
  dropDownOptionSelected,
  handleDropDown,
  searchValue,
  handleSearch
}) => {
  return (
    <div className="rounded-lg bg-[#F1F1F1] w-full min-h-10 shadow-sm my-6 py-4 px-8 flex items-center justify-between max-sm:flex-col max-sm:gap-5">
      <div className="w-[200px]">
        <TextField
          startIcon={<SearchIcon />}
          className="!bg-[#E6E6E6]"
          placeholder="Search here"
          value={searchValue}
          onChange={(e)=>handleSearch(e.target.value)}
        />
      </div>

      <div className="flex-1">{children}</div>

      <p className="text-xs flex gap-3 items-center cursor-pointer">
       <span>Sort:</span>
        <DropDown
          placeholder="Filter"
          options={filterOptions}
          value={dropDownOptionSelected}
          handleChange={(val) => {
            if (handleDropDown) handleDropDown(val);
          }}
        />
      </p>
    </div>
  );
};

export default SearchFilterBar;
