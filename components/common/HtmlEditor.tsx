import React, { useState, useEffect, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from 'axios';
import Loader from "../ui/Loader/Loader";
import { FaImage } from "react-icons/fa";

// Extending the window interface to add showOpenFilePicker
declare global {
  interface Window {
    showOpenFilePicker?: any;
  }
}


interface BlogEditorProps {
  onSave: (content: string) => void;
  setMediaArray: any;
  setMedia: any;
  media: any;
  mediaArray: any;
}

// Dynamically load ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogEditor: React.FC<BlogEditorProps> = ({ onSave, setMediaArray, setMedia, media, mediaArray }) => {
  const [content, setContent] = useState<string>("");
  const [showUploadLoader, setShowUploadLoader] = useState(false);

  // Handle content change and auto-save
  const handleChange = (value: string) => {
    setContent(value);
  };

  // Auto-save whenever the content changes
  useEffect(() => {
    if (content) {
      handleSave();
    }
  }, [content]);

  // Save function to trigger onSave prop
  const handleSave = () => {
    onSave(content);
  };

  // Make sure the component only renders client-side
  if (typeof window === "undefined") {
    return null;
  }

  const handleMediaUpload = async () => {
    setShowUploadLoader(true)
    
    //const files = Array.from(e.target.files);

    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'Image Files',
          accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
          },
        },
      ],
      multiple: false, // Allow only one file
    });
  
    // Get the file from the file handle
    const fileUploaded = await fileHandle.getFile();
    const files = [fileUploaded];

    const mediaPreview = files.map((file) => ({
      src: URL.createObjectURL(file),
      file,
    }));

    setMediaArray([...mediaArray, ...files]);
    setMedia([...media, ...mediaPreview]);
    mediaPreview.forEach(async (media, idx) => {
      let body = new FormData()
      body.set('key', '49f6872819f2b77a024f3a4326f29a56')
      body.append('image', media.file)

      let imageUploadOp = await axios({
          method: 'post',
          url: 'https://api.imgbb.com/1/upload',
          data: body
      })

      let url = imageUploadOp.data.data.display_url

      setContent(`
          ${content} 
          <div className="flex justify-center items-center">
              <img
                  key="${idx}"
                  src="${url}"
                  alt="uploaded-media-${idx + 1}"
                  className="w-full h-auto rounded-md shadow"
              />
          </div>
      `)
      
      setShowUploadLoader(false)
    })
    
  };

  /*const handleMediaUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setShowUploadLoader(true)
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const mediaPreview = files.map((file) => ({
        src: URL.createObjectURL(file),
        file,
      }));

      setMediaArray([...mediaArray, ...files]);
      setMedia([...media, ...mediaPreview]);
      mediaPreview.forEach(async (media, idx) => {
        let body = new FormData()
        body.set('key', '49f6872819f2b77a024f3a4326f29a56')
        body.append('image', media.file)

        let imageUploadOp = await axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            data: body
        })

        let url = imageUploadOp.data.data.display_url
  
        setContent(`
            ${content} 
            <div className="flex justify-center items-center">
                <img
                    key="${idx}"
                    src="${url}"
                    alt="uploaded-media-${idx + 1}"
                    className="w-full h-auto rounded-md shadow"
                />
            </div>
        `)
        
        setShowUploadLoader(false)
      })
    }
  };*/

  return (
    <div className="p-4">
      {/* Editor */}
      
      <button
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        aria-label="Insert Image"
        onClick={() => handleMediaUpload()}
        disabled={showUploadLoader}
        type={'button'}
      >
        {showUploadLoader ? <Loader /> : <FaImage />}
      </button>

      {/*<input
          type="file"
          accept="image/*,video/*"
          id="fileInput"
          className="hidden"
          onChange={handleMediaUpload}
      />*/}
      <ReactQuill
        value={content}
        onChange={handleChange}
        className="bg-white"
        theme="snow"
        placeholder="Write your blog post here..."
        modules={{
          toolbar: {
            container: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline", "strike"],
              ["link", "blockquote", "code-block"],
              [{ align: [] }],
              ["clean"],
            ]
          },
        }}
      />
    </div>
  );
};

export default BlogEditor;
