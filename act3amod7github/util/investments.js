export function calculateInvestmentResults({
  initialInvestment,
  annualInvestment,
  expectedReturn,
  duration,
  viewMode
}) {

  const data = [];
  let investmentValue = initialInvestment;
  let totalInterest = 0;
  let investedCap = initialInvestment;

  // Determine number of periods
  const periods = viewMode === 'monthly' ? duration * 12 : duration;

  // Determine investment contribution per period
  const contribution = viewMode === 'monthly'
    ? annualInvestment / 12
    : annualInvestment;

  // Determine interest rate per period
  const rate = viewMode === 'monthly'
    ? expectedReturn / 100 / 12
    : expectedReturn / 100;

  for (let i = 0; i < periods; i++) {

    // Interest for the current period
    const interestEarned = investmentValue * rate;

    totalInterest += interestEarned;
    investedCap += contribution;

    investmentValue += interestEarned + contribution;

    data.push({
      period: i + 1,
      interest: interestEarned,
      valueEndOfPeriod: investmentValue,
      totalInterest: totalInterest,
      investedCapital: investedCap
    });
  }

  return data;
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});