
import React, { useState } from 'react';
import { CategoryButton } from './CategoryButton'; // Named import


function CategorySelector() {

   // category state 
  const [selectedCategory, setSelectedCategory] = useState(null);

  // category array
  const categories = [
    { key: 'readEmails', label: 'Read Emails', color: 'orange' },
    { key: 'sendEmails', label: 'Send Emails', color: 'yellow' },
    { key: 'webParsing', label: 'Web Parsing', color: 'blue' },
  ];

  // handle click by key
  const handleCategoryClick = (key) => {
    setSelectedCategory(key);
  };

  // reset function
  const handleReset = () => {
    setSelectedCategory(null);
  };


  return (

    <div>
        {/* map display  passing props to CategoryButton.js */}
      {categories.map(({ key, label, color }) => (
        <CategoryButton
          key={key}
          label={label}
          color={color}
          isSelected={selectedCategory === key}
          onClick={() => handleCategoryClick(key)}
        />
      ))}

      <button
       /* reset button styles */
        onClick={handleReset}
        style={{
          backgroundColor: 'lightgray',
          transition: 'background-color 0.3s ease',
          padding: '8px 16px',
          border: '1px solid #ccc',
          cursor: 'pointer',
          borderRadius: '4px',
          marginLeft: '10px',
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default CategorySelector;