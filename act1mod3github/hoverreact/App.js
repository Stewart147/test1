import React, { useState } from 'react';

const App = () => {
  const [bgColor, setBgColor] = useState('yellow');
  const isDisabled = false;

  const attText = {
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'orange',
  };

  const divStyle = {
    height: '200px',
    width: '800px',
    margin: '40px auto',
    backgroundColor: 'cyan',
    border: '1px solid black',
    textAlign: 'center',
  };

  // clean way of using javaScript within react without get dependency errors
  // such as undefined null value with eventListener

  return (
    <div style={divStyle}>
      <h1 style={attText}>MyButton inline styles</h1>
      <button
        disabled={isDisabled}
        style={{
          padding: '10px 20px',
          backgroundColor: bgColor,
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={() => !isDisabled && setBgColor('blue')}
        onMouseLeave={() => !isDisabled && setBgColor('yellow')}
      >
        Hover Here
      </button>
    </div>
  );
};

export default App;
