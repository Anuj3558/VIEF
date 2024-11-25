import React, { useState, useRef } from 'react';
import { Bold, Italic, Underline, Type } from 'lucide-react';

const RichTextEditor = ({ initialValue = '', onChange }) => {
  const editorRef = useRef(null);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [htmlContent, setHtmlContent] = useState(initialValue);

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateContent();
  };

  const updateContent = () => {
    const content = editorRef.current.innerHTML;
    setHtmlContent(content);
    onChange({
      target: {
        name: 'description',
        value: content
      }
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-gray-50 border-b">
        <button
          type="button"
          onClick={() => handleFormat('bold')}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleFormat('italic')}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleFormat('underline')}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => setIsSourceMode(!isSourceMode)}
          className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
            isSourceMode ? 'bg-gray-200' : ''
          }`}
          title="View Source"
        >
          <Type className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      {isSourceMode ? (
        <textarea
          value={htmlContent}
          onChange={(e) => {
            setHtmlContent(e.target.value);
            onChange({
              target: {
                name: 'description',
                value: e.target.value
              }
            });
          }}
          className="w-full p-3 min-h-[120px] focus:outline-none font-mono text-sm"
          placeholder="Enter your description..."
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={updateContent}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className="w-full p-3 min-h-[120px] focus:outline-none"
          placeholder="Enter your description..."
        />
      )}
    </div>
  );
};

export default RichTextEditor;