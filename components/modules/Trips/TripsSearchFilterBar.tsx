import React, { FC, PropsWithChildren } from "react";
import DropDown from "@/components/ui/DropDown";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import TextFieldTwo from "@/components/ui/Input/TextFieldTwo/TextFieldTwo";
import TripsOptionBarSwap from "./TripsOptionBarSwap";

function convertDateFormat(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return `${month}-${day}-${year}`;
}

interface Props {
  options: { title: string; isActive: boolean; keyVal: string }[];
  handleClickOption: (key: string) => void;
  filterOptions?: {
    label: string | number;
    value: string | number;
    default?: boolean;
  }[];
  dropDownOptionSelected?: string;
  handleDropDown?: (val: string | number) => void;
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

const TripsSearchFilterBar: FC<PropsWithChildren<Props>> = ({
  children,
  options,
  handleClickOption,
  filterOptions,
  dropDownOptionSelected,
  handleDropDown,
  title = "Sort:",
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
  setUserTypeFilter,
}) => {
  const router = useRouter();
  const tab = router.query.tab;

  return (
    <div className="rounded-lg bg-[#F1F1F1] w-full min-h-10 shadow-sm my-6 py-4 px-2 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="w-auto">
        <TripsOptionBarSwap options={options} handleClickOption={handleClickOption} />
      </div>

      <div className="flex">
        {tabInnerFilter &&
          tabInnerFilter.length > 0 &&
          tabInnerFilter.map((filter: any, index: number) => (
            <div key={index} className="border-r border-r-[#E6E6E6] px-8 max-md:px-6 max-sm:border-r-0 max-sm:py-3 max-sm:border-b">
              <p
                className={`${
                  filter.value === innerFilterValue ? "text-sm text-[#000] font-bold" : "text-xs text-[#9A9A9A]"
                } cursor-pointer max-sm:text-center`}
                onClick={() => {
                  if (handleFilterClick) handleFilterClick(filter.value);
                }}
              >
                {filter.key}
              </p>
            </div>
          ))}
      </div>

      <div className="flex-1">{children}</div>

      <div className="text-xs flex gap-3 items-center cursor-pointer w-full lg:w-auto">
        <div className="flex flex-col sm:flex-row items-center w-full gap-4">
          {setDateStart && (
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
          )}

          {setDateEnd && (
            <div className="text-xs flex gap-3 items-center cursor-pointer">
              <TextFieldTwo
                label="End Date"
                placeholder="End Date Here"
                onChange={(e) => {
                  setDateEnd(convertDateFormat(e?.target?.value));
                }}
                type="date"
              />
            </div>
          )}

          {setMinAmount && (
            <div className="text-xs flex gap-3 items-center cursor-pointer">
              <TextFieldTwo
                label="Amount"
                placeholder="Amount Here"
                onChange={(e) => {
                  setMinAmount(parseInt(e?.target?.value));
                }}
                type="number"
              />
            </div>
          )}

          {carDeliveryView && (
            <Button
              title="New Delivery"
              size="medium"
              startIcon={<AddIcon />}
              color="tetiary"
              className="border border-[#000]"
              onClick={() => {
                router.push("/sharp-cars/car-deliveries/new-delivery");
              }}
            />
          )}

          {tripPaymentView && (
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
          )}

          {transactionStatusDropdown && tab && tab !== "wallets" && (
            <div className="flex flex-col w-full sm:w-auto">
              <p>Status</p>
              <DropDown
                placeholder="Filter"
                options={transactionStatusDropdown}
                value={transactionStatus}
                handleChange={(val) => {
                  if (handleTransactionStatusDropdown) handleTransactionStatusDropdown(val);
                }}
              />
            </div>
          )}

          {showUserTypeFilter && (
            <div className="flex flex-col w-full sm:w-auto">
              <p>User Type</p>
              <DropDown
                placeholder="Set User Type"
                options={[
                  { label: "Driver", value: "driver", default: false },
                  { label: "Rider", value: "rider", default: false },
                ]}
                value={transactionStatus}
                handleChange={(val: any) => {
                  if (setUserTypeFilter) setUserTypeFilter(val);
                }}
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-2 w-full sm:w-auto">
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

export default TripsSearchFilterBar;
