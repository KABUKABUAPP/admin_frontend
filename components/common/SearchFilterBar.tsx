import React, { FC, PropsWithChildren } from "react";
import TextField from "@/components/ui/Input/TextField/TextField";
import SearchIcon from "@/components/icons/SearchIcon";
import ChevronDown from "@/components/icons/ChevronDown";

const SearchFilterBar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="rounded-lg bg-[#F1F1F1] w-full min-h-10 shadow-sm my-6 py-4 px-8 flex items-center justify-between max-sm:flex-col max-sm:gap-5">
      <div className="w-[200px]">
        <TextField
          startIcon={<SearchIcon />}
          className="!bg-[#E6E6E6]"
          placeholder="Search here"
        />
      </div>

      <div className="flex-1">{children}</div>

      <p className="text-xs flex items-center cursor-pointer">
        Sort: <span className="mr-3 ml-1 font-bold">Newest First</span>
        <ChevronDown />
      </p>
    </div>
  );
};

export default SearchFilterBar;
