import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";
import MessageView from "@/components/modules/messages/MessageView";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import { useGetAllBroadcastsQuery } from "@/api-services/messageService";

const Messages: NextPage = () => {
  const router = useRouter();
  const [messageType, setMessageType] = useState('instant');
  const [pageLimit, setPageLimit] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)

  const { userPermissions } = useUserPermissions();

  const { data, isLoading, isError, refetch } = useGetAllBroadcastsQuery(
    { limit: pageLimit, page: pageNumber, type: messageType }
  );



  return (
    <>
    <AppHead title="Kabukabu | Messages" />
    <AppLayout>
      <div className="flex justify-between mb-5">
        {data?.data && <p className="text-lg font-bold">Messages{`(${data?.pagination.totalCount})`}</p>}
        <Button
          title="New Message"
          startIcon={<AddIcon />}
          onClick={() => router.push(`/messages/new`)}
        />
      </div>
      
      <div className="flex flex-col md:flex-row">
        <MessageView />
      </div>
    </AppLayout>
    </>
  );
};

export default Messages;
