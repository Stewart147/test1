import React, { useState } from 'react';

// Default values used when the component first loads and when resetting
// stored in object
const initialValues = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10
};

const UserInput = () => {

  // State storing all input values
  const [userInput, setUserInput] = useState(initialValues);

  // State storing the selected currency
  const [currency, setCurrency] = useState("USD");

  // Currency symbols used to display the correct symbol in labels
  // stored in object
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£"
  };

  // Handles changes for all input fields
  // inputIdentifier identifies which field changed
  // newValue is the value typed by the user
  const handleChange = (inputIdentifier, newValue) => {
    setUserInput(prevUserInput => ({
      ...prevUserInput, // keep previous values
      [inputIdentifier]: +newValue // update the changed field (convert to number)
    }));
  };

  // Reset button function
  // Restores the default values defined above
  const handleReset = () => {
    setUserInput(initialValues);
  };

  // Handles currency selection from dropdown
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (

    <section id='user-input'>

      {/* Form for entering investment details */}
      <form>

        {/* Currency Selector */}
        <div className="input-group">
          <label htmlFor="currency">Currency</label>

          {/* Dropdown allowing user to choose currency */}
          <select
            id="currency"
            value={currency}
            onChange={handleCurrencyChange}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        {/* Initial Investment Input */}
        <div className="input-group">
          <label htmlFor="initialInvestment">
            Initial Investment ({currencySymbols[currency]})
          </label>

          <input 
            type="number" 
            id="initialInvestment"
            value={userInput.initialInvestment} // controlled input
            onChange={(e) => handleChange('initialInvestment', e.target.value)}
          />
        </div>

        {/* Annual Investment Input */}
        <div className="input-group">
          <label htmlFor="annualInvestment">
            Annual Investment ({currencySymbols[currency]})
          </label>

          <input 
            type="number" 
            id="annualInvestment"
            value={userInput.annualInvestment}
            onChange={(e) => handleChange('annualInvestment', e.target.value)}
          />
        </div>

        {/* Expected Return Input */}
        <div className="input-group">
          <label htmlFor="expectedReturn">Expected Return (%)</label>

          <input 
            type="number" 
            id="expectedReturn"
            value={userInput.expectedReturn}
            onChange={(e) => handleChange('expectedReturn', e.target.value)}
          />
        </div>

        {/* Duration Input */}
        <div className="input-group">
          <label htmlFor="duration">Duration (years)</label>

          <input 
            type="number" 
            id="duration"
            value={userInput.duration}
            onChange={(e) => handleChange('duration', e.target.value)}
          />
        </div>

        {/* Reset Button */}
        <div className="actions">
          <button
            type="button" // prevents form submission
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

      </form>

    </section>

  )

}

export default UserInput;