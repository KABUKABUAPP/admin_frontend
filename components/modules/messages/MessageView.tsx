import React, { useState, FC } from "react";

import { useRouter } from "next/router";
import useUserPermissions from "@/hooks/useUserPermissions";
import SearchBar from "@/components/common/SearchBar";
import Card from "@/components/common/Card";
import useClickOutside from "@/hooks/useClickOutside";
import EmptyMessage from "@/components/ui/EmptyMsg";
import CloseIcon from "@/components/icons/CloseIcon";

interface Props {
    messages?: any;
}

const MessageView: FC<Props> = ({messages}) => {
  const router = useRouter();
  const [oneMessage, setOneMessage] = useState<any | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [messageType, setMessageType] = useState('instant');
  const [messageText, setMessageText] = useState('Instant');
  const [messageView, setMessageView] = useState(true);
  const instantBold = messageView ? 'font-bold' : '';
  const scheduledBold = !messageView ? 'font-bold' : '';

  const { userPermissions } = useUserPermissions();
  //const ref = useClickOutside<HTMLDivElement>(() => setOneMessage(null));

  const handleSearch = async (a: string) => {
    setSearchValue(a);
    console.log(a);
  }

  return (
    <>
        <div className="w-2/5 mr-3">
          <Card bg="#FFF" rounded="rounded-md">
            <div className="text-md flex mb-3">
                <p className={`cursor-pointer mr-5 ${instantBold}`} onClick={() => {
                    setMessageView(true);
                    setMessageText('Instant')
                    setMessageType('instant')
                }}>Instant</p>
                <p>|</p>
                <p className={`cursor-pointer ml-5 ${scheduledBold}`} onClick={() => {
                    setMessageView(false);
                    setMessageText('Scheduled')
                    setMessageType('scheduled')
                }}>Scheduled</p>
            </div>
            <SearchBar
                searchValue={searchValue}
                handleSearch={(val) => handleSearch(val)}
            />
            {messages && messages.map((message: any) => (
                <div className="mt-3 mb-3 cursor-pointer" onClick={() => setOneMessage(message)}>
                    <Card rounded="rounded-md" bg="#F8F8F8">
                        <div className="flex justify-between">
                            <p className="font-bold text-sm">{message.title}</p>
                            <p className="text-[#9A9A9A] text-sm">{message.created}</p>
                        </div>
                        <div className="flex mt-3 mb-3">
                            <div className="text-sm">{message.body.length > 100 ? `${message.body.substr(0, 100)}...` : message.body}</div>
                        </div>
                        <div className="flex">
                            <div className="text-[#9A9A9A] text-sm">{message.sendDetails}</div>
                        </div>
                    </Card>
                </div>
            ))}
          </Card>
        </div>
        <div className="w-3/5 ml-3">
          <Card bg="#FFF" rounded="rounded-md" height="80vh">
            {
                !oneMessage &&
                <div className="mt-8 mb-8 flex justify-center items-center">
                    <div>
                        <EmptyMessage />
                        <p className="flex justify-center items-center">No messages selected</p>
                    </div>
                </div>
            }
            {
                oneMessage &&
                <div className="py-6">
                    <div className="flex justify-end w-[full] mb-6">
                        <div className="w-1/10 flex cursor-pointer" onClick={() => setOneMessage(null)}><CloseIcon /></div>
                    </div>
                    <div className="flex justify-between mb-8">
                        <p className="text-lg font-bold">{oneMessage.title}</p>
                        <div>
                            <p className="text-[#9A9A9A] text-sm">{oneMessage.created}</p>
                            <p className="text-[#9A9A9A] text-sm">{oneMessage.sendDetails}</p>
                        </div>
                    </div>
                    <div>
                        {oneMessage.body}
                    </div>
                    
                </div>
            }
          </Card>
        </div>
    </>
  );
};

export default MessageView;
