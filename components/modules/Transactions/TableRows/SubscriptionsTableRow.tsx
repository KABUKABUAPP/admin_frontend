import React, { FC } from "react";
import Button from "@/components/ui/Button/Button";
import { TransactionsDataModel } from "@/models/Transactions";
import Receipt from "../Receipt";
import TransactionCard from "../TransactionCard";
import { useModalContext } from "@/contexts/ModalContext";

interface Props {
  data?: any;
}

const SubscriptionsTableRow: FC<Props> = ({ data }) => {
  const { setModalContent } = useModalContext();

  return (
    <div className="flex p-3 py-6 items-center gap-6 border-b border-b[#E6E6E6] cursor-pointer" onClick={() => {
      setModalContent(
        <TransactionCard narrationId={data?.tripId} narration={data?.narration} id={data?.transactionId} theModalData={data} handleClose={() => setModalContent(null)} />
      );
    }}>
      <div style={{ flex: 1 }} className="flex items-center cursor-pointer">
        <p className="text-xs font-bold">{data?.transactionId}</p>
      </div>

      <div style={{ flex: 2 }}>
        <p className="text-xs font-bold">{data?.name}</p>
      </div>

      <div style={{ flex: 1 }}>
        <p className="text-xs font-bold">{data?.type}</p>
      </div>

      <div style={{ flex: 1 }} className="flex flex-col gap-3 justify-center">
        <p className="text-xs font-bold">{data?.narration}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{data?.price.toLocaleLowerCase()}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{data?.date && new Date(data.date).toDateString()}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{data?.status && data?.status}</p>
      </div>
    </div>
  );
};

export default SubscriptionsTableRow;
