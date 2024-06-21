import React from 'react'
import './AdminNavbar.css';
import { Link, useNavigate } from 'react-router-dom';


const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = ()=> {
    localStorage.removeItem("authToken");
    //localStorage.removeItem("userid");
    navigate("/");
  }
  return (
    <div className='adminnavbar'>
      <div className='adminnavbar31'>
        <div className='adminnavbar312'><button className='adminlogout' onClick={handleLogout}>Logout</button></div>
      </div>
    </div>
  )
}

export default AdminNavbar