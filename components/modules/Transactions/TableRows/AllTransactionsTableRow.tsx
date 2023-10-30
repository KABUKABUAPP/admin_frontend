import React, { FC } from "react";
import Button from "@/components/ui/Button/Button";
import { TransactionsDataModel } from "@/models/Transactions";
import Receipt from "../Receipt";
import { useModalContext } from "@/contexts/ModalContext";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  data?: TransactionsDataModel;
}

const AllTransactionsTableRow: FC<Props> = ({ data }) => {
  const { setModalContent } = useModalContext();

  return (
    <div className="flex p-3 py-6 gap-6 border-b border-b[#E6E6E6]">
      <div style={{ flex: 1 }} className="flex cursor-pointer">
        <p className="text-xs font-bold">{data?.transactionId}</p>
      </div>

      <div style={{ flex: 2 }}>
        <p className="text-xs font-bold">{data?.user}</p>
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

      <div style={{ flex: 2 }} className="flex">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(data?.name)}</p>
        {/* <Button
          title="View Receipt"
          onClick={() => {
            setModalContent(
              <Receipt handleClose={() => setModalContent(null)} />
            );
          }}
        /> */}
      </div>
    </div>
  );
};

export default AllTransactionsTableRow;
