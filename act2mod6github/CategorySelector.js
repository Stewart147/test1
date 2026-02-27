import React, { useState } from 'react';


function CategorySelector() {

  // set category state, default=null
  const [selectedCategory, setSelectedCategory] = useState(null);

  // create object with key for reset of state to null
  const categories = [
    { key: 'readEmails', label: 'Read Emails', color: 'orange' },
    { key: 'sendEmails', label: 'Send Emails', color: 'yellow' },
    { key: 'webParsing', label: 'Web Parsing', color: 'blue' },
  ];

  // handleCategoryClick function
  const handleCategoryClick = (key) => {
    setSelectedCategory(key);
  };

  // reset function
  const handleReset = () => {
    setSelectedCategory(null);
  };

  return (

    <div>

        {/* map through array */}
      {categories.map(({ key, label, color }) => (
        /* style for selected button or white if not selected */
        <button
          key={key}
          style={{
            backgroundColor: selectedCategory === key ? color : 'white',
            transition: 'background-color 0.3s ease', //  Smooth transition
            padding: '8px 16px',
            marginRight: '10px',
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}
          onClick={() => handleCategoryClick(key)}
        >
          {label}
        </button>
      ))}

      {/* style for reset button*/}
      <button
        style={{
          backgroundColor: 'lightgray',
          transition: 'background-color 0.3s ease', //  Smooth transition
          padding: '8px 16px',
          border: '1px solid #ccc',
          cursor: 'pointer',
        }}
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

export default CategorySelector;