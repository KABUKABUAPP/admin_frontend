import React, { FC, useEffect, useState } from "react";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import TripsTableHeadRow from "./TripsTableHeadRow";
import { completedTripsRowMockData } from "../../../constants";
import CompletedTripsTableRow from "./CompletedTripsTableRow";
import Pagination from "@/components/common/Pagination";
import { FormattedTripOrder, TripData } from "@/models/Trips";
import { useGetAllTripsQuery } from "@/api-services/tripsService";
import { useRouter } from "next/router";

const headCellData = [
  { title: "ID", flex: 2 },
  { title: "Origin/Destination", flex: 2 },
  { title: "Rider", flex: 1 },
  { title: "Driver", flex: 1 },
  { title: "Car", flex: 1 },
  { title: "Status", flex: 1 },
  { title: "Price", flex: 1},
  { title: "Rating", flex: 1}
];

interface Props {
  setTripCount: React.Dispatch<React.SetStateAction<number | undefined>>
  tableSearch: string
  order: string
}

const CompletedTripsTable:FC<Props> = ({ setTripCount, tableSearch, order }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch } = useGetAllTripsQuery(
    {
      page: currentPage,
      limit: pageSize,
      status: "completed",
      search: tableSearch,
      order,
      type: 'trip'
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

  const formatTripData = (data: TripData[]): FormattedTripOrder[] => {
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
        reason: trip?.cancel_trip_reason,
        rating: trip?.rating?.value,
        price: trip?.price
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
            <CompletedTripsTableRow data={row} index={index} currentPage={currentPage} />
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
}

export default CompletedTripsTable