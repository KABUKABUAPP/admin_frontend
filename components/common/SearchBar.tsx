import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import TextField from "@/components/ui/Input/TextField/TextField";
import SearchIcon from "@/components/icons/SearchIcon";
import DropDown from "../ui/DropDown";

interface Props {
  searchValue?: string;
  handleSearch?: (val: string) => void;
}

const SearchBar: FC<PropsWithChildren<Props>> = ({
  searchValue,
  handleSearch
}) => {
  

  return (
    <div className="rounded-lg bg-[#FFF] w-full min-h-10 shadow-sm my-6 flex items-center justify-between max-sm:flex-col max-sm:gap-5">
      <div className="w-[100%]">
        <TextField
          startIcon={<SearchIcon />}
          className="!bg-[#E6E6E6]"
          placeholder="Search using subject or sender"
          value={searchValue}
          onChange={(e) => {
            if (handleSearch) handleSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
