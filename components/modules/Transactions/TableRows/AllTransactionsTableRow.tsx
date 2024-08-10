import React, { FC } from "react";
import Button from "@/components/ui/Button/Button";
import { TransactionsDataModel } from "@/models/Transactions";
import Receipt from "../Receipt";
import { useModalContext } from "@/contexts/ModalContext";
import { capitalizeAllFirstLetters } from "@/utils";
import TransactionCard from "../TransactionCard";

interface Props {
  data?: any;
}

const AllTransactionsTableRow: FC<Props> = ({ data }) => {
  const { setModalContent } = useModalContext();

  return (
    <div className="flex p-3 py-6 gap-6 border-b border-b[#E6E6E6] cursor-pointer" onClick={() => {
      setModalContent(
        data?.narration === 'TRIP_PAYMENT' ? <Receipt narrationId={data?.tripId} narration={data?.narration} id={data?.transactionId} handleClose={() => setModalContent(null)} /> : <TransactionCard narrationId={data?.tripId} narration={data?.narration} id={data?.transactionId} theModalData={data} handleClose={() => setModalContent(null)} />
      );
    }}>
      <div style={{ flex: 1 }} className="flex cursor-pointer">
        <p className="text-xs font-bold">{data?.transactionId}</p>
      </div>

      <div style={{ flex: 2 }}>
        <p className="text-xs font-bold">{data?.name}</p>
      </div>

      <div style={{ flex: 1 }}>
        <p className="text-xs font-bold">{data?.type}</p>
      </div>

      <div style={{ flex: 2 }} className="flex flex-col gap-3">
        <p className="text-xs font-bold">{data?.narration}</p>
      </div>

      <div style={{ flex: 1 }} className="flex">
        <p className="text-xs font-bold">{data?.price.toLocaleLowerCase()}</p>
      </div>

      <div style={{ flex: 1 }} className="flex">
        <p className="text-xs font-bold">{data?.date && new Date(data.date).toDateString()}</p>
      </div>

      <div style={{ flex: 1 }} className="flex">
        <p className="text-xs font-bold">{data?.status && data?.status}</p>
      </div>
    </div>
  );
};

export default AllTransactionsTableRow;
