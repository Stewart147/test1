  import React, { useState, useCallback } from 'react'

function App() {

  //  States
  const [leng, setLen] = useState(10)
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [pass, setPassword] = useState("")

  //  Visual feedback state (button flash)
  const [generated, setGenerated] = useState(false)

  //  Error state
  const [error, setError] = useState("")

  //  Password strength calculator
  const getPasswordStrength = () => {
    let score = 0

    // Increase score based on length
    if (leng >= 8) score++
    if (leng >= 12) score++

    // Increase score if options enabled
    if (numAllow) score++
    if (charAllow) score++

    // Return label + color
    if (score <= 1) return { label: "Weak", color: "text-red-400" }
    if (score === 2 || score === 3) return { label: "Medium", color: "text-yellow-400" }
    return { label: "Strong", color: "text-green-400" }
  }

  // Get current strength
  const strength = getPasswordStrength()

  //  Function to generate password
  const passwordGenerator = useCallback(() => {

    // Clear previous error
    setError("")

    // Validate length
    if (leng < 6) {
      setError("Password length must be at least 6")
      return
    }

    if (leng > 100) {
      setError("Password length must not exceed 100")
      return
    }

    let pass = ""

    let strdata = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllow) strdata += "0123456789"
    if (charAllow) strdata += "!£$%^&@#~`"

    // Edge case: no characters available
    if (strdata.length === 0) {
      setError("No character set selected")
      return
    }

    // Generate password
    for (let index = 0; index < leng; index++) {
      let char = Math.floor(Math.random() * strdata.length)
      pass += strdata.charAt(char)
    }

    setPassword(pass)

    // Trigger visual feedback
    setGenerated(true)
    setTimeout(() => setGenerated(false), 300)

  }, [leng, numAllow, charAllow])

  return (
    <>
      {/* Main container */}
      <div className='w-full max-w-screen-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 bg-gray-800 text-yellow-500'> 
        
        <h1 className='text-yellow-500'>Password Generator App</h1>

        {/* Password display */}
        <div className='flex shadow rounded-lg overflow-hidden mb-2'>
          <input 
            type="text" 
            value={pass} 
            className='outline-none w-full py-1 px-4'
            placeholder='Password' 
            readOnly 
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-400 text-sm mb-2">
            {error}
          </p>
        )}

        {/* Copy button (can enhance later) */}
        <button className='outline-none bg-slate-500 text-white px-4 py-1 shrink-0 mb-4'>
          Copy
        </button>

        {/* Controls */}
        <div className='flex text-sm gap-x-2'>

          {/* Length slider */}
          <div className='flex items-center gap-x-1'>
            <input 
              type='range'
              min={6}
              max={100}
              value={leng}
              className='cursor-pointer'
              onChange={(e) => {
                const value = Number(e.target.value)

                // Clamp value for safety
                if (value < 6) setLen(6)
                else if (value > 100) setLen(100)
                else setLen(value)
              }}
            />
            <label>Length: {leng}</label>
          </div>

          {/* Numbers checkbox */}
          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox' 
              checked={numAllow}
              id='numbInput'
              onChange={() => { setNumAllow((prev) => !prev) }}
            />
            <label htmlFor='numbInput'>Numbers</label>
          </div> 

          {/* Special characters checkbox */}
          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox' 
              checked={charAllow}
              id='charInput'
              onChange={() => { setCharAllow((prev) => !prev) }}
            />
            <label htmlFor='charInput'>Characters</label>
          </div> 

        </div>

        {/*  Password Strength Indicator */}
        <div className="mt-3">
          
          {/* Strength label */}
          <p className={`text-sm font-semibold ${strength.color}`}>
            Strength: {strength.label}
          </p>

          {/* Tooltip / help text */}
          <p className="text-xs text-gray-300">
            {strength.label === "Weak" && "Use at least 8 characters and include numbers or symbols."}
            {strength.label === "Medium" && "Good, but adding symbols or increasing length will improve security."}
            {strength.label === "Strong" && "Strong password! Good mix of length and character types."}
          </p>

          {/* Optional strength bar */}
          <div className="w-full h-2 bg-gray-700 rounded mt-2">
            <div 
              className={`h-2 rounded transition-all duration-300 ${
                strength.label === "Weak" ? "w-1/3 bg-red-500" :
                strength.label === "Medium" ? "w-2/3 bg-yellow-500" :
                "w-full bg-green-500"
              }`}
            />
          </div>

        </div>

      </div>

      {/* Generate button with visual feedback */}
      <button 
        onClick={passwordGenerator}
        className={`px-4 py-2 rounded text-white transition-colors duration-300 ${
          generated ? 'bg-green-500' : 'bg-blue-500'
        }`}
      >
        Generate Password
      </button>
    </>
  )
}

export default App;