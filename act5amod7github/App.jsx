// App.jsx

import React, { useState } from 'react';
import { calculateInvestmentResults } from './util/investment.js';
import { generatePDF } from './util/generatereport.js';

//  import custom hook + validation
import { useForm } from './hooks/useForm.js';
import { validateInvestment } from './util/validation.js';

const InvestmentCalculator = () => {

  const [results, setResults] = useState(null);

  //  custom form hook instead of useState
  const {
    values: inputCustomer,   // form values
    errors,                  // validation errors
    handleChange,            // input handler
    validate                 // validation trigger
  } = useForm(
    {
      initialInvestment: 10000,
      annualInvestment: 1200,
      expectedReturn: 6,
      duration: 10
    },
    validateInvestment
  );

  const handleCalculate = () => {
    //  Stop if validation fails
    const isValid = validate();
    if (!isValid) return;

    //  Run calculation
    const calculatedResults = calculateInvestmentResults(inputCustomer);
    setResults(calculatedResults);
  };

  const handleGeneratePDF = () => {
    if (results) {
      generatePDF({ ...inputCustomer, results });
    }
  };

  const userEnteredValid = inputCustomer.duration >= 1;

  return (
    <div className="investment-calculator">
      <div className="inputs">

        {/* Initial Investment */}
        <input
          type="number"
          name="initialInvestment"
          min="0"
          value={inputCustomer.initialInvestment}
          onChange={handleChange}
          placeholder="Initial Investment"
        />
        {/*  Show error if exists */}
        {errors.initialInvestment && (
          <p className="error-message">{errors.initialInvestment}</p>
        )}

        {/* Annual Investment */}
        <input
          type="number"
          name="annualInvestment"
          min="0"
          value={inputCustomer.annualInvestment}
          onChange={handleChange}
          placeholder="Annual Investment"
        />
        {errors.annualInvestment && (
          <p className="error-message">{errors.annualInvestment}</p>
        )}

        {/* Expected Return */}
        <input
          type="number"
          name="expectedReturn"
          min="0"
          value={inputCustomer.expectedReturn}
          onChange={handleChange}
          placeholder="Expected Return (%)"
        />
        {errors.expectedReturn && (
          <p className="error-message">{errors.expectedReturn}</p>
        )}

        {/* Duration */}
        <input
          type="number"
          name="duration"
          min="1"
          value={inputCustomer.duration}
          onChange={handleChange}
          placeholder="Duration (years)"
        />
        {errors.duration && (
          <p className="error-message">{errors.duration}</p>
        )}

        <button onClick={handleCalculate}>
          Calculate
        </button>
      </div>

      {/* Existing duration check */}
      {!userEnteredValid && (
        <p className="error-message">
          Please ensure that years invested are greater than zero.
        </p>
      )}

      {userEnteredValid && results && (
        <div className="results">
          <h2>Investment Results</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Investment Value</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
              </tr>
            </thead>
            <tbody>
              {results.map((yearData, index) => (
                <tr key={index}>
                  <td>{yearData.year}</td>

                  {/*  Safe formatting */}
                  <td>${yearData.investmentValue.toFixed(2)}</td>
                  <td>${yearData.interest.toFixed(2)}</td>
                  <td>${yearData.totalInterest.toFixed(2)}</td>
                  <td>${yearData.investedCapital.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleGeneratePDF}>
            Download PDF Report
          </button>
        </div>
      )}
    </div>
  );
};

export default InvestmentCalculator;