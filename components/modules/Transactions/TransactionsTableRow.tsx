import React, { FC } from "react";
import OriginDestinationCell from "@/components/common/OriginDestinationCell";
import Button from "@/components/ui/Button/Button";
import RiderDriverCell from "./RiderDriverCell";

interface Props {
  data: {
    transactionId: string;
    origin: string;
    destination: string;
    riderName: string;
    driverName: string;
    carModel: string;
    plateNumber: string;
    status: string;
    price: number;
  };
}

const TransactionsTableRow: FC<Props> = ({
  data: {
    transactionId,
    origin,
    destination,
    riderName,
    driverName,
    carModel,
    plateNumber,
    status,
    price,
  },
}) => {
  return (
    <div className="flex p-3 gap-6 border-b border-b[#E6E6E6]">
      <div style={{ flex: 1 }} className="flex items-center cursor-pointer">
        <p className="text-xs font-bold">{transactionId}</p>
      </div>

      <div style={{ flex: 2 }}>
        <OriginDestinationCell origin={origin} destination={destination} />
      </div>

      <div style={{ flex: 1 }}>
        <RiderDriverCell rider={riderName} driver={driverName} />
      </div>

      <div style={{ flex: 1 }} className="flex flex-col gap-3 justify-center">
        <p className="text-xs font-bold">{carModel}</p>
        <p className="text-xs font-bold">{plateNumber}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{status}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">N{price.toLocaleString()}</p>
      </div>

      <div style={{ flex: 2 }} className="flex items-center">
        <Button title="View Receipt" />
      </div>
    </div>
  );
};

export default TransactionsTableRow;
