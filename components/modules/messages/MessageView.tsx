import React, { useState, FC } from "react";

import SearchBar from "@/components/common/SearchBar";
import Card from "@/components/common/Card";
import EmptyMessage from "@/components/ui/EmptyMsg";
import CloseIcon from "@/components/icons/CloseIcon";
import {
  useGetAllBroadcastsQuery,
  useGetAllContactUsInquiriesQuery,
  useViewContactUsInquiryQuery,
} from "@/api-services/messageService";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/ui/Loader/Loader";
import { capitalizeAllFirstLetters } from "@/utils";
import { useGetAllEmailBroadcastsQuery } from "@/api-services/emailService";

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
  const [oneMessage, setOneMessage] = useState<any | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [messageViewUi, setMessageViewUi] = useState('push-notifications');
  const [messageType, setMessageType] = useState('instant');
  const [pageLimit, setPageLimit] = useState(5)
  const [pageNumber, setPageNumber] = useState(1)
  const instantBold = messageViewUi === 'push-notifications' && messageType === 'instant' ? 'font-bold' : '';
  const scheduledBold = messageViewUi === 'push-notifications' && messageType === 'scheduled' ? 'font-bold' : '';
  const emailBold = messageViewUi === 'emails' ? 'font-bold' : '';
  const inquiriesBold = messageViewUi === 'inquiries' ? 'font-bold' : '';

  const { data: messages, isLoading, isError, refetch } = useGetAllBroadcastsQuery(
    { limit: pageLimit, page: pageNumber, type: messageType },
    { skip: messageViewUi !== 'push-notifications' }
  );

  const { data: emails, isLoading: emailsLoading, isError: emailsIsError, refetch: errorsRefetch } = useGetAllEmailBroadcastsQuery(
    { limit: pageLimit, page: pageNumber },
    { skip: messageViewUi !== 'emails' }
  );

  const { data: inquiries, isLoading: inquiriesLoading } = useGetAllContactUsInquiriesQuery(
    { limit: pageLimit, page: pageNumber },
    { skip: messageViewUi !== 'inquiries' }
  );

  const inquiryId =
    messageViewUi === 'inquiries'
      ? String(oneMessage?._id || oneMessage?.id || '')
      : '';

  const {
    data: selectedInquiry,
    isLoading: inquiryDetailsLoading,
  } = useViewContactUsInquiryQuery(
    { id: inquiryId },
    { skip: !inquiryId }
  );

  const handleSearch = async (a: string) => {
    setSearchValue(a);
  }

  const switchTab = (tab: 'push-notifications' | 'emails' | 'inquiries', type?: 'instant' | 'scheduled') => {
    setOneMessage(null);
    setPageNumber(1);
    setMessageViewUi(tab);
    if (type) {
      setMessageType(type);
    }
  };

  const filteredMessages = messages?.data?.filter((message: any) => {
    if (!searchValue.trim()) return true;

    const value = searchValue.toLowerCase();
    return (
      String(message?.subject || '').toLowerCase().includes(value) ||
      String(message?.content || '').toLowerCase().includes(value) ||
      String(message?.audience || '').toLowerCase().includes(value)
    );
  });

  const filteredEmails = emails?.data?.rows?.filter((message: any) => {
    if (!searchValue.trim()) return true;

    const value = searchValue.toLowerCase();
    return (
      String(message?.subject || '').toLowerCase().includes(value) ||
      String(message?.html_text || '').toLowerCase().includes(value) ||
      String(message?.receipient_type || '').toLowerCase().includes(value)
    );
  });

  const filteredInquiries = inquiries?.data?.filter((inquiry: any) => {
    if (!searchValue.trim()) return true;

    const value = searchValue.toLowerCase();
    return (
      String(inquiry?.fullname || '').toLowerCase().includes(value) ||
      String(inquiry?.email || '').toLowerCase().includes(value) ||
      String(inquiry?.message || '').toLowerCase().includes(value)
    );
  });

  return (
    <>
        <div className="lg:w-2/5 md:w-full mx-2 mt-3">
          <Card bg="#FFF" rounded="rounded-md">
            <div className="text-md flex mb-3">
                <p className={`cursor-pointer mr-5 ${instantBold}`} onClick={() => switchTab('push-notifications', 'instant')}>Instant</p>
                <p>|</p>
                <p className={`cursor-pointer mr-5 ml-5 ${scheduledBold}`} onClick={() => switchTab('push-notifications', 'scheduled')}>Scheduled</p>
                <p>|</p>
                <p className={`cursor-pointer mr-5 ml-5 ${emailBold}`} onClick={() => switchTab('emails')}>Emails</p>
                <p>|</p>
                <p className={`cursor-pointer ml-5 ${inquiriesBold}`} onClick={() => switchTab('inquiries')}>Inquires</p>
            </div>
            <SearchBar
                searchValue={searchValue}
                handleSearch={(val) => handleSearch(val)}
            />
            {
                messageViewUi === 'push-notifications' && 
                <>
                {
                    messages && filteredMessages?.length === 0 && 
                    <p>No broadcasted messages</p>
                }
                {
                    isLoading &&
                    <Loader />
                }
                {filteredMessages && filteredMessages.map((message: any) => (
                    <div className={`mt-3 mb-3 cursor-pointer`} onClick={() => setOneMessage(message)}>
                        <Card rounded="rounded-md" bg="#F8F8F8" border={oneMessage === message ? 'border border-solid border-customYellow' : ''}>
                            <div className="flex justify-between">
                                <p className="font-bold text-sm">{message.subject}</p>
                                <p className="text-[#9A9A9A] text-sm">{getFormattedTimeDate(message.createdAt).formattedDate} at {getFormattedTimeDate(message.createdAt).formattedTime}</p>
                            </div>
                            <div className="flex mt-3 mb-3">
                                <div className="text-sm">{message.content.length > 100 ? `${message.content.slice(0, 100)}...` : message.content}</div>
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
                <div className="w-full">
                    {messages && (
                    <Pagination
                        className="pagination-bar"
                        currentPage={pageNumber}
                        totalCount={messages?.pagination.totalCount}
                        pageSize={pageLimit}
                        onPageChange={(page) => setPageNumber(page)}
                    />
                    )}
                </div>
                </>
            }
            {
                messageViewUi === 'emails' &&
                <>
                {
                    emails && filteredEmails?.length === 0 && 
                    <p>No broadcasted messages</p>
                }
                {
                    emailsLoading &&
                    <Loader />
                }
                {filteredEmails && filteredEmails.map((message: any) => (
                    <div className={`mt-3 mb-3 cursor-pointer`} onClick={() => setOneMessage(message)}>
                        <Card rounded="rounded-md" bg="#F8F8F8" border={oneMessage === message ? 'border border-solid border-customYellow' : ''}>
                            <div className="flex justify-between">
                                <p className="font-bold text-sm">{message.subject}</p>
                                <p className="text-[#9A9A9A] text-sm">{getFormattedTimeDate(message.createdAt).formattedDate} at {getFormattedTimeDate(message.createdAt).formattedTime}</p>
                            </div>
                            <div className="flex mt-3 mb-3">
                                <div id="email-content-body" dangerouslySetInnerHTML={{__html: `${message.html_text.length > 100 ? `${message.html_text.slice(0, 100)}...` : message.html_text}`}} />
                            </div>
                            <div className="flex">
                                <div className="text-[#9A9A9A] text-sm">Audience: {capitalizeAllFirstLetters(message.receipient_type)}</div>
                            </div>
                            <div className="flex">
                                <div className="text-[#9A9A9A] text-sm">Total Recipients: {message.number_of_receipients}</div>
                            </div>
                        </Card>
                    </div>
                ))}
                <div className="w-full">
                    {emails && (
                    <Pagination
                        className="pagination-bar"
                        currentPage={pageNumber}
                        totalCount={emails?.total}
                        pageSize={pageLimit}
                        onPageChange={(page) => setPageNumber(page)}
                    />
                    )}
                </div>
                </>
            }
            {
                messageViewUi === 'inquiries' &&
                <>
                {
                    inquiries && filteredInquiries?.length === 0 &&
                    <p>No inquiries found</p>
                }
                {
                    inquiriesLoading &&
                    <Loader />
                }
                {filteredInquiries && filteredInquiries.map((inquiry: any) => (
                    <div className={`mt-3 mb-3 cursor-pointer`} onClick={() => setOneMessage(inquiry)}>
                        <Card rounded="rounded-md" bg="#F8F8F8" border={oneMessage === inquiry ? 'border border-solid border-customYellow' : ''}>
                            <div className="flex justify-between gap-4">
                                <p className="font-bold text-sm">{capitalizeAllFirstLetters(inquiry.fullname)}</p>
                                <p className="text-[#9A9A9A] text-sm">{getFormattedTimeDate(inquiry.createdAt).formattedDate} at {getFormattedTimeDate(inquiry.createdAt).formattedTime}</p>
                            </div>
                            <div className="flex mt-3 mb-3">
                                <div className="text-sm">{inquiry.message.length > 100 ? `${inquiry.message.slice(0, 100)}...` : inquiry.message}</div>
                            </div>
                            <div className="flex">
                                <div className="text-[#9A9A9A] text-sm">Email: {inquiry.email}</div>
                            </div>
                            <div className="flex">
                                <div className="text-[#9A9A9A] text-sm">Inquiry ID: {inquiry.id || inquiry._id}</div>
                            </div>
                        </Card>
                    </div>
                ))}
                <div className="w-full">
                    {inquiries && (
                    <Pagination
                        className="pagination-bar"
                        currentPage={pageNumber}
                        totalCount={inquiries?.pagination.totalCount}
                        pageSize={pageLimit}
                        onPageChange={(page) => setPageNumber(page)}
                    />
                    )}
                </div>
                </>
            }
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
                oneMessage && messageViewUi === 'push-notifications' &&
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
            {
                oneMessage && messageViewUi === 'emails' &&
                <div className="py-6">
                    <div className="flex justify-end w-[full] mb-6">
                        <div className="w-1/10 flex cursor-pointer" onClick={() => setOneMessage(null)}><CloseIcon /></div>
                    </div>
                    <div className="flex justify-between mb-8">
                        <p className="text-lg font-bold">{oneMessage.subject}</p>
                        <div>
                            <p className="text-[#9A9A9A] text-sm">{getFormattedTimeDate(oneMessage.createdAt).formattedDate} at {getFormattedTimeDate(oneMessage.createdAt).formattedTime}</p>
                            <p className="text-[#9A9A9A] text-sm">Audience: {capitalizeAllFirstLetters(oneMessage.receipient_type)}</p>
                        </div>
                    </div>
                    <div>
                    <div id="email-content-body" dangerouslySetInnerHTML={{__html: `${oneMessage.html_text}`}} />
                    </div>
                </div>
            }
            {
                oneMessage && messageViewUi === 'inquiries' &&
                <div className="py-6">
                    <div className="flex justify-end w-[full] mb-6">
                        <div className="w-1/10 flex cursor-pointer" onClick={() => setOneMessage(null)}><CloseIcon /></div>
                    </div>
                    {
                        inquiryDetailsLoading && !selectedInquiry &&
                        <Loader />
                    }
                    {
                        (!inquiryDetailsLoading || selectedInquiry) &&
                        <div>
                            <div className="flex justify-between mb-8 gap-4">
                                <p className="text-lg font-bold">{capitalizeAllFirstLetters((selectedInquiry || oneMessage).fullname)}</p>
                                <div>
                                    <p className="text-[#9A9A9A] text-sm">{getFormattedTimeDate((selectedInquiry || oneMessage).createdAt).formattedDate} at {getFormattedTimeDate((selectedInquiry || oneMessage).createdAt).formattedTime}</p>
                                    <p className="text-[#9A9A9A] text-sm">Email: {(selectedInquiry || oneMessage).email}</p>
                                </div>
                            </div>
                            <div>
                                {(selectedInquiry || oneMessage).message}
                            </div>
                        </div>
                    }
                </div>
            }
          </Card>
        </div>
    </>
  );
};

export default MessageView;
