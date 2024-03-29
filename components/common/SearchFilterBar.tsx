import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import TextField from "@/components/ui/Input/TextField/TextField";
import SearchIcon from "@/components/icons/SearchIcon";
import DropDown from "../ui/DropDown";
import { useRouter } from "next/router";
import Button from "../ui/Button/Button";
import AddIcon from "../icons/AddIcon";

interface Props {
  filterOptions?: {
    label: string | number;
    value: string | number;
    default?: boolean;
  }[];
  dropDownOptionSelected?: string;
  handleDropDown?: (val: string | number) => void;
  searchValue?: string;
  handleSearch?: (val: string) => void;
  title?: string;
  pendingInnerFilter?: any;
  carDeliveriesInnerFilter?: any;
  tabInnerFilter?: any;
  innerFilterValue?: any;
  handleFilterClick?: (val: string) => void;
  carDeliveryView?: boolean;
  tripPaymentView?: boolean;
  tripPaymentOptions?: {
    label: string | number;
    value: string | number;
    default?: boolean;
  }[];
  tripPaymentOptionsSelected?: string;
  handleTripPayments?: (val: string | number) => void;
}

const SearchFilterBar: FC<PropsWithChildren<Props>> = ({
  children,
  filterOptions,
  dropDownOptionSelected,
  handleDropDown,
  searchValue,
  handleSearch,
  title='Sort:',
  pendingInnerFilter,
  carDeliveriesInnerFilter,
  tabInnerFilter,
  innerFilterValue,
  handleFilterClick,
  carDeliveryView,
  tripPaymentOptions,
  tripPaymentOptionsSelected,
  handleTripPayments,
  tripPaymentView
}) => {
  const router = useRouter();

  return (
    <div className="rounded-lg bg-[#F1F1F1] w-full min-h-10 shadow-sm my-6 py-4 px-8 flex items-center justify-between max-sm:flex-col max-sm:gap-5">
      <div className="w-[200px]">
        <TextField
          startIcon={<SearchIcon />}
          className="!bg-[#E6E6E6]"
          placeholder="Search here"
          value={searchValue}
          onChange={(e) => {
            if (handleSearch) handleSearch(e.target.value);
          }}
        />
      </div>

      <div className="flex">
        {
          tabInnerFilter && tabInnerFilter.length > 0 &&
          <>
            {tabInnerFilter.map((filter: any) => (
              <div className="border-r border-r-[#E6E6E6] px-8 max-md:px-6 max-sm:border-r-0 max-sm:py-3 max-sm:border-b">
              <p
                className={`${
                  filter.value === innerFilterValue ? "text-sm text-[#000] font-bold" : "text-xs text-[#9A9A9A]"
                } cursor-pointer max-sm:text-center`}
                onClick={() => {
                  if (handleFilterClick) handleFilterClick(filter.value)
                }}
              >
                {filter.key}
              </p>
            </div>
            ))}
          </>
        }
      </div>

      <div className="flex-1">{children}</div>

      <div className="text-xs flex gap-3 items-center cursor-pointer">
        {carDeliveryView && <Button title="New Delivery" size="medium" startIcon={<AddIcon />} color="tetiary" className="border border-[#000]" onClick={() => {router.push('/sharp-cars/car-deliveries/new-delivery')}} />}
        {
          tripPaymentView &&
          <>
            <span>Trip Type</span>
            <DropDown
              placeholder="Filter"
              options={tripPaymentOptions}
              value={tripPaymentOptionsSelected}
              handleChange={(val) => {
                if (handleTripPayments) handleTripPayments(val);
              }}
            />
          </>
        }
        <span>{title}</span>
        <DropDown
          placeholder="Filter"
          options={filterOptions}
          value={dropDownOptionSelected}
          handleChange={(val) => {
            if (handleDropDown) handleDropDown(val);
          }}
        />
      </div>
    </div>
  );
};

export default SearchFilterBar;
