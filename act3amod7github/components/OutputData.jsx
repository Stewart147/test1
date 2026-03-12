import React from 'react';
import { calculateInvestmentResults, formatter } from '../util/investments';
import InvestmentChart from './InvestmentChart';

const OutputData = ({ inputValue, viewMode }) => {

  if (inputValue.duration <= 0) {
    return <p>Please enter a duration greater than zero.</p>;
  }

  // Run investment calculation
  const resultData = calculateInvestmentResults({
    ...inputValue,
    viewMode
  });

  // Last period totals
  const lastPeriod = resultData[resultData.length - 1];

  const totalInterest = lastPeriod.totalInterest;
  const totalInvested = lastPeriod.investedCapital;

  return (
    <>
      <table id="result">

        <thead>
          <tr>
            <th>{viewMode === "monthly" ? "Month" : "Year"}</th>
            <th>Investment Value</th>
            <th>Interest</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>

        <tbody>
          {resultData.map((data) => (
            <tr key={data.period}>

              {/* Period number */}
              <td>{data.period}</td>

              {/* Investment value */}
              <td>{formatter.format(data.valueEndOfPeriod)}</td>

              {/* Interest earned this period */}
              <td>{formatter.format(data.interest)}</td>

              {/* Total accumulated interest */}
              <td>{formatter.format(data.totalInterest)}</td>

              {/* Total invested capital */}
              <td>{formatter.format(data.investedCapital)}</td>

            </tr>
          ))}
        </tbody>

      </table>

      {/* Summary Section */}
      <div id="summary">

        <h3>Investment Summary</h3>

        <p>
          <strong>Total Invested:</strong>{" "}
          {formatter.format(totalInvested)}
        </p>

        <p>
          <strong>Total Interest Earned:</strong>{" "}
          {formatter.format(totalInterest)}
        </p>

      </div>

      {/* Investment Growth Chart */}
      <InvestmentChart data={resultData} viewMode={viewMode} />

    </>
  );
};

export default OutputData;