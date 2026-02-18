
import { useState } from 'react';
import './component/Appform.css';
import './App.css';
import { Appform } from './component/Appform';

function App() {

  // set dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // function to toggle to dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (

    // use ternary conditional for mode for class styles
    <div className={darkMode ? "App dark" : "App"}>

      <button 
        className="dark-toggle"
        onClick={toggleDarkMode}
      >
        {/* use ternary conditional to determine if light/dark mode selected */}
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <Appform />

    </div>
  );
}

export default App;
