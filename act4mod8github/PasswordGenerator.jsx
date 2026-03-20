import React, { useState, useCallback, useEffect, useRef } from 'react';

const PasswordGenerator = () => {
  // --------------------
  // State variables
  // --------------------
  const [length, setLength] = useState(10);              // Password length
  const [numberAllowed, setNumberAllowed] = useState(false); // Include numbers
  const [characterAllowed, setCharacterAllowed] = useState(false); // Include special characters
  const [password, setPassword] = useState('');         // Generated password
  const [copied, setCopied] = useState(false);          // Copy button feedback

  const passwordRef = useRef(null);

  // --------------------
  // Password generator function
  // --------------------
  const passwordGenerator = useCallback(() => {
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

  // --------------------
  // Copy password to clipboard with visual feedback
  // --------------------
  const copyPasswordToClipboard = useCallback(() => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopied(true);                     // Show feedback
        setTimeout(() => setCopied(false), 1000); // Revert after 1 second
      })
      .catch(() => alert('Failed to copy'));
  }, [password]);

  // --------------------
  // Password strength calculation (entropy-based)
  // --------------------
  const getPasswordStrength = useCallback(() => {
    if (!password) return { label: '', color: 'bg-gray-500', score: 0 };

    let charsetSize = 26; // lowercase+uppercase letters
    if (numberAllowed) charsetSize += 10; // numbers
    if (characterAllowed) charsetSize += 32; // special characters approx

    // Entropy calculation: log2(charsetSize^length) = length * log2(charsetSize)
    const entropy = password.length * Math.log2(charsetSize);

    // Determine label based on entropy
    let label = '';
    let color = '';
    if (entropy < 50) {
      label = 'Weak';
      color = 'bg-red-500';
    } else if (entropy < 80) {
      label = 'Medium';
      color = 'bg-yellow-500';
    } else {
      label = 'Strong';
      color = 'bg-green-500';
    }

    // Return label, color, and a score 0-100 for the progress bar
    const score = Math.min(100, Math.floor((entropy / 100) * 100));
    return { label, color, score };
  }, [password, numberAllowed, characterAllowed]);

  const strength = getPasswordStrength();

  // --------------------
  // Generate password on options change
  // --------------------
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>

      {/* Password display + copy button */}
      <div className="flex shadow rounded-lg overflow-hidden mb-2">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className={`outline-none px-3 py-0.5 shrink-0 text-white transition-colors duration-300 ${
            copied ? 'bg-green-600' : 'bg-blue-700'
          }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Password strength indicator */}
      <div className="h-2 w-full rounded bg-gray-600 mb-2 overflow-hidden">
        <div
          className={`${strength.color} h-full transition-all duration-300`}
          style={{ width: `${strength.score}%` }}
        />
      </div>
      <p className="text-sm text-white mb-3 text-center">{strength.label}</p>

      {/* Password options */}
      <div className="flex text-sm gap-x-2 mb-3">
        {/* Length slider */}
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>

        {/* Numbers checkbox */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        {/* Special characters checkbox */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={characterAllowed}
            id="characterInput"
            onChange={() => setCharacterAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>

      {/* Regenerate button */}
      <div className="text-center">
        <button
          onClick={passwordGenerator}
          className="bg-green-600 px-4 py-1 rounded text-white hover:bg-green-700 transition-colors duration-200"
        >
          Regenerate
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;