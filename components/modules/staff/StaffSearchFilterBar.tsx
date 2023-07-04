import React, { FC } from "react";

import SearchFilterBar from "@/components/common/SearchFilterBar";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import Divider from "@/components/common/Divider";
import { useRouter } from "next/router";
import DropDown from "@/components/ui/DropDown";
import useUserPermissions from "@/hooks/useUserPermissions";

interface Props {
  sortFilterValue: string;
  handleSortFilter: (value: string) => void;
  searchValue: string;
  handleSearch: (value: string) => void;
  statusFilter: string;
  handleStatusFilter: (value: string) => void;
}

const StaffSearchFilterBar: FC<Props> = ({
  handleSortFilter,
  sortFilterValue,
  searchValue,
  handleSearch,
  handleStatusFilter,
  statusFilter,
}) => {
  const router = useRouter();

  const sortFilterOptions = [
    { label: "Newest First", value: "newest_first", default: true },
    { label: "Oldest First", value: "oldest_first", default: false },
  ];

  const statusFilterOptions = [
    { label: "Active", value: "active" },
    { label: "Blocked", value: "blocked" },
    { label: "All Status", value: "", default: true },
  ];

  const { userPermissions } = useUserPermissions();

  return (
    <SearchFilterBar
      dropDownOptionSelected={sortFilterValue}
      handleDropDown={(val) => handleSortFilter(String(val))}
      filterOptions={sortFilterOptions}
      searchValue={searchValue}
      handleSearch={(val) => handleSearch(val)}
    >
      <div className="flex justify-end mr-3">
        {userPermissions && userPermissions.staffs_permissions.write && (
          <Button
            title="Add New Staff"
            startIcon={<AddIcon />}
            onClick={() => router.push(`/staffs/add-staff`)}
          />
        )}
        <div className="mx-4 flex items-center justify-center">
          <Divider height="80%" />
        </div>
        <div className="text-xs flex gap-3 items-center cursor-pointer justify-end pr-3 mr-3 max-sm:pr-0 max-sm:mr-0 max-sm:border-r-0">
          <span>Show:</span>
          <DropDown
            placeholder="Status"
            options={statusFilterOptions}
            value={statusFilter}
            handleChange={(val) => {
              handleStatusFilter(String(val));
            }}
          />
        </div>
        <div className="ml-4 flex items-center justify-center">
          <Divider height="80%" />
        </div>
      </div>
    </SearchFilterBar>
  );
};

export default StaffSearchFilterBar;
