import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='doctorsidebar'>
      <div className='doctoricon'><NavLink to="/doctor/doctoravailability" activeClassName="active">Update Availability</NavLink></div>
      <div className='doctoricon'><NavLink to="/doctor/bookingnotifications" activeClassName="active">All Bookings</NavLink></div>
      <div className='doctoricon'><NavLink to="/doctor/doctordetails" activeClassName="active">My Profile</NavLink></div>
    </div>
  )
}

export default Sidebar