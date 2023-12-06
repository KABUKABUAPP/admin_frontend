import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";
import SearchBar from "@/components/common/SearchBar";
import MessageList from "@/components/modules/messages/MessageView";
import Card from "@/components/common/Card";
import MessageView from "@/components/modules/messages/MessageView";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";

const Messages: NextPage = () => {
  const router = useRouter();

  const { userPermissions } = useUserPermissions();

  const messagesMock = [
    {
      title: 'Christmas is here 1',
      created: 'Jan 1 2023 at 2:30pm',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      sendDetails: 'Sent by Napoleon to Bonaparte'
    },
    {
      title: 'Christmas is here 2',
      created: 'Jan 2 2023 at 2:30pm',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      sendDetails: 'Sent by Napoleon to Bonaparte'
    },
    {
      title: 'Christmas is here 3',
      created: 'Jan 3 2023 at 2:30pm',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      sendDetails: 'Sent by Napoleon to Bonaparte'
    },
    {
      title: 'Christmas is here 4',
      created: 'Jan 4 2023 at 2:30pm',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      sendDetails: 'Sent by Napoleon to Bonaparte'
    },
    {
      title: 'Christmas is here 5',
      created: 'Jan 5 2023 at 2:30pm',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      sendDetails: 'Sent by Napoleon to Bonaparte'
    }
  ]

  return (
    <>
    <AppHead title="Kabukabu | Messages" />
    <AppLayout>
      <div className="flex justify-between mb-5">
        <p className="text-lg font-bold">Messages{`(${messagesMock.length})`}</p>
        <Button
          title="New Message"
          startIcon={<AddIcon />}
          onClick={() => router.push(`/messages/new`)}
        />
      </div>
      
      <div className="flex">
        <MessageView messages={messagesMock} />
      </div>
    </AppLayout>
    </>
  );
};

export default Messages;
