export function calculateInvestmentResults({
  initialInvestment,
  annualInvestment,
  expectedReturn,
  duration
}) {
  const annualData = [];

  let investmentValue = initialInvestment;
  let totalInterest = 0;
  let investedCapital = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);

    totalInterest += interestEarnedInYear;
    investedCapital += annualInvestment;
    investmentValue += interestEarnedInYear + annualInvestment;

    annualData.push({
      year: i + 1,
      interest: interestEarnedInYear,
      investmentValue: investmentValue,
      totalInterest: totalInterest,
      investedCapital: investedCapital
    });
  }

  return annualData;
}