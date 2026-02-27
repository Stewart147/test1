
import React from 'react';

// Named export for CategoryButton passing in props from CategorySelector.js
export function CategoryButton({ label, color, isSelected, onClick }) {

  return (

    // conditional render button
    <button
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? color : 'white',
        transition: 'background-color 0.3s ease',
        padding: '8px 16px',
        marginRight: '10px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        borderRadius: '4px',
      }}
    >
      {label}
    </button>
  );
}