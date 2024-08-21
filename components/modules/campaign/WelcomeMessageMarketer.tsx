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
    <div className="flex flex-col sm:flex-row sm:justify-between p-4 gap-4">
      <div>
        <p className='font-bold'>Hello {name}👋🏽</p>
        <p className='text-xs mt-2'>Here's your insight for today</p>
      </div>

      <div className="mx-1 bg-[#FFF5D8] pr-2 pl-2" style={{borderRadius: '1rem'}}>
        <span className="flex justify-between">
          <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
            <small>Your Referral code</small><br />
            <b>{referral_code}</b><br />
          </span>
          <span style={{marginLeft: '1vw', marginTop: '3vh', cursor: 'pointer'}}>
            <Copy handleClick={() => {
              copyToClipboard(referral_code ? referral_code : '')
              toast.success("Referral code copied");
            }} />
          </span>
        </span>
        <span className="flex justify-between text-xs gap-2 py-3">
          <span className="cursor-pointer" onClick={() => {
            copyToClipboard(referral_code ? `https://kabukabu.com.ng/ref?code=${referral_code}&type=driver` : '')
            toast.success("Referral Link copied");
          }}>Copy Link(Driver)</span>
          <span className="cursor-pointer" onClick={() => {
            copyToClipboard(referral_code ? `https://kabukabu.com.ng/ref?code=${referral_code}&type=rider` : '')
            toast.success("Referral Link copied");
          }}>Copy Link(Rider)</span>
        </span>
      </div>
    </div>
  )
}

export default WelcomeMessage