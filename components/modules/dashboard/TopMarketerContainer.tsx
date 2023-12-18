import { PendingApplication } from "@/models/PendingApplication";
import React, { FC } from "react";

import PendingApplicationHeader from "./PendingApplicationHeader";
import PendingApplicationItemContainer from "./PendingApplicationItemContainer";
import PendingApplicationItem from "./PendingApplicationItem";
import Button from "@/components/ui/Button/Button";

interface Props {
  title: string;
  data?: PendingApplication[];
  loading: boolean;
  error: boolean;
  refetch: () => void;
  route: string;
  handleViewAll?: () => void;
}

const TopMarketerContainer: FC<Props> = ({
  title,
  data,
  loading,
  error,
  refetch,
  route,
  handleViewAll,
}) => {
  const viewState = data && !loading && !error;
  const loadingtState = !data && loading && !error;
  const errorState = error && !loading && !data;

  return (
    <div className="max-w-[380px] w-full max-sm:max-w-[250px]">
      <PendingApplicationHeader title={title} />
      {viewState && (
        <PendingApplicationItemContainer
          route={route}
          data={data}
          handleViewAll={() => {
            if (handleViewAll) handleViewAll();
          }}
        />
      )}
      {loadingtState && (
        <div>
          <PendingApplicationItem />
          <PendingApplicationItem />
          <PendingApplicationItem />
        </div>
      )}
      {errorState && (
        <div className="flex flex-col items-center py-2">
          <p className="text-xs text-rose-700 mb-2">
            Oops! Error fetching pending applications
          </p>
          <Button title="Reload" onClick={refetch} />
        </div>
      )}
    </div>
  );
};

export default TopMarketerContainer;
