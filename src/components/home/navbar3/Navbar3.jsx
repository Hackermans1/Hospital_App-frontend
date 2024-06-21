import React from 'react'
import './Navbar3.css'
import { Link } from 'react-router-dom'

const Navbar3 = () => {
  return (
    <div className='navbar3'>
      <div className='navbar31'>
        <div className='navbar311'><Link to="/">Home</Link></div>
        <div className='navbar312'><Link to="/">About</Link></div>
        <div className='navbar312'><Link to="/">Events</Link></div>
        <div className='navbar312'><Link to="/">Gallery</Link></div>
        <div className='navbar312'><Link to="/login">Book Appointments</Link></div>
      </div>
    </div>
  )
}

export default Navbar3