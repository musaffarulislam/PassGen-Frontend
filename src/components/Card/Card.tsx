import React from 'react';

interface CardProps {
  image: React.ReactNode;
  head: string;
  title: string;
  onCopy: () => void;
  onDelete: () => void;
}

function Card({ image, head, title, onCopy, onDelete }: CardProps) {
  return (
    <>
    <div className="w-full md:w-1/2 lg:w-1/4 p-4">
        
      <div className="bg-[rgb(193,205,255)] rounded-lg shadow-md p-4 flex flex-col items-center">
        <div className="mb-4">{image}</div>
        <h2 className="text-xl font-semibold mb-2">{head}</h2>
        <p className="text-gray-500 mb-4">{title}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 w-full rounded-md mb-2"
          onClick={onCopy}
        >
          Copy
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 w-full rounded-md"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
    </>
  );
}

export default Card;
