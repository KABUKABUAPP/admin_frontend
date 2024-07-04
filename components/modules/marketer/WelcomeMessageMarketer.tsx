import React, { FC } from 'react'
import { toast } from 'react-toastify';
import Copy from '@/components/icons/Copy'

interface Props {
    name: string;
    referral_code: string | null;
}

function copyToClipboard(text: string) {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = text;

  // Set the textarea to be invisible
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';

  // Append the textarea to the DOM
  document.body.appendChild(textarea);

  // Select the text in the textarea
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  // Execute the copy command using the Clipboard API
  try {
    document.execCommand('copy');
  } catch (err) {
    toast.error('Unable to copy to clipboard:');
  }

  // Remove the temporary textarea from the DOM
  document.body.removeChild(textarea);
}

const WelcomeMessage:FC<Props> = ({name, referral_code}) => {
  return (
    <div className="flex justify-between p-4">
      <div>
        <p className='font-bold'>Hello {name}👋🏽</p>
        <p className='text-xs mt-2'>Here's your insight for today</p>
      </div>

      <div className="ml-auto flex flex-col sm:flex-row gap-2">
        <p className="flex bg-[#FFF5D8] pr-2 pl-2" style={{borderRadius: '1rem'}}>
          <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
            <b>{referral_code}</b><br />
            <small>Your referral code</small>
          </span>
          <span style={{marginLeft: '1vw', marginTop: '3vh', cursor: 'pointer'}}>
            <Copy handleClick={() => {
              copyToClipboard(referral_code ? referral_code : '')
              toast.success("Referral code copied");
            }} />
          </span>
        </p>

        <div className="mx-1">
          <span className="flex bg-[#FFF5D8] px-2 py-3 items-center" style={{borderRadius: '1rem'}}>
            <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
              <small>Copy Referral Link (Driver)</small>
            </span>
            <span style={{marginLeft: '1vw', marginTop: '3vh', cursor: 'pointer'}}>
              <Copy handleClick={() => {
                copyToClipboard(referral_code ? `https://kabukabu.com.ng/ref?code=${referral_code}&type=driver` : '')
                toast.success("Referral Link copied");
              }} />
            </span>
          </span>
        </div>

        <div className="mx-1">
          <span className="flex bg-[#FFF5D8] px-2 py-3 items-center" style={{borderRadius: '1rem'}}>
            <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
              <small>Copy Referral Link (Rider)</small>
            </span>
            <span style={{marginLeft: '1vw', marginTop: '3vh', cursor: 'pointer'}}>
              <Copy handleClick={() => {
                copyToClipboard(referral_code ? `https://kabukabu.com.ng/ref?code=${referral_code}&type=rider` : '')
                toast.success("Referral Link copied");
              }} />
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default WelcomeMessage