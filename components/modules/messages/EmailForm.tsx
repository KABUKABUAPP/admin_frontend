import { useBroadcastCustomEmailMutation } from '@/api-services/emailService';
import TimesIconRed from '@/components/icons/TimesIconRed';
import Button from '@/components/ui/Button/Button';
import SelectField from '@/components/ui/Input/SelectField';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { toast } from 'react-toastify';
import BlogPostEditor from '@/components/common/HtmlEditor';
import TextField from "@/components/ui/Input/TextField/TextField";

interface MediaFile {
  src: string;
  file: File;
}

const EmailForm: React.FC = () => {
  const [emailContent, setEmailContent] = useState<string>('');
  const [emailRecipient, setEmailRecipient] = useState<string>('');
  const [emails, setEmails] = useState<any>([]);
  const [subject, setSubject] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [mediaArray, setMediaArray] = useState<File[]>([]);

  const handleGetContent = (html: string) => {
    console.log(html)
    // This function receives the HTML content from the editor
    setEmailContent(html);
  };

  const [broadcastMessage, { isLoading, isError, isSuccess, error }] =
    useBroadcastCustomEmailMutation();

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEmailContent(e.target.value);
  };

  /*const handleMediaUpload = async (file: File) => {
    // Create a preview object for the uploaded file
    const mediaPreview = {
      src: URL.createObjectURL(file),
      file,
    };
  
    // Update the media arrays (for single file)
    setMediaArray((prevArray) => [...prevArray, file]); // Store the actual file
    setMedia((prevMedia) => [...prevMedia, mediaPreview]); // Store the preview URL

    let body = new FormData()
    body.set('key', '49f6872819f2b77a024f3a4326f29a56')
    body.append('image', file)

    let imageUploadOp = await axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: body
    })

    let url = imageUploadOp.data.data.display_url
  
    // Update the editor content with the media preview
    const mediaHtml = `
      <div className="flex justify-center items-center">
        <img
          src="${url}"
          alt="uploaded-media"
          className="w-full h-auto rounded-md shadow"
        />
      </div>
    `;
  
    // Append to the editor's content
    setEmailContent((prevContent) => prevContent + mediaHtml);
  };*/

  function createHtmlFile() {
    // Get the HTML content from the element
    const theContent = document.getElementById('email-content-body')?.outerHTML;
  
    if (!theContent) {
      console.error("No content found!");
      return null;
    }
  
    // Create a Blob object representing the HTML file
    const blob = new Blob([theContent], { type: 'text/html' });
  
    // Optionally, create a File object (if you want to assign a file name)
    const file = new File([blob], "email-content.html", { type: "text/html" });
  
    // Return the file object so it can be sent to the backend
    return file;
  }
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission, sending the email content along with the mediaArray
    const theEmailBody = createHtmlFile();
    var data = new FormData();
    data.append('subject', subject);
    if (emailRecipient === 'CUSTOM') {
        emails.forEach((mail: any, idx: number) => {
            data.append(`emails[${idx}]`, mail);
        })
    }
    if (theEmailBody) data.append('html', theEmailBody);
    mediaArray.forEach((media) => {
        data.append('attachments', media);
    })
    data.append('receipient_type', emailRecipient);
    broadcastMessage(data);
  };
  
  useEffect(() => {
    if (isSuccess) {
      toast.success("Messages broadcasted successfully");
      //window.location.href = "/messages";
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error) {
        toast.error('Error encountered');
      }
      
    }
  }, [isError]);

  const emailRecipientOptions = [
    {
        label: 'Driver',
        value: 'DRIVER'
    },
    {
        label: 'Rider',
        value: 'RIDER'
    },
    {
        label: 'Custom',
        value: 'CUSTOM'
    },
    {
        label: 'Sharp',
        value: 'SHARP'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col lg:flex-row lg:space-x-4 p-6 bg-gray-100">
      {/* Section 1: Email Form */}
      <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md mb-6 lg:mb-0">
        <h2 className="text-2xl font-bold mb-4">Compose Email</h2>
        <form className="space-y-4">
            <SelectField
                label="Recipient Type"
                disabled={false}
                options={emailRecipientOptions}
                placeholder="Recipient Type"
                value={emailRecipient}
                onChange={(e) => {
                    setEmailRecipient(e.target.value)
                }}
            />
            {
                emailRecipient === 'CUSTOM' &&
                <div>
                    <TextField
                      label="Recipient"
                      type='email'
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Recipient's Email"
                        onKeyDown={(event: any) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            setEmails([...emails, recipient]);
                            setRecipient('');
                          }
                        }}
                    />
                    <p className="text-xs">Press enter to add email to list</p>
                    {/*<input
                        type="email"
                        id="recipient"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                        className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Recipient's Email"
                        onKeyDown={(event: any) => {
                            if (event.key === 'Enter') {
                                setEmails([...emails, recipient]);
                                setRecipient('');
                            }
                        }}
                    />*/}
                </div>
            }
            <div>
                
                <TextField
                  label="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Email Subject"
                  onKeyDown={(event: any) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                    }
                  }}
                />
                {/*<input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Email Subject"
                />*/}
            </div>
            <div>
                <label htmlFor="emailBody" className="block font-semibold">
                Email Content:
                </label>
                <BlogPostEditor
                  onSave={handleGetContent}
                  setMediaArray={setMediaArray} 
                  setMedia={setMedia}
                  media={media}
                  mediaArray={mediaArray}
                />
                {/*
                <textarea
                id="emailBody"
                value={emailContent}
                onChange={handleContentChange}
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                rows={6}
                placeholder="Type your email content here..."
                />*/}
            </div>
        </form>
      </div>

      {/* Section 2: Email Preview */}
      <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Email Preview</h2>
        <div className="space-y-4">
            {
                emailRecipient === 'CUSTOM' &&
                <div className="flex flex-col gap-1">
                    <p>
                        <strong>Recipient:</strong>
                    </p>
                    {emails.length > 0 && 
                        <div className="flex flex-wrap">
                            {
                                emails.map((mail: any) => (
                                    <div className="flex items-center w-auto gap-3 p-3 rounded-full bg-[#F6F6F6] text-[#000] my-1">
                                        <p>{mail}</p>
                                        <div className="cursor-pointer" onClick={() => {
                                            const updatedEmails = emails.filter((oneMail: any) => oneMail !== mail);

                                            setEmails(updatedEmails);
                                        }}><TimesIconRed /></div>
                                    </div>
                                    
                                ))
                            }
                        </div>
                    }
                </div>
            }
            <hr />
            <p>
                <strong>Subject:</strong> {subject || 'Subject will appear here'}
            </p>
            <hr />
            {emailContent.length > 0 && 
            <div className="border p-4 rounded-md bg-gray-50">
                <div id="email-content-body" dangerouslySetInnerHTML={{__html: `${emailContent}`}} />
                    
                {/*<p className="whitespace-pre-wrap">
                {emailContent || 'Email content will appear here...'}
                </p>
                
                <div className="mt-4 space-y-4">
                {media.map((mediaFile, index) => (
                    <img
                    key={index}
                    src={mediaFile.src}
                    alt={`uploaded-media-${index}`}
                    className="w-full h-auto rounded-md shadow"
                    />
                ))}
                </div>*/}
            </div>}
          
            <div className="flex justify-end">
                <Button
                    title="Send Email"
                    className="!text-[16px] mt-6"
                    size="large"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    loading={isLoading}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
