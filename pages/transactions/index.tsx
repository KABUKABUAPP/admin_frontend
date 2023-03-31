import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import AccountBalanceCardContainer from "@/components/modules/Transactions/AccountBalanceCardContainer";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import TransactionsTable from "@/components/modules/Transactions/TransactionsTable";

const Transactions: NextPage = () => {
  const [accountCardData, setAccountCardData] = useState(mockData);
  const handleClickAccountCard = (title: string) => {
    const mutated = accountCardData.map((item) => {
      if (item.title === title) return { ...item, isActive: true };
      return { ...item, isActive: false };
    });
    
    setAccountCardData(mutated)
  };

  return (
    <AppLayout>
      <AccountBalanceCardContainer
        data={accountCardData}
        handleClick={(title) => handleClickAccountCard(title)}
      />
      <SearchFilterBar />
      <TransactionsTable />
    </AppLayout>
  );
};

export default Transactions;

const mockData = [
  {
    title: "Total Transactions",
    amount: 100000000,
    isActive: true,
  },
  {
    title: "Money in escrow",
    amount: 100000000,
    isActive: false,
  },
  {
    title: "Active trip",
    amount: 100000000,
    isActive: false,
  },
  {
    title: "Net income",
    amount: 100000000,
    isActive: false,
  },
];
