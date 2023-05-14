import React, { FC } from "react";
import OriginDestinationCell from "@/components/common/OriginDestinationCell";
import Button from "@/components/ui/Button/Button";
import RiderDriverCell from "./RiderDriverCell";
import { TransactionsDataModel } from "@/models/Transactions";
import Receipt from "./Receipt";
import { useModalContext } from "@/contexts/ModalContext";

interface Props {
  data?: TransactionsDataModel;
}

const TransactionsTableRow: FC<Props> = ({ data }) => {
  const { setModalContent } = useModalContext();

  return (
    <div className="flex p-3 gap-6 border-b border-b[#E6E6E6]">
      <div style={{ flex: 2 }} className="flex items-center cursor-pointer">
        <p className="text-xs font-bold">{data?.transactionId}</p>
      </div>

      <div style={{ flex: 2 }}>
        {data?.destination && (
          <OriginDestinationCell
            origin={data.origin}
            destination={data?.destination}
          />
        )}
      </div>

      <div style={{ flex: 1 }}>
        {data?.riderName && data.driverName && (
          <RiderDriverCell rider={data?.riderName} driver={data?.driverName} />
        )}
      </div>

      <div style={{ flex: 1 }} className="flex flex-col gap-3 justify-center">
        <p className="text-xs font-bold">{data?.carModel}</p>
        <p className="text-xs font-bold">{data?.plateNumber}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{data?.status}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">₦{data?.price.toLocaleString()}</p>
      </div>

      <div style={{ flex: 2 }} className="flex items-center">
        <Button
          title="View Receipt"
          onClick={() => {
            setModalContent(
              <Receipt handleClose={() => setModalContent(null)} />
            );
          }}
        />
      </div>
    </div>
  );
};

export default TransactionsTableRow;
