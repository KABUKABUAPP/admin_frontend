import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import React, { FC, useEffect, useState } from "react";
import TripsTableHeadRow from "./TripsTableHeadRow";
import TripsTableRow from "./TripsTableRow";
import { useGetAllTripsQuery } from "@/api-services/tripsService";
import { TripData } from "@/models/Trips";
import Pagination from "@/components/common/Pagination";

const headCellData = [
  { title: "ID", flex: 1 },
  { title: "Origin/Destination", flex: 2 },
  { title: "Rider", flex: 1 },
  { title: "Driver", flex: 1 },
  { title: "Car", flex: 1 },
  { title: "Status", flex: 1 },
];

interface FormattedTrip {
  id: string;
  origin: string;
  destination: string;
  rider: string;
  driver: string;
  carModel: string;
  plateNumber: string;
  status: string;
}

interface Props {
  setTripCount: React.Dispatch<React.SetStateAction<number | undefined>>
  tableSearch: string;
}

const TripOrdersTable: FC<Props> = ({ setTripCount, tableSearch }) => {
  const [currentPage, setCurrentPage] = useState(5);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch } = useGetAllTripsQuery(
    {
      page: currentPage,
      limit: pageSize,
      status: "initiated",
      search: tableSearch
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(()=>{
    if(data){
      setTripCount(data.data.pagination.totalCount)
    }

    return ()=>{
      setTripCount(undefined)
    }
  },[data])

  const formatTripData = (data: TripData[]): FormattedTrip[] => {
    const formattedData = data.map((trip) => {
      return {
        id: trip._id,
        origin: `${trip.start_address.city || ""}, ${
          trip.start_address.state || ""
        }, ${trip.start_address.country || ""}`,
        destination: `${trip.end_address.city || ""}, ${
          trip.end_address.state || ""
        }, ${trip.end_address.country || ""}`,
        rider: trip.user?.full_name || "",
        driver: trip?.driver?.full_name,
        carModel: trip?.car?.brand_name + ' ' + trip?.car?.model,
        plateNumber: trip?.car?.plate_number,
        status: trip.status,
      };
    });

    return formattedData;
  };

  return (
    <>
      {
        <EnhancedTable
          TableHeadComponent={<TripsTableHeadRow headCellData={headCellData} />}
          maxWidth="100vw"
          rowComponent={(row, index) => (
            <TripsTableRow data={row} index={index} />
          )}
          rowData={data ? formatTripData(data?.data.data) : undefined}
          isError={isError}
          isLoading={isLoading}
          headCellData={headCellData}
          refetch={refetch}
        />
      }
      {data && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.data.pagination.totalCount}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
};

export default TripOrdersTable;
