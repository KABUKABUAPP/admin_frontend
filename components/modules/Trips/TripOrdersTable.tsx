import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import React, { FC } from "react";
import TripsTableHeadRow from "./TripsTableHeadRow";
import TripsTableRow from "./TripsTableRow";
import { useGetAllTripsQuery } from "@/api-services/tripsService";
import { TripData } from "@/models/Trips";
import Loader from "@/components/ui/Loader/Loader";
import Button from "@/components/ui/Button/Button";

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

const TripOrdersTable: FC = () => {
  const { data, isLoading, error, refetch } = useGetAllTripsQuery({
    page: 0,
    limit: 10,
    status: "completed",
  });

  const formatTripData = (data: TripData[]): FormattedTrip[] => {
    const formattedData = data.map((trip) => {
      return {
        id: trip._id,
        origin: `${trip.order.start_address.street}, ${trip.order.start_address.city}, ${trip.order.start_address.state}, ${trip.order.start_address.country}`,
        destination: `${trip.order.end_address.street}, ${trip.order.end_address.city}, ${trip.order.end_address.state}, ${trip.order.end_address.country}`,
        rider: trip.user.full_name,
        driver: "Driver name",
        carModel: "Toyota Corolla",
        plateNumber: "AX40-ZBY",
        status: trip.status,
      };
    });

    return formattedData;
  };

  return (
    <>
      {data && !error && !isLoading && data.data.data.length ? (
        <EnhancedTable
          TableHeadComponent={<TripsTableHeadRow headCellData={headCellData} />}
          maxWidth="100vw"
          rowComponent={(row, index) => (
            <TripsTableRow data={row} index={index} />
          )}
          rowData={formatTripData(data.data.data)}
        />
      ) : null}

      {data && !error && !isLoading && !data.data.data.length ? (
        <div>
          <p className="text-center pt-5">No Trips Data</p>
        </div>
      ) : null}

      {!data && isLoading ? (
        <div className="flex flex-col gap-4 items-center justify-center pt-5">
          <Loader size="medium" />
          <p>Fetching Trips...</p>
        </div>
      ) : null}

      {!data && error && !isLoading && (
        <div className="flex flex-col gap-4 items-center justify-center pt-5">
          <Button title="Reload Trips" onClick={() => refetch()} />
          <p>Oops! Error fetching trips</p>
        </div>
      )}
    </>
  );
};

export default TripOrdersTable;
