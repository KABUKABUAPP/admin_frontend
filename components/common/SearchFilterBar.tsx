import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import TextField from "@/components/ui/Input/TextField/TextField";
import SearchIcon from "@/components/icons/SearchIcon";
import DropDown from "../ui/DropDown";
import { useRouter } from "next/router";
import Button from "../ui/Button/Button";
import AddIcon from "../icons/AddIcon";
import TextFieldTwo from "../ui/Input/TextFieldTwo/TextFieldTwo";

function convertDateFormat(dateString: string): string {
  // Split the input date string by the hyphen
  const [year, month, day] = dateString.split('-');

  // Return the date in the desired format
  return `${month}-${day}-${year}`;
}

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
  setDateStart?: (val: any) => void;
  setDateEnd?: (val: any) => void;
  setMinAmount?: (val: any) => void;
  transactionStatus?: any;
  transactionStatusDropdown?: any;
  handleTransactionStatusDropdown?: (val: string | number) => void;
  showUserTypeFilter?: boolean;
  setUserTypeFilter?: (val: string) => void;
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
  tripPaymentView,
  setDateStart,
  setDateEnd,
  setMinAmount,
  transactionStatus,
  transactionStatusDropdown,
  handleTransactionStatusDropdown,
  showUserTypeFilter,
  setUserTypeFilter
}) => {
  const router = useRouter();

  const tab = router.query.tab;

  return (
    <div className="rounded-lg bg-[#F1F1F1] w-full min-h-10 shadow-sm my-6 py-4 px-8 flex items-center justify-between max-sm:flex-col max-sm:gap-5 gap-3">
      <div className="w-full sm:w-[15vw]">
        <TextField
          label="Search"
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
        <div className="flex flex-col sm:flex-row items-center w-full gap-4">
          {
            setDateStart &&
            <div className="text-xs flex gap-3 items-center cursor-pointer">
              <TextFieldTwo
                  label="Start Date"
                  placeholder="Start Date Here"
                  onChange={(e) => {
                    setDateStart(convertDateFormat(e?.target?.value));
                  }}
                  type="date"
              />
            </div>
          }
          
          {
            setDateEnd &&
            <div className="text-xs flex gap-3 items-center cursor-pointer">
              <TextFieldTwo
                  label="End Date"
                  placeholder="End Date Here"
                  onChange={(e) => {
                    setDateEnd(convertDateFormat(e?.target?.value))
                  }}
                  type="date"
              />
            </div>
          }
          
          {
            setMinAmount &&
            <div className="text-xs flex gap-3 items-center cursor-pointer">
              <TextFieldTwo
                  label="Amount"
                  placeholder="Amount Here"
                  onChange={(e) => {
                      setMinAmount(parseInt(e?.target?.value))
                  }}
                  type="number"
              />
            </div>
          }
          {carDeliveryView && <Button title="New Delivery" size="medium" startIcon={<AddIcon />} color="tetiary" className="border border-[#000]" onClick={() => {router.push('/sharp-cars/car-deliveries/new-delivery')}} />}
          {
            tripPaymentView &&
            <div className="flex flex-col w-full sm:w-auto">
              <p>Trip Type</p>
              <DropDown
                placeholder="Filter"
                options={tripPaymentOptions}
                value={tripPaymentOptionsSelected}
                handleChange={(val) => {
                  if (handleTripPayments) handleTripPayments(val);
                }}
              />
            </div>
          }
          {
            transactionStatusDropdown && tab && tab !== 'wallets' &&
            <div className="flex flex-col w-full sm:w-auto">
              <p>{'Status'}</p>
              <DropDown
                placeholder="Filter"
                options={transactionStatusDropdown}
                value={transactionStatus}
                handleChange={(val) => {
                  if (handleTransactionStatusDropdown) handleTransactionStatusDropdown(val);
                }}
              />
            </div> 
          }
          {
            showUserTypeFilter && 
            <div className="flex flex-col w-full sm:w-auto">
              <p>{'User Type'}</p>
              <DropDown
                placeholder="Set User Type"
                options={[
                  { label: "Driver", value: "driver", default: false },
                  { label: "Rider", value: "rider", default: false }
                ]}
                value={transactionStatus}
                handleChange={(val: any) => {
                  if (setUserTypeFilter) setUserTypeFilter(val);
                }}
              />
            </div> 
          }
          <div className="flex flex-col w-full sm:w-auto">
            <p>{title}</p>
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
      </div>
    </div>
  );
};

export default SearchFilterBar;
