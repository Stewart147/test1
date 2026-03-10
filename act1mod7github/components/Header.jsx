//import React from 'react'
import logo from '../assets/trade5A.png';

// passed in props from App.jsx
//const Header = ({title, subtitle }) => {
  const Header = () => {

  return (

    <header id='header'>

        <img src= {logo} alt='investment-calculator logo' />
      {/*  <h1>{title}</h1>
        <h4>{subtitle}</h4> */}
        <h1>Investment Calculator</h1>


    </header>

    
  )

}

export default Header;
