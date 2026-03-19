import React, { useState, useCallback, useEffect } from 'react';

const PasswordGenerator = () => {
  // ===========================
  // State for password options
  // ===========================
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [excludeSimilar, setExcludeSimilar] = useState(false);

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
    // Validate length
    if (length < 6 || length > 100) {
      setErrorMessage('Password length must be between 6 and 100.');
      setPassword('');
      return;
    }

    // Validate at least one character type selected
    if (!numberAllowed && !characterAllowed) {
      setErrorMessage('Please select at least one character type: Numbers or Special Characters.');
      setPassword('');
      return;
    }

    setErrorMessage('');

    // Base characters (letters always included)
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    // Add numbers and special characters if selected
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Remove similar characters if option selected
    if (excludeSimilar) str = str.replace(/[il1Lo0O]/g, '');

    // Generate password
    let pass = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, excludeSimilar]);

  // ===========================
  // Copy password to clipboard
  // ===========================
  const copyPasswordToClipboard = useCallback(() => {
    if (!password) return;
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => alert("Failed to copy password"));
  }, [password]);

  // ===========================
  // Handle slider change
  // ===========================
  const handleLengthChange = (value) => {
    let num = Number(value);
    if (num < 6) num = 6;
    if (num > 100) num = 100;
    setLength(num);
  };

  // ===========================
  // Password strength function
  // ===========================
  const getPasswordStrength = useCallback(() => {
    let score = 0;
    if (length >= 6) score += 1;
    if (length >= 10) score += 1;
    if (length >= 14) score += 1;
    if (numberAllowed) score += 1;
    if (characterAllowed) score += 1;
    if (excludeSimilar) score += 0.5;

    if (score <= 2) return { label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { label: 'Medium', color: 'bg-yellow-500' };
    if (score <= 4.5) return { label: 'Strong', color: 'bg-green-500' };
    return { label: 'Very Strong', color: 'bg-blue-500' };
  }, [length, numberAllowed, characterAllowed, excludeSimilar]);

  // ===========================
  // Keyboard shortcuts
  // ===========================
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + G -> Generate password
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        passwordGenerator();
      }

      // Ctrl/Cmd + C -> Copy password
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        copyPasswordToClipboard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [passwordGenerator, copyPasswordToClipboard]);

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

      {/* Password strength indicator */}
      <div className="mb-2">
        <div className="text-sm mb-1">Strength: {getPasswordStrength().label}</div>
        <div className="w-full h-2 bg-gray-700 rounded">
          <div
            className={`${getPasswordStrength().color} h-2 rounded transition-all duration-300`}
            style={{ width: `${(length / 100) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Password options */}
      <div className="flex flex-wrap text-sm gap-x-4 gap-y-2 mb-2 items-center">
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

        {/* Exclude similar characters checkbox */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={excludeSimilar}
            id="similarInput"
            onChange={() => setExcludeSimilar(prev => !prev)}
          />
          <label htmlFor="similarInput">Exclude Similar Characters (i, l, 1, 0, o, O)</label>
        </div>
      </div>

      {/* Generate button */}
      <button
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition mb-2"
        onClick={passwordGenerator}
      >
        Generate Password
      </button>

      {/* ===========================
          Keyboard shortcuts tooltip
          =========================== */}
      <div className="text-xs text-gray-300 italic">
        Keyboard Shortcuts: <br />
        <span className="font-semibold">Ctrl/Cmd + G</span> → Generate Password, <span className="font-semibold">Ctrl/Cmd + C</span> → Copy Password
      </div>
    </div>
  );
};

export default PasswordGenerator;