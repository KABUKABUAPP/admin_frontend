import React from "react";
import { NextPage } from "next";

import AppLayout from "@/layouts/AppLayout";
import TripsOptionBar from "@/components/modules/Trips/TripsOptionBar";
import { TripsOptionsBarData } from "@/constants";
import TripsSearchFilterBar from "@/components/modules/Trips/TripsSearchFilterBar";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";

import TripsTableHeadRow from "@/components/modules/Trips/TripsTableHeadRow";
import TripsTableRow from "@/components/modules/Trips/TripsTableRow";

const rowData = [
  {
    id: '12344',
    origin: '23, Kuvuki Land, Igando',
    destination: 'Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando',
    rider: 'John Doe',
    driver: 'Emeka Anyawu',
    carModel: 'Toyota Corolla 2020, Black',
    plateNumber: 'ABC123XYS',
    status: 'Looking for Driver'
  },
  {
    id: '123444',
    origin: '23, Kuvuki Land, Igando',
    destination: 'Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando',
    rider: 'John Doe',
    driver: 'Emeka Anyawu',
    carModel: 'Toyota Corolla 2020, Black',
    plateNumber: 'ABC123XYS',
    status: 'Looking for Driver'
  },
  {
    id: '123443',
    origin: '23, Kuvuki Land, Igando',
    destination: 'Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando',
    rider: 'John Doe',
    driver: 'Emeka Anyawu',
    carModel: 'Toyota Corolla 2020, Black',
    plateNumber: 'ABC123XYS',
    status: 'Looking for Driver'
  },
  {
    id: '123442',
    origin: '23, Kuvuki Land, Igando',
    destination: 'Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando',
    rider: 'John Doe',
    driver: 'Emeka Anyawu',
    carModel: 'Toyota Corolla 2020, Black',
    plateNumber: 'ABC123XYS',
    status: 'Looking for Driver'
  },
  {
    id: '123414',
    origin: '23, Kuvuki Land, Igando',
    destination: 'Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando',
    rider: 'John Doe',
    driver: 'Emeka Anyawu',
    carModel: 'Toyota Corolla 2020, Black',
    plateNumber: 'ABC123XYS',
    status: 'Looking for Driver'
  },
]

const Trips: NextPage = () => {
  return (
    <AppLayout>
      <TripsOptionBar options={TripsOptionsBarData} />
      <TripsSearchFilterBar />
      <EnhancedTable
        TableHeadComponent={<TripsTableHeadRow />}
        maxWidth="100vw"
        rowComponent={(row, index)=><TripsTableRow data={row} index={index}/>}
        rowData={rowData}
      />
    </AppLayout>
  );
};

export default Trips;
