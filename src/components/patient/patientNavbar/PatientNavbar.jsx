import React from 'react'
import './PatientNavbar.css';
import { Link, useNavigate } from 'react-router-dom';


const PatientNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = ()=> {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userid");
    navigate("/");
  }
  return (
    <div className='patientnavbar'>
      <div className='patientnavbar31'>
        <div className='patientnavbar312'><button className='patientlogout' onClick={handleLogout}>Logout</button></div>
      </div>
    </div>
  )
}

export default PatientNavbar