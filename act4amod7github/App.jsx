import React, { useState } from 'react';

// Import investment calculation logic
import { calculateInvestmentResults } from './util/investment.js';

// Import PDF report generator
import { generatePDF } from './util/generatereport.js';

import './App.css';

// Import chart components from Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
} from "recharts";


const InvestmentCalculator = () => {

  /*
  STATE: Stores the current user inputs for the calculator
  */
  const [inputCustomer, setInputCustomer] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  /*
  STATE: Stores calculated yearly investment results
  This will be an array of objects returned by calculateInvestmentResults()
  */
  const [results, setResults] = useState(null);

  /*
  STATE: Stores saved investment scenarios
  Each scenario contains:
  - scenario name
  - user inputs
  - calculated results
  */
  const [scenarios, setScenarios] = useState([]);


  /*
  Handles changes to input fields.

  The function:
  1. Gets the name and value from the input element
  2. Updates the corresponding property in inputCustomer
  3. Converts the value to a number
  */
  const handleInputChange = (event) => {

    const { name, value } = event.target;

    setInputCustomer((prevState) => ({
      ...prevState,
      [name]: Number(value)
    }));

  };


  /*
  Runs the investment calculation when the user presses "Calculate".

  It calls the external utility function:
  calculateInvestmentResults()

  Then saves the returned data into the results state.
  */
  const handleCalculate = () => {

    const calculatedResults = calculateInvestmentResults(inputCustomer);

    setResults(calculatedResults);

  };


  /*
  Generates a downloadable PDF report.

  This sends:
  - the user's inputs
  - the calculated results

  to the generatePDF utility function.
  */
  const handleGeneratePDF = () => {

    if (results) {
      generatePDF({ ...inputCustomer, results });
    }

  };


  /*
  Saves the current investment scenario for comparison.

  Each scenario includes:
  - a unique scenario name
  - the current inputs
  - the calculated results
  */
  const saveScenario = () => {

    if (!results) return;

    const newScenario = {
      name: `Scenario ${scenarios.length + 1}`,
      inputs: inputCustomer,
      results: results
    };

    // Add new scenario to the scenarios list
    setScenarios([...scenarios, newScenario]);

  };


  /*
  Clears all saved comparison scenarios
  */
  const clearScenarios = () => {
    setScenarios([]);
  };


  /*
  Simple validation to ensure duration is valid
  */
  const userEnteredValid = inputCustomer.duration >= 1;


  /*
  Currency formatter used throughout the UI
  Formats numbers as British pounds (£)
  */
  const currencyFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  });


  return (

    <div className="investment-calculator">

      {/* Page title */}
      <h1>Investment Calculator</h1>


      {/* INPUT SECTION */}

      <div className="inputs">

        {/* Initial Investment Input */}
        <div className="form-group">
          <label>Initial Investment (£)</label>
          <input
            type="number"
            name="initialInvestment"
            value={inputCustomer.initialInvestment}
            onChange={handleInputChange}
          />
        </div>


        {/* Annual Investment Input */}
        <div className="form-group">
          <label>Annual Investment (£)</label>
          <input
            type="number"
            name="annualInvestment"
            value={inputCustomer.annualInvestment}
            onChange={handleInputChange}
          />
        </div>


        {/* Expected Return Input */}
        <div className="form-group">
          <label>Expected Return (%)</label>
          <input
            type="number"
            name="expectedReturn"
            value={inputCustomer.expectedReturn}
            onChange={handleInputChange}
          />
        </div>


        {/* Duration Input */}
        <div className="form-group">
          <label>Duration (Years)</label>
          <input
            type="number"
            name="duration"
            value={inputCustomer.duration}
            onChange={handleInputChange}
          />
        </div>


        {/* Runs the calculation */}
        <button onClick={handleCalculate}>
          Calculate
        </button>

      </div>


      {/* Validation error message */}
      {!userEnteredValid && (
        <p className="error-message">
          Please ensure that years invested are greater than zero.
        </p>
      )}



      {/* RESULTS SECTION */}
      {userEnteredValid && results && (

        <div className="results">

          <h2>Investment Results</h2>


          {/* Results table showing yearly breakdown */}

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

              {/* Loop through yearly results */}

              {results.map((yearData, index) => (

                <tr key={index}>

                  <td>{yearData.year}</td>

                  <td>{currencyFormatter.format(yearData.investmentValue)}</td>

                  <td>{currencyFormatter.format(yearData.interest)}</td>

                  <td>{currencyFormatter.format(yearData.totalInterest)}</td>

                  <td>{currencyFormatter.format(yearData.investedCapital)}</td>

                </tr>

              ))}

            </tbody>

          </table>


          {/* PDF report button */}

          <button onClick={handleGeneratePDF}>
            Download PDF Report
          </button>


          {/* Save scenario for comparison */}

          <button onClick={saveScenario}>
            Save Scenario
          </button>



          {/* INVESTMENT GROWTH CHART */}

          <div className="chart-container">

            <h2>Investment Growth Over Time</h2>


            {/* ResponsiveContainer ensures chart scales with screen */}

            <ResponsiveContainer width="100%" height={350}>

              <LineChart data={results}>

                <CartesianGrid strokeDasharray="3 3" />

                {/* X-axis represents year */}
                <XAxis dataKey="year" />

                {/* Y-axis shows currency values */}
                <YAxis tickFormatter={(value) => `£${value}`} />

                {/* Tooltip appears when hovering over chart points */}
                <Tooltip formatter={(value) => currencyFormatter.format(value)} />

                <Legend />


                {/* Line showing total portfolio value */}

                <Line
                  type="monotone"
                  dataKey="investmentValue"
                  stroke="#2c7be5"
                  strokeWidth={3}
                  name="Investment Value"
                />


                {/* Line showing total contributed capital */}

                <Line
                  type="monotone"
                  dataKey="investedCapital"
                  stroke="#28a745"
                  strokeWidth={3}
                  name="Invested Capital"
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      )}



      {/* SCENARIO COMPARISON SECTION */}

      {scenarios.length > 0 && (

        <div className="comparison-section">

          <h2>Scenario Comparison</h2>


          {/* Table comparing different investment setups */}

          <table>

            <thead>
              <tr>
                <th>Scenario</th>
                <th>Initial Investment</th>
                <th>Annual Investment</th>
                <th>Return (%)</th>
                <th>Duration</th>
                <th>Final Value</th>
              </tr>
            </thead>


            <tbody>

              {scenarios.map((scenario, index) => {

                // Get final year's investment value
                const finalYear = scenario.results[scenario.results.length - 1];

                return (

                  <tr key={index}>

                    <td>{scenario.name}</td>

                    <td>{currencyFormatter.format(scenario.inputs.initialInvestment)}</td>

                    <td>{currencyFormatter.format(scenario.inputs.annualInvestment)}</td>

                    <td>{scenario.inputs.expectedReturn}%</td>

                    <td>{scenario.inputs.duration}</td>

                    <td>{currencyFormatter.format(finalYear.investmentValue)}</td>

                  </tr>

                );

              })}

            </tbody>

          </table>



          {/* BAR CHART comparing final investment values */}

          <div className="chart-container">

            <h2>Final Value Comparison</h2>

            <ResponsiveContainer width="100%" height={350}>

              <BarChart
                data={scenarios.map((s) => ({
                  name: s.name,
                  value: s.results[s.results.length - 1].investmentValue
                }))}
              >

                <XAxis dataKey="name" />

                <YAxis tickFormatter={(value) => `£${value}`} />

                <Tooltip formatter={(value) => currencyFormatter.format(value)} />

                <Bar dataKey="value" fill="#2c7be5" />

              </BarChart>

            </ResponsiveContainer>

          </div>


          {/* Clears all saved scenarios */}

          <button onClick={clearScenarios}>
            Clear Comparison
          </button>

        </div>

      )}

    </div>
  );
};

export default InvestmentCalculator;