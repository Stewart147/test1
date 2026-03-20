import React, { useState, useCallback, useEffect, useRef } from 'react';
import { usePasswordGenerator } from './usePasswordGenerator';

const PasswordGenerator = () => {
  const {
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
    generatePasswords,
  } = usePasswordGenerator();

  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const passwordRefs = useRef([]);

  // Copy individual password
  const copyPasswordToClipboard = useCallback((password, index) => {
    if (error || !password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
  }, [error]);

  // Copy all passwords
  const copyAllPasswords = useCallback(() => {
    if (error || passwords.length === 0) return;
    const allText = passwords.join('\n');
    navigator.clipboard.writeText(allText).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1500);
    });
  }, [error, passwords]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Ctrl/Cmd + G → Generate passwords
      if (ctrlKey && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        generatePasswords();
      }

      // Ctrl/Cmd + C → Copy all passwords
      if (ctrlKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        copyAllPasswords();
      }

      // Ctrl/Cmd + Shift + C → Copy focused password
      if (ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        const focusedIndex = passwordRefs.current.findIndex(
          input => input === document.activeElement
        );
        if (focusedIndex !== -1) {
          copyPasswordToClipboard(passwords[focusedIndex], focusedIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generatePasswords, copyAllPasswords, copyPasswordToClipboard, passwords]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>

      {/* Controls */}
      <div className="flex text-sm gap-x-2 flex-wrap mb-3">
        {/* Length */}
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>

        {/* Numbers */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed(prev => !prev)}
          />
          <label>Numbers</label>
        </div>

        {/* Characters */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={characterAllowed}
            onChange={() => setCharacterAllowed(prev => !prev)}
          />
          <label>Characters</label>
        </div>

        {/* Exclude Similar */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={excludeSimilar}
            onChange={() => setExcludeSimilar(prev => !prev)}
          />
          <label>Exclude Similar</label>
        </div>

        {/* Count */}
        <div className="flex items-center gap-x-1">
          <label>Count:</label>
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            className="w-12 text-black px-1 rounded"
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Buttons with shortcut hints */}
      <div className="flex gap-x-2 mb-3">
        <button
          onClick={generatePasswords}
          className="bg-blue-700 text-white px-3 py-1 rounded"
          title="Shortcut: Ctrl/Cmd + G"
        >
          Regenerate (Ctrl/Cmd + G)
        </button>

        <button
          onClick={copyAllPasswords}
          disabled={passwords.length === 0 || !!error}
          className={`px-3 py-1 rounded text-white ${
            copiedAll ? 'bg-green-600' : 'bg-purple-700'
          }`}
          title="Shortcut: Ctrl/Cmd + C"
        >
          {copiedAll ? '✔ Copied All' : 'Copy All (Ctrl/Cmd + C)'}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

      {/* Strength */}
      {strength && (
        <div className="mb-3 flex justify-between text-white text-sm">
          <span>Password Strength</span>
          <span>{strength}</span>
        </div>
      )}

      {/* Display passwords */}
      {passwords.map((pw, index) => (
        <div key={index} className="flex shadow rounded-lg overflow-hidden mb-2">
          <input
            type="text"
            value={pw}
            readOnly
            ref={el => passwordRefs.current[index] = el}
            className="outline-none w-full py-1 px-3"
            title="Shortcut: Enter or Ctrl/Cmd + Shift + C to copy"
          />
          <button
            onClick={() => copyPasswordToClipboard(pw, index)}
            className={`outline-none px-3 py-0.5 text-white ${
              copiedIndex === index ? 'bg-green-600' : 'bg-blue-700'
            }`}
            title="Shortcut: Enter or Ctrl/Cmd + Shift + C"
          >
            {copiedIndex === index ? '✔ Copied' : 'Copy'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PasswordGenerator;

/*
Why this pattern is powerful (simple explanation)
1.  Logic is isolated
usePasswordGenerator()

All logic lives in one place

Easy to debug and improve

2.  Component is clean
return ( ... JSX ... )

Mostly UI

Easy to read and maintain

3.  Reusability

You can now do this anywhere:

const { password } = usePasswordGenerator();
4.  Scalable architecture

If you add:

entropy scoring

password rules

API saving

 You only touch the hook */

