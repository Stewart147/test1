// hooks/useForm.js

import { useState } from "react";

export function useForm(initialValues, validateFn) {
  //  Store form values
  const [values, setValues] = useState(initialValues);

  //  Store validation errors
  const [errors, setErrors] = useState({});

  //  Handle input changes with type conversion
  const handleChange = (event) => {
    const { name, value, type } = event.target;

    let convertedValue = value;

    //  Convert number inputs from string → number
    if (type === "number") {
      convertedValue = Number(value);

      //  Prevent negative values
      if (convertedValue < 0) {
        convertedValue = 0;
      }
    }

    // ✅ Update state
    setValues((prev) => ({
      ...prev,
      [name]: convertedValue,
    }));
  };

  // ✅ Run validation function passed from component
  const validate = () => {
    const validationErrors = validateFn(values);

    setErrors(validationErrors);

    // ✔️ Return true if no errors
    return Object.keys(validationErrors).length === 0;
  };

  return {
    values,
    errors,
    handleChange,
    validate,
  };
}