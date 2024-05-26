import React, { useState, FC, useEffect } from "react";

import { useRouter } from "next/router";
import useUserPermissions from "@/hooks/useUserPermissions";
import SearchBar from "@/components/common/SearchBar";
import Card from "@/components/common/Card";
import useClickOutside from "@/hooks/useClickOutside";
import EmptyMessage from "@/components/ui/EmptyMsg";
import CloseIcon from "@/components/icons/CloseIcon";
import { useGetAllBroadcastsQuery } from "@/api-services/messageService";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/ui/Loader/Loader";
import { capitalizeAllFirstLetters } from "@/utils";

const getFormattedTimeDate = (utcDate: any) => {
    const theDate = new Date(utcDate);
    const year = theDate.getFullYear();
    const month = String(theDate.getMonth() + 1).padStart(2, '0');
    const day = String(theDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${String(theDate.getHours()).padStart(2, '0')}:${String(theDate.getMinutes()).padStart(2, '0')}`; //:${String(theDate.getSeconds()).padStart(2, '0')}`;
  
    return { formattedDate, formattedTime }
}

const MessageView: FC = () => {
  const router = useRouter();
  const [oneMessage, setOneMessage] = useState<any | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [messageType, setMessageType] = useState('instant');
  const [messageText, setMessageText] = useState('Instant');
  const [messageView, setMessageView] = useState(true);
  const [pageLimit, setPageLimit] = useState(5)
  const [pageNumber, setPageNumber] = useState(1)
  const instantBold = messageView ? 'font-bold' : '';
  const scheduledBold = !messageView ? 'font-bold' : '';

  const { userPermissions } = useUserPermissions();
  //const ref = useClickOutside<HTMLDivElement>(() => setOneMessage(null));

  const { data: messages, isLoading, isError, refetch } = useGetAllBroadcastsQuery(
    { limit: pageLimit, page: pageNumber, type: messageType }
  );

  const handleSearch = async (a: string) => {
    setSearchValue(a);
  }

  useEffect(() => {
    if (messages) console.log({messages})
  })

  return (
    <>
        <div className="lg:w-2/5 md:w-full mx-2 mt-3">
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
            {
                messages && messages?.data.length === 0 && 
                <p>No broadcasted messages</p>
            }
            {
                isLoading &&
                <Loader />
            }
            {messages && messages?.data.map((message: any) => (
                <div className={`mt-3 mb-3 cursor-pointer`} onClick={() => setOneMessage(message)}>
                    <Card rounded="rounded-md" bg="#F8F8F8" border={oneMessage === message ? 'border border-solid border-customYellow' : ''}>
                        <div className="flex justify-between">
                            <p className="font-bold text-sm">{message.subject}</p>
                            <p className="text-[#9A9A9A] text-sm">{getFormattedTimeDate(message.createdAt).formattedDate} at {getFormattedTimeDate(message.createdAt).formattedTime}</p>
                        </div>
                        <div className="flex mt-3 mb-3">
                            <div className="text-sm">{message.content.length > 100 ? `${message.content.substr(0, 100)}...` : message.content}</div>
                        </div>
                        <div className="flex">
                            <div className="text-[#9A9A9A] text-sm">Audience: {capitalizeAllFirstLetters(message.audience)}</div>
                        </div>
                        <div className="flex">
                            <div className="text-[#9A9A9A] text-sm">Total Recipients: {message.total_receipients}</div>
                        </div>
                    </Card>
                </div>
            ))}
            {messages && (
              <Pagination
                className="pagination-bar"
                currentPage={pageNumber}
                totalCount={messages?.pagination.totalCount}
                pageSize={pageLimit}
                onPageChange={(page) => setPageNumber(page)}
              />
            )}
          </Card>
        </div>
        <div className="lg:w-3/5 md:w-full mx-2 mt-3">
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
                        <p className="text-lg font-bold">{oneMessage.subject}</p>
                        <div>
                            <p className="text-[#9A9A9A] text-sm">{getFormattedTimeDate(oneMessage.createdAt).formattedDate} at {getFormattedTimeDate(oneMessage.createdAt).formattedTime}</p>
                            <p className="text-[#9A9A9A] text-sm">Audience: {capitalizeAllFirstLetters(oneMessage.audience)}</p>
                        </div>
                    </div>
                    <div>
                        {oneMessage.content}
                    </div>
                    
                </div>
            }
          </Card>
        </div>
    </>
  );
};

export default MessageView;
