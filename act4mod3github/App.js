import './App.css';
import { useState } from 'react';

// set up state variables for input, input list and error message

const DynamicForm = () => {
  let [inputval, setInputValue] = useState("");
  // uses an array to map out state value
  let [inputlist, setInputList] = useState([]);
  let [error, setError] = useState(""); 

  const MIN_LENGTH = 3;

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // clear error as user types valid input
    if (value.length >= MIN_LENGTH) {
      setError("");
    }
  };

  const handleReset = () => {
    setInputValue("");
    setError("");
  };

  const handleInputList = () => {
    if (inputval.length < MIN_LENGTH) {
      setError(`Input must be at least ${MIN_LENGTH} characters long`);
      return;
    }

    setInputList([...inputlist, inputval]);
    setInputValue("");
    setError("");
  };

  return (
    <div>
      <h1>Dynamic Form</h1>

      <input
        type="text"
        value={inputval}
        onChange={handleInputChange}
        placeholder="Type something..."
      />

      <button onClick={handleReset}>Reset</button>

      <div>
        <h2>Current Input</h2>
        <p>{inputval}</p>
        <p>characters: {inputval.length}</p>

        <button onClick={handleInputList}>Submit</button>

        {/* Error Message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>Input List:</p>
        {/* display list using map */}
        <ul>
          {inputlist.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DynamicForm;
