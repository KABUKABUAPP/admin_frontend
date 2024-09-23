// src/components/WysiwygEditor.tsx
import React, { useRef, useEffect } from 'react';
import { FaBold, FaItalic, FaImage } from 'react-icons/fa';
import { BsCode } from 'react-icons/bs';

interface WysiwygEditorProps {
  getContent: (html: string) => void;
  handleMediaUpload: any;
}

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ getContent, handleMediaUpload }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        execCommand('insertImage', url);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendContentToParent = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      getContent(content);  // Send HTML content to parent
    }
  };

  useEffect(() => {
    const editor = editorRef.current;

    if (editor) {
      // Trigger `sendContentToParent` whenever content changes
      const handleInput = () => sendContentToParent();
      editor.addEventListener('input', handleInput);

      return () => {
        // Cleanup event listener on component unmount
        editor.removeEventListener('input', handleInput);
      };
    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto my-10">
      <div className="flex gap-4 mb-2 border-b border-gray-300 pb-2">
        <button
          className="p-2 bg-gray-100 rounded hover:bg-gray-200"
          onClick={() => execCommand('bold')}
          aria-label="Bold"
        >
          <FaBold />
        </button>

        <button
          className="p-2 bg-gray-100 rounded hover:bg-gray-200"
          onClick={() => execCommand('italic')}
          aria-label="Italic"
        >
          <FaItalic />
        </button>

        <button
          className="p-2 bg-gray-100 rounded hover:bg-gray-200"
          aria-label="Insert Image"
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <FaImage />
        </button>
        {/*<input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleMediaUpload}
        />*/}

        <input
            type="file"
            accept="image/*,video/*"
            id="fileInput"
            className="hidden"
            onChange={handleMediaUpload}
            multiple
        />

        <button
          className="p-2 bg-gray-100 rounded hover:bg-gray-200"
          onClick={() => execCommand('formatBlock', 'pre')}
          aria-label="Code View"
        >
          <BsCode />
        </button>
      </div>

      {/* Editable Content */}
      <div
        ref={editorRef}
        contentEditable
        className="border border-gray-300 p-4 h-56 bg-white rounded-lg shadow-md overflow-y-auto focus:outline-none"
        suppressContentEditableWarning={true}
      >
      </div>
    </div>
  );
};

export default WysiwygEditor;
