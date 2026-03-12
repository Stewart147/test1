import React, { useState } from 'react';
import Header from './components/Header';
import UserInput from './components/UserInput';
import OutputData from './components/OutputData';

function App() {

  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  // NEW: Toggle between yearly and monthly views
  const [viewMode, setViewMode] = useState('yearly');

  const handleInputChange = (inputIdentifier, newValue) => {
    setUserInput(prevInput => ({
      ...prevInput,
      [inputIdentifier]: +newValue
    }));
  };

  // Toggle handler
  const handleToggle = () => {
    setViewMode(prev => prev === 'yearly' ? 'monthly' : 'yearly');
  };

  return (
    <>
      <Header />

      <UserInput userInput={userInput} onInputChange={handleInputChange} />

      {/* Toggle Button */}
      <div style={{ textAlign: 'center', border: '1px solid lightgrey', padding: '2px', width: '200px', margin: '1rem auto' }}>
        <button onClick={handleToggle}>
          Switch to {viewMode === 'yearly' ? 'Monthly' : 'Yearly'} View
        </button>
      </div>

      {/* Pass viewMode to OutputData */}
      <OutputData inputValue={userInput} viewMode={viewMode} />
    </>
  );
}

export default App;