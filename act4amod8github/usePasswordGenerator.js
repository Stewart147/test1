import { useState, useCallback, useEffect } from 'react';

// Custom hook that encapsulates all password generation logic
export const usePasswordGenerator = () => {
  //  Password length
  const [length, setLength] = useState(10);

  //  Options
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [excludeSimilar, setExcludeSimilar] = useState(false);

  //  Multiple password support
  const [count, setCount] = useState(1); // number of passwords to generate
  const [passwords, setPasswords] = useState([]); // array of passwords

  //  Strength indicator
  const [strength, setStrength] = useState('');

  //  Error message
  const [error, setError] = useState('');

  //  Function to generate a single password
  const generateSinglePassword = useCallback(() => {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    //  Validation: at least one optional character set
    if (!numberAllowed && !characterAllowed) return '';

    //  Remove similar characters if option is enabled
    if (excludeSimilar) {
      const similarChars = 'il1Lo0O';
      str = str.split('').filter(c => !similarChars.includes(c)).join('');
    }

    let pass = '';
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    return pass;
  }, [length, numberAllowed, characterAllowed, excludeSimilar]);

  //  Generate array of passwords based on count
  const generatePasswords = useCallback(() => {
    if (!numberAllowed && !characterAllowed) {
      setError('Please select at least one option: Numbers or Characters');
      setPasswords([]);
      setStrength('');
      return;
    }

    setError('');

    const newPasswords = [];
    for (let i = 0; i < count; i++) {
      newPasswords.push(generateSinglePassword());
    }
    setPasswords(newPasswords);
  }, [count, generateSinglePassword, numberAllowed, characterAllowed]);

  //  Calculate password strength
  const calculateStrength = useCallback(() => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (numberAllowed) score++;
    if (characterAllowed) score++;
    if (excludeSimilar) score++; // bonus for readability

    if (score <= 1) setStrength('Weak');
    else if (score <= 3) setStrength('Medium');
    else setStrength('Strong');
  }, [length, numberAllowed, characterAllowed, excludeSimilar]);

  // ⚡ Auto-generate passwords and update strength when inputs change
  useEffect(() => {
    generatePasswords();
    calculateStrength();
  }, [length, numberAllowed, characterAllowed, excludeSimilar, count, generatePasswords, calculateStrength]);

  //  Return all state + setters
  return {
    length,
    setLength,
    numberAllowed,
    setNumberAllowed,
    characterAllowed,
    setCharacterAllowed,
    excludeSimilar,
    setExcludeSimilar,
    count,
    setCount,
    passwords,
    strength,
    error,
    generatePasswords, // expose manual regeneration
  };
};