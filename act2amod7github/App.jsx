import React, { useState } from 'react';
import Header from './components/Header';
import UserInput from './components/UserInput';
import OutputData from './components/OutputData';

function App() {

  //  Store user input values
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  //  Store validation error messages
  const [error, setError] = useState(null);

  //  Handle input changes with validation
  const handleInputChange = (inputIdentifier, newValue) => {
    const value = Number(newValue);

    // Validate: must be a number
    if (isNaN(value)) {
      setError("Please enter a valid number.");
      return;
    }

    // Validate: no negative values
    if (value < 0) {
      setError("Values cannot be negative.");
      return;
    }

    // Validate: expected return cannot exceed 100%
    if (inputIdentifier === "expectedReturn" && value > 100) {
      setError("Expected return cannot exceed 100%.");
      return;
    }

    // All checks passed, clear error
    setError(null);

    // Update the specific input in state
    setUserInput(prevInput => ({
      ...prevInput,
      [inputIdentifier]: value
    }));
  };

  return (
    <>
      <Header />

      {/* Pass input data and handler to input component */}
      <UserInput 
        userInput={userInput} 
        onInputChange={handleInputChange} 
      />

      {/* Show validation error if exists */}
      {error && <p className="error">{error}</p>}

      {/* Pass input values to output component for calculation and table */}
      <OutputData inputValue={userInput} />
    </>
  );
}

export default App;