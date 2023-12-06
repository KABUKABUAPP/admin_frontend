import { NextPage } from "next";
import React, { useState } from "react";

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

const initialValues = {
    message_type: "",
    audience: "",
    medium: "Push Notification",
    subject: "",
    body: ""
};

const Messages: NextPage = () => {
  const router = useRouter();
  const [messageBody, setMessageBody] = useState('')

  const { userPermissions } = useUserPermissions();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
        console.log(values)
    }
  });

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
                            />
                            
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

                            <TextField
                                label="Medium"
                                placeholder="Medium"
                                {...formik.getFieldProps("medium")}
                                error={
                                formik.touched.medium ? formik.errors.medium : undefined
                                }
                                disabled={true}
                            />
                        </Card>
                    </div>
                    <div className="w-3/5 ml-3">
                        <Card bg="#FFF" rounded="rounded-md" height="60vh">
                            <TextField
                                label="Subject"
                                placeholder="Subject here"
                                {...formik.getFieldProps("subject")}
                                error={
                                formik.touched.subject ? formik.errors.subject : undefined
                                }
                            />

                            <TextArea
                                label="Message"
                                placeholder="Message here"
                                {...formik.getFieldProps("body")}
                                error={
                                formik.touched.body ? formik.errors.body : undefined
                                }
                                value={messageBody}
                                onChange={(e) => {
                                    if (messageBody.length < 500) setMessageBody(e.target.value);
                                    if (messageBody.length >= 500) toast.error('Maximum allowed message body')
                                }}
                            />
                            <p className="text-sm font-bold">Word Count: {messageBody.length}/500</p>

                            <div className="flex justify-end">
                                <Button
                                    title="Send Message"
                                    className="!text-[16px] mt-6"
                                    size="large"
                                    type="submit"
                                    disabled={false}
                                    loading={false}
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
