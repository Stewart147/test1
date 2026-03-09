import React from 'react';

const Card = ({ title, description, buttonText, imageUrl }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 
    bg-white hover:bg-cyan-100 
    dark:bg-gray-800 dark:hover:bg-gray-700
    transition duration-300">

      <img className="w-full" src={imageUrl} alt={title} />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {title}
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-base">
          {description}
        </p>
      </div>

      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {buttonText}
        </button>
      </div>

    </div>
  );
};

export default Card;