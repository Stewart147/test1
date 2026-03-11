import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/**
 * Component to display a line chart of investment growth.
 * Props:
 *  - data: array of yearly investment objects from calculateInvestmentResults
 */
const InvestmentChart = ({ data }) => {
  return (
    <section id="investment-chart">
      <h2>Investment Growth Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend verticalAlign="top" height={36} />

          {/* Line for total investment value */}
          <Line
            type="monotone"
            dataKey="investmentValue"
            name="Investment Value"
            stroke="#8884d8"
            strokeWidth={2}
          />

          {/* Line for total interest earned */}
          <Line
            type="monotone"
            dataKey="totalInterest"
            name="Total Interest"
            stroke="#82ca9d"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default InvestmentChart;