// util/validation.js

export function validateInvestment(values) {
  const errors = {};

  //  Validation rules
  if (values.initialInvestment < 0) {
    errors.initialInvestment = "Must be ≥ 0";
  }

  if (values.annualInvestment < 0) {
    errors.annualInvestment = "Must be ≥ 0";
  }

  if (values.expectedReturn < 0) {
    errors.expectedReturn = "Must be ≥ 0";
  }

  if (values.duration < 1) {
    errors.duration = "Must be at least 1 year";
  }

  return errors;
}