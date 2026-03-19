import React, { useState, useCallback } from 'react';

const PasswordGenerator = () => {
  // ===========================
  // State for password options
  // ===========================
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);

  // ===========================
  // State for generated password
  // ===========================
  const [password, setPassword] = useState('');

  // ===========================
  // State for copy feedback
  // ===========================
  const [copied, setCopied] = useState(false);

  // ===========================
  // State for error messages
  // ===========================
  const [errorMessage, setErrorMessage] = useState('');

  // ===========================
  // Password generator function
  // ===========================
  const passwordGenerator = useCallback(() => {
    // Validation: check length
    if (length < 6 || length > 100) {
      setErrorMessage('Password length must be between 6 and 100.');
      return;
    }

    // Validation: at least one character type must be selected
    if (!numberAllowed && !characterAllowed) {
      setErrorMessage('Please select at least one character type: Numbers or Special Characters.');
      return;
    }

    setErrorMessage(''); // clear error if validations pass

    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  // ===========================
  // Copy password to clipboard
  // ===========================
  const copyPasswordToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => alert("Failed to copy password"));
  };

  // ===========================
  // Handle slider change with validation
  // ===========================
  const handleLengthChange = (value) => {
    let num = Number(value);
    if (num < 6) num = 6;
    if (num > 100) num = 100;
    setLength(num);
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>

      {/* Password input with Copy button */}
      <div className="flex shadow rounded-lg overflow-hidden mb-1">
        <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 bg-gray-700 text-white"
          placeholder="Password"
          readOnly
        />
        <button 
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </div>

      {/* Copied feedback */}
      {copied && (
        <div className="text-green-500 text-sm mb-2 transition-opacity duration-500 opacity-100">
          Copied!
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="text-red-500 text-sm mb-2">
          {errorMessage}
        </div>
      )}

      {/* Password options */}
      <div className="flex flex-wrap text-sm gap-x-4 gap-y-2 mb-4 items-center">
        {/* Length slider */}
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => handleLengthChange(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>

        {/* Numbers checkbox */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed(prev => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        {/* Special characters checkbox */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={characterAllowed}
            id="characterInput"
            onChange={() => setCharacterAllowed(prev => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>

      {/* Generate button */}
      <button
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        onClick={passwordGenerator}
      >
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;