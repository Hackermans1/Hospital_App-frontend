import React from 'react'
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = ()=> {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userid");
    navigate("/");
  }
  return (
    <div className='doctornavbar'>
      <div className='doctornavbar31'>
        <div className='doctornavbar312'><button className='doctorlogout' onClick={handleLogout}>Logout</button></div>
      </div>
    </div>
  )
}

export default Navbar