import React, { FC } from "react";
import Button from "@/components/ui/Button/Button";
import { TransactionsDataModel } from "@/models/Transactions";
import Receipt from "../Receipt";
import { useModalContext } from "@/contexts/ModalContext";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  data?: any;
}

const UsersWalletTableRow: FC<Props> = ({ data }) => {
  const { setModalContent } = useModalContext();

  return (
    <div className="flex p-3 py-6 items-center gap-6 border-b border-b[#E6E6E6] cursor-pointer" onClick={() => {}}>
      <div style={{ flex: 2 }} className="flex items-center cursor-pointer">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(data?.full_name)}</p>
      </div>

      <div style={{ flex: 2 }}>
        <p className="text-xs font-bold">{data?.email}</p>
      </div>

      <div style={{ flex: 1 }}>
        <p className="text-xs font-bold">{data?.type}</p>
      </div>

      <div style={{ flex: 1 }} className="flex flex-col gap-3 justify-center">
        <p className="text-xs font-bold">{data?.current_balance}</p>
      </div>
    </div>
  );
};

export default UsersWalletTableRow;
