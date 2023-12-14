import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";
import Card from "@/components/common/Card";
import ActionBar from "@/components/common/ActionBar";
import { useFormik, Form, FormikProvider } from "formik";
import TextField from "@/components/ui/Input/TextField/TextField";
import SelectField from "@/components/ui/Input/SelectField";
import Button from "@/components/ui/Button/Button";
import { toast } from "react-toastify";
import TextArea from "@/components/ui/Input/TextArea/TextArea";
import { useBroadcastMessageMutation } from "@/api-services/messageService";

function countWords(sentence: string) {
    // Using regex to split the sentence by spaces and count the number of elements in the resulting array
    const wordsArray = sentence.trim().split(/\s+/);
    return wordsArray.length;
}

const initialValues = {
    message_type: "",
    audience: "",
    medium: "",
    subject: "",
    body: "",
    hours: "",
    minutes: "",
    scheduledDate: "",
    timePeriod: ""
};

const getFormattedTimeDate = (utcDate: any) => {
    const theDate = new Date(utcDate);
    const year = theDate.getFullYear();
    const month = String(theDate.getMonth() + 1).padStart(2, '0');
    const day = String(theDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${String(theDate.getHours()).padStart(2, '0')}:${String(theDate.getMinutes()).padStart(2, '0')}`; //:${String(theDate.getSeconds()).padStart(2, '0')}`;
  
    return { formattedDate, formattedTime }
}

const Messages: NextPage = () => {
  const router = useRouter();
  const [messageBody, setMessageBody] = useState('')
  const [messageTypeState, setMessageTypeState] = useState('instant')
  const [dateTimeValue, setDateTimeValue] = useState(new Date());

  const { userPermissions } = useUserPermissions();
  
  const [broadcastMessage, { isLoading, isError, isSuccess, error }] =
    useBroadcastMessageMutation();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
        values.body = messageBody;
        values.message_type = messageTypeState;

        if (values.timePeriod === 'pm') {
            values.hours = (parseInt(values.hours) + 12).toString();
        }

        const theDateTime = new Date()

        const theMessage = {
            subject: values.subject,
            content: values.body,
            audience: values.audience,
            type: values.message_type,
            medium: values.medium,
            scheduled_day: values.message_type === 'instant' ? getFormattedTimeDate(theDateTime.toISOString()).formattedDate : values.scheduledDate,
            scheduled_time: values.message_type === 'instant' ? getFormattedTimeDate(theDateTime.toISOString()).formattedTime : `${values.hours}:${values.minutes}`
        }

        broadcastMessage(theMessage)
    }
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Messages broadcasted successfully");
      window.location.href = "/messages";
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error) {
        toast.error('Error encountered');
      }
      
    }
  }, [isError]);

  const messageType = [
    {
        label: 'Instant',
        value: 'instant'
    },
    {
        label: 'Scheduled',
        value: 'scheduled'
    }
  ]

  const messageAudience = [
    {
        label: 'Driver',
        value: 'driver'
    },
    {
        label: 'Rider',
        value: 'rider'
    }
  ]

  const messageMedium = [
    /*{
        label: 'Email',
        value: 'email'
    },*/
    {
        label: 'Push Notification',
        value: 'push_notification'
    }
  ]


  return (
    <>
    <AppHead title="Kabukabu | New Messages" />
    <AppLayout>
        <ActionBar 
            handleBack={() => router.push(`/messages`)}
            backButtonText="Cancel"
        />
        <p className="text-lg font-bold mt-6">New Message</p>
        <FormikProvider value={formik}>
            <Form>
                <div className="flex mt-6 w-[100%]">
                    <div className="w-2/5 mr-3">
                        <Card bg="#FFF" rounded="rounded-md" height="60vh">
                            <div className="mt-3">
                            <SelectField
                                label="Message Type"
                                disabled={!messageType}
                                options={
                                !messageType
                                    ? []
                                    : messageType.map((i) => ({
                                        label: i.label,
                                        value: i.value,
                                    }))
                                }
                                placeholder="Message Type"
                                {...formik.getFieldProps("message_type")}
                                error={formik.touched.message_type ? formik.errors.message_type : undefined}
                                value={messageTypeState}
                                onChange={(e) => {
                                    setMessageTypeState(e.target.value)
                                }}
                            />
                            </div>
                            
                            {
                                messageTypeState === 'scheduled' &&
                                <>
                                    <div className="mt-3 flex">
                                        <div className="w-3/6 px-2">
                                            <TextField
                                                label="Scheduled Date"
                                                type="date"
                                                {...formik.getFieldProps("scheduledDate")}
                                                error={
                                                formik.touched.scheduledDate ? formik.errors.scheduledDate : undefined
                                                }
                                            />
                                        </div>
                                        <div className="w-1/6 px-2">
                                            <TextField
                                                label="Hours"
                                                placeholder="Hours here"
                                                {...formik.getFieldProps("hours")}
                                                error={
                                                formik.touched.hours ? formik.errors.hours : undefined
                                                }
                                            />
                                        </div>
                                        <div className="w-1/6 px-2">
                                            <TextField
                                                label="Minutes"
                                                placeholder="Minutes here"
                                                {...formik.getFieldProps("minutes")}
                                                error={
                                                formik.touched.minutes ? formik.errors.minutes : undefined
                                                }
                                            />
                                        </div>
                                        <div className="w-1/6 px-2">
                                            <SelectField
                                                label="AM/PM"
                                                disabled={false}
                                                options={[
                                                    {
                                                        label: 'AM',
                                                        value: 'am',
                                                    },
                                                    {
                                                        label: 'PM',
                                                        value: 'pm',
                                                    }
                                                ]}
                                                placeholder="AM/PM"
                                                {...formik.getFieldProps("timePeriod")}
                                                error={formik.touched.timePeriod ? formik.errors.timePeriod : undefined}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-1 flex justify-end">
                                        <p className="text-xs"><small>Time should be entered in 12hr format</small></p>
                                    </div>
                                </>
                            }

                            <div className="mt-3">
                            <SelectField
                                label="Audience"
                                disabled={!messageAudience}
                                options={
                                !messageAudience
                                    ? []
                                    : messageAudience.map((i) => ({
                                        label: i.label,
                                        value: i.value,
                                    }))
                                }
                                placeholder="Audience"
                                {...formik.getFieldProps("audience")}
                                error={formik.touched.audience ? formik.errors.audience : undefined}
                            />
                            </div>
                            
                            <div className="mt-3">
                            <SelectField
                                label="Medium"
                                disabled={!messageMedium}
                                options={
                                !messageMedium
                                    ? []
                                    : messageMedium.map((i) => ({
                                        label: i.label,
                                        value: i.value,
                                    }))
                                }
                                placeholder="Message Medium"
                                {...formik.getFieldProps("medium")}
                                error={formik.touched.medium ? formik.errors.medium : undefined}
                            />
                            </div>
                        </Card>
                    </div>
                    <div className="w-3/5 ml-3">
                        <Card bg="#FFF" rounded="rounded-md" height="60vh">
                            <div className="mt-3">
                            <TextField
                                label="Subject"
                                placeholder="Subject here"
                                {...formik.getFieldProps("subject")}
                                error={
                                formik.touched.subject ? formik.errors.subject : undefined
                                }
                            />
                            </div>

                            <div className="mt-3">
                            <textarea  
                                id="" 
                                cols={85} 
                                rows={5} 
                                placeholder="Content here" 
                                className="text-sm pt-2 pl-2 bg-[#F1F1F1] w-[100%]"
                                {...formik.getFieldProps("body")}
                                //error={
                                //formik.touched.body ? formik.errors.body : undefined
                                //}
                                maxLength={100}
                                value={messageBody}
                                onChange={(e) => {
                                    setMessageBody(e.target.value);
                                }}>
                            </textarea>
                            </div>
                            <p className="text-sm font-bold">Word Count: {messageBody.length}/100</p>

                            <div className="flex justify-end">
                                <Button
                                    title="Send Message"
                                    className="!text-[16px] mt-6"
                                    size="large"
                                    type="submit"
                                    disabled={isLoading}
                                    loading={isLoading}
                                />
                            </div>
                            
                        </Card>
                    </div>
                </div>
            </Form>
        </FormikProvider>
    </AppLayout>
    </>
  );
};

export default Messages;
