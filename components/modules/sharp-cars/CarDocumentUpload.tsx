import FileIcon from '@/components/icons/FileIcon';
import Button from '@/components/ui/Button/Button';
import React, { useRef, useEffect, useState } from 'react';

interface Props {
    title: string;
    docType: string;
    handleChange: (file: any, docType: string) => void;
}

const CarDocumentUpload: React.FC<Props> = ({ title, docType, handleChange }) => {
    const [imgUrl, setImgUrl] = useState('');
    
     const fileInputRef = useRef<any>();
  
    return (
        <div className="flex flex-col my-4">
          <p className="text-md font-bold pb-2">{title}</p>
          <div className="w-full">
          <Button
            title="Tap here to upload"
            startIcon={<FileIcon />}
            variant="text"
            color="tetiary"
            size="medium"
            className="!text-[#161616] bg-[#F1F1F1] rounded-md w-full p-3 flex justify-start"
            onClick={() => {
              if (fileInputRef) {
                fileInputRef.current.click();
              }
            }}
          />
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files) {
                setImgUrl(URL.createObjectURL(e.target.files[0]))
                handleChange(e.target.files[0], docType);
              }
            }}
            
            onClick={() => {
              if (fileInputRef) {
                fileInputRef.current.click();
              }
            }}
          />
          </div>
          {
            imgUrl.length > 0 && 
            <img src={imgUrl} alt="" />
          }
        </div>
    )
}

export default CarDocumentUpload;
