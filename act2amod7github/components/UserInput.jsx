import React from 'react';


const UserInput = ({ userInput, onInputChange }) => {
  return (
    <section id='user-input'>
      <form>
        {/* Initial Investment */}
        <div className="input-group">
          <label htmlFor="initialInvestment">Initial Investment ($)</label>
          <input 
            type="number" 
            min="0"
            id="initialInvestment"
            value={userInput.initialInvestment}
            onChange={(e) => onInputChange('initialInvestment', e.target.value)}
          />
        </div>

        {/* Annual Investment */}
        <div className="input-group">
          <label htmlFor="annualInvestment">Annual Investment ($)</label>
          <input 
            type="number" 
            min="0"
            id="annualInvestment"
            value={userInput.annualInvestment}
            onChange={(e) => onInputChange('annualInvestment', e.target.value)}
          />
        </div>

        {/* Expected Return */}
        <div className="input-group">
          <label htmlFor="expectedReturn">Expected Return (%)</label>
          <input 
            type="number" 
            min="0"
            max="100"
            id="expectedReturn"
            value={userInput.expectedReturn}
            onChange={(e) => onInputChange('expectedReturn', e.target.value)}
          />
        </div>

        {/* Duration */}
        <div className="input-group">
          <label htmlFor="duration">Duration (years)</label>
          <input 
            type="number" 
            min="0"
            id="duration"
            value={userInput.duration}
            onChange={(e) => onInputChange('duration', e.target.value)}
          />
        </div>
      </form>
    </section>
  );
}

export default UserInput;