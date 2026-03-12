
const UserInput = ({ userInput, onInputChange }) => {

  return (
    <section id='user-input'>
      <form onSubmit={(e) => e.preventDefault()}>

        <div className="input-group">
          <label htmlFor="initialInvestment">Initial Investment ($)</label>
          <input 
            type="number" 
            id="initialInvestment"
            value={userInput.initialInvestment}
            onChange={(e) => onInputChange('initialInvestment', e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="annualInvestment">Annual Investment ($)</label>
          <input 
            type="number" 
            id="annualInvestment"
            value={userInput.annualInvestment}
            onChange={(e) => onInputChange('annualInvestment', e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="expectedReturn">Expected Return (%)</label>
          <input 
            type="number" 
            id="expectedReturn"
            value={userInput.expectedReturn}
            onChange={(e) => onInputChange('expectedReturn', e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="duration">Duration (years)</label>
          <input 
            type="number" 
            id="duration"
            value={userInput.duration}
            onChange={(e) => onInputChange('duration', e.target.value)}
          />
        </div>

      </form>
    </section>
  );
};

export default UserInput;