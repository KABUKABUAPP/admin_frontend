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
    //{ label: "Active", value: "active" },
    //{ label: "Blocked", value: "blocked" },
    { label: "All", value: "", default: true },
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
      <div className="flex justify-between">
        <div className="flex mx-6 justify-center mt-1">
          <span className="mx-3 cursor-pointer" onClick={() => {router.push('/staffs')}}>Staffs</span>
          <span className="mx-3"><b>|</b></span>
          <span className="mx-3 cursor-pointer" onClick={() => {router.push('/staffs/teams')}}><b>Teams</b></span>
        </div>
        <div className="flex justify-end mr-3">
          {userPermissions && userPermissions.staffs_permissions.write && (
            <Button
              title="Add New Team"
              startIcon={<AddIcon />}
              onClick={() => router.push(`/staffs/teams/add-team`)}
            />
          )}
          <div className="mx-4 flex items-center justify-center">
            <Divider height="80%" />
          </div>
          <div className="text-xs flex gap-3 items-center cursor-pointer justify-end pr-3 mr-3 max-sm:pr-0 max-sm:mr-0 max-sm:border-r-0">
            <span>Audience Type:</span>
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
      </div>

    </SearchFilterBar>
  );
};

export default StaffSearchFilterBar;
