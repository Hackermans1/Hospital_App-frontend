import React from 'react'
import './PatientSidebar.css'
import { NavLink } from 'react-router-dom'

const PatientSidebar = () => {
  return (
    <div className='patientsidebar'>
      <div className='patienticon'><NavLink to="/patient/getapproveddoctors">Book Appointment</NavLink></div>
      <div className='patienticon'><NavLink to="/patient/prescription">Prescription</NavLink></div>
      <div className='patienticon'><NavLink to="/patient/patientdetails">My Profile</NavLink></div>
    </div>
  )
}

export default PatientSidebar