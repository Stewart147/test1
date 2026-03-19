
import React, { useState, useCallback } from 'react'

function App() {

  //  State variables
  const [leng, setLen] = useState(10)
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [pass, setPassword] = useState("")

  //  Function to generate password
  const passwordGenerator = useCallback(() => {

    let pass = ""  // temporary password variable

    //  Base string (alphabets)
    let strdata = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    //  Add numbers if allowed
    if (numAllow) strdata += "0123456789"

    //  Add special characters if allowed
    if (charAllow) strdata += "!£$%^&@#~`"

    //  Loop to generate password of given length
    for (let index = 0; index < leng; index++) {

      //  Generate random index
      let char = Math.floor(Math.random() * strdata.length)

      //  Add random character to password
      pass += strdata.charAt(char)
    }

    //  Save generated password to state
    setPassword(pass)

  }, [leng, numAllow, charAllow, setPassword]) // dependencies

  return (
    <>
      {/*  Main container */}
      <div className='w-full max-w-screen-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 bg-gray-800 text-yellow-500'> 
        
        {/*  Title */}
        <h1>Password Generator App</h1>

        {/*  Password display */}
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text" 
            value={pass} 
            className='outline-none w-full py-1 px-4'
            placeholder='Password' 
            readOnly 
          />
        </div>

        {/*  Copy button (not functional yet) */}
        <button className='outline-none bg-slate-500 text-white px-4 py-1 shrink-0'>
          Copy
        </button> 

        {/*  Controls */}
        <div className='flex text-sm gap-x-2'>

          {/*  Length slider */}
          <div className='flex items-center gap-x-1'>
            <input 
              type='range'
              min={6}
              max={100}
              value={leng}
              className='cursor-pointer'
              onChange={(e) => { setLen(Number(e.target.value)) }} // convert to number
            />
            <label>Length: {leng}</label>
          </div>

          {/*  Numbers checkbox */}
          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox' 
              checked={numAllow}
              id='numbInput'
              onChange={() => { setNumAllow((prev) => !prev) }}
            />
            <label htmlFor='numbInput'>Numbers</label>
          </div> 

          {/*  Special characters checkbox */}
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
      </div>

      {/*  Button to trigger password generation */}
      <button onClick={passwordGenerator}>
        Generate Password
      </button>
    </>
  )
}

export default App