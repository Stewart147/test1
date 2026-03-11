
export function calculateInvestmentResults({ initialInvestment, annualInvestment, expectedReturn, duration }) {
  const annualData = [];
  let investmentValue = initialInvestment;
  let totalInterest = 0;
  let investedCap = initialInvestment;

  for (let i = 0; i < duration; i++) {
    // calculate interest based on current investment value
    let interestEarnedInYear = +(investmentValue * (expectedReturn / 100)).toFixed(2);
    
    totalInterest = +(totalInterest + interestEarnedInYear).toFixed(2);

    // store row BEFORE adding annual contribution
    annualData.push({
      year: i + 1,
      interest: interestEarnedInYear,
      investmentValue: +(investmentValue + interestEarnedInYear).toFixed(2),
      totalInterest: totalInterest,
      investedCapital: investedCap,
    });

    // update for next iteration
    investmentValue = +(investmentValue + interestEarnedInYear + annualInvestment).toFixed(2);
    investedCap += annualInvestment;
  }

  return annualData;
}