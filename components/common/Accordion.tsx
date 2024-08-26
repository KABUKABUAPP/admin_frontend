import React, { useState } from 'react';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full my-4 mx-auto">
      {items.map((item, index) => (
        <div key={index} className="mb-4 border-b border-gray-200">
          <button
            onClick={() => handleToggle(index)}
            className="w-full text-left p-4 text-lg font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {item.title}
          </button>
          {openIndex === index && (
            <div className="p-4 text-gray-700 bg-gray-50">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
