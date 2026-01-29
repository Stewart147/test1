
import { isDisabled } from '@testing-library/user-event/dist/utils';
import React from 'react';

 
import { useState } from "react";

const StyledButton = () => {
  // 1️⃣ STATE lives at the top of the component
  const [isDisabled, setIsDisabled] = useState(false);

  // 2️⃣ EVENT HANDLER lives in the SAME component
  const handleClick = () => {
    setIsDisabled(prev => !prev);
  };

  // 3️⃣ styles
  const attText = {
    textAlign: "center",
    color: "white",
    backgroundColor: "blue",
  };

  const btn = {
    marginLeft: "20px",
    padding: "6px",
    backgroundColor: "lightgreen",
    color: "black",
    border: "1px solid #ccc",
    borderRadius: "6px",
  };

  const btn1 = {
    marginLeft: "20px",
    padding: "6px",
    backgroundColor: "lightgrey",
    color: "black",
    border: "1px solid #ccc",
    borderRadius: "6px",
  };

  const div = {
    height: "200px",
    width: "800px",
    margin: "40px auto",
    backgroundColor: "cyan",
    border: "1px solid black",
    padding: "20px",
  };

  // 4️⃣ JSX
  return (
    <div style={div}>
      <h1 style={attText}>Activity 1 Module 3 StyledButton</h1>

      {/* use of isDisabled variable to disable button */}

        <button disabled = {isDisabled} id= "btn" className='btn' value="click" style={btn}>Click Here</button> 

      {/* use of button to disable/enable button when clicked */}

      <button onClick={handleClick} style={btn}>
        Enable/Disabled
      </button>

      <button disabled={isDisabled} style={btn1}>
        Target Button
      </button>
    </div>
  );
};

export default StyledButton;




