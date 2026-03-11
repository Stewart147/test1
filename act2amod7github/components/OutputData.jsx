


import React from 'react';
import { calculateInvestmentResults } from '../util/investments.js';
// import InvestmentChart from './components/InvestmentChart';
import InvestmentChart from './InvestmentChart';
import './OutputData.css';

/**
 * Component to display investment results:
 *  - Table of yearly data
 *  - Row highlight for highest interest earned
 *  - Investment growth chart
 */
const OutputData = ({ inputValue }) => {
  const results = calculateInvestmentResults(inputValue);

  // Find maximum interest earned for row highlight
  const maxInterest = Math.max(...results.map(y => Number(y.interest.toFixed(2))));

  return (
    <section id="output-data">
      <h2>Investment Growth</h2>

      {/*  Chart */}
      <InvestmentChart data={results} />

      {/*  Table */}
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value ($)</th>
            <th>Interest Earned ($)</th>
            <th>Total Interest ($)</th>
            <th>Invested Capital ($)</th>
          </tr>
        </thead>
        <tbody>
          {results.map(yearData => {
            // Highlight row if interest equals maxInterest
            const isHighest = Number(yearData.interest.toFixed(2)) === maxInterest;

            return (
              <tr key={yearData.year} className={isHighest ? "highlight-row" : ""}>
                <td>{yearData.year}</td>
                <td>{yearData.investmentValue.toFixed(2)}</td>
                <td>{yearData.interest.toFixed(2)}</td>
                <td>{yearData.totalInterest.toFixed(2)}</td>
                <td>{yearData.investedCapital.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default OutputData;