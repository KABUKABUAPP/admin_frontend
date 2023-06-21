import { useRouter } from "next/router";
import React, { FC, useState } from "react";

import Button from "@/components/ui/Button/Button";
import RoleItem from "./RoleItem";
import { useGetRolesQuery } from "@/api-services/settingsService";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/ui/Loader/Loader";

interface Props {
  handleViewRole: () => void;
  handleCreateRole: ()=>void
}

const AllRolesView: FC<Props> = ({ handleViewRole, handleCreateRole }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const { data, isLoading, error, refetch } = useGetRolesQuery(
    {
      limit: pageSize,
      page: currentPage,
    },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );
  const { push } = useRouter();

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <p className="text-2xl font-medium">Roles</p>
        <div>
          <Button title="New Role" size="large" onClick={handleCreateRole}/>
        </div>
      </div>

      {data &&
        !isLoading &&
        !error &&
        data.data.map((role, idx) => {
          return (
            <RoleItem
              data={role}
              key={idx}
              handleClick={(id) => {
                push(`/settings?roleId=${id}`, undefined, { shallow: true });
                handleViewRole()
              }}
            />
          );
        })}
      {data && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.totalCount}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      {isLoading && !error && !data && (
        <div className="mt-6 flex justify-center items-center">
          <Loader />
        </div>
      )}
      {error && !data && !isLoading && (
        <div className="mt-6 flex justify-center items-center">
          <Button title="Refetch" onClick={refetch} />
        </div>
      )}
    </>
  );
};
export default AllRolesView;
