import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
        <header className='header'>
            <h4 className='appName'>FLY HIGH</h4>
            <button className='logout' onClick={() => {localStorage.removeItem("user");navigate("/login")}}>Logout</button>
        </header>
        
    </>
  )
}

export default Header