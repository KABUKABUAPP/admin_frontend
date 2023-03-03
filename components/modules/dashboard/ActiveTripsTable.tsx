import React, { FC } from "react";

import ActiveTripsTableHead from "./ActiveTripsTableHead";
import ActiveTripsTableBody from "./ActiveTripsTableBody";

const mockData = [
  {
    from: "Lekki",
    to: "Maryland Mall",
    rider: "Michael Ofure",
    driver: "Sam Johnson",
  },
  {
    from: "Lekki",
    to: "Maryland Mall",
    rider: "Michael Ofure",
    driver: "Sam Johnson",
  },
  {
    from: "Lekki",
    to: "Maryland Mall",
    rider: "Michael Ofure",
    driver: "Sam Johnson",
  },
  {
    from: "Lekki",
    to: "Maryland Mall",
    rider: "Michael Ofure",
    driver: "Sam Johnson",
  },
];

const ActiveTripsTable: FC = () => {
  return (
    <div className="w-full  max-w-2xl mx-auto">
      <ActiveTripsTableHead />
      <ActiveTripsTableBody data={mockData}/>
    </div>
  );
};

export default ActiveTripsTable;
