import React from 'react'
import logo from '../assets/invest-logo.jpg';


const Header = ({title, subtitle }) => {

  return (

    <header id='header'>

        <img src= {logo} alt='investment-calculator logo' />
        <h1>{title}</h1>
        <h4>{subtitle}</h4>


    </header>

    
  )

}

export default Header
