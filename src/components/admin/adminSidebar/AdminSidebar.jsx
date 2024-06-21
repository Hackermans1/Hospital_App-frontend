import { NavLink } from 'react-router-dom';
import React from 'react'
import './AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <div className='adminsidebar'>
      {/* <div className='adminicon'><NavLink exact to="/admin">Dashboard</NavLink></div> */}
      <div className='adminicon'><NavLink to="/admin/news" activeClassName="active">Add News</NavLink></div>
      <div className='adminicon'><NavLink to="/admin/admindetails" activeClassName="active">My Profile</NavLink></div>
      <div className='adminicon'><NavLink to="/admin/adminnotifications" activeClassName="active">Notifications</NavLink></div>
      <div className='adminicon'><NavLink to="/admin/inventory" activeClassName="active">Inventory</NavLink></div>
      <div className='adminicon'><NavLink to="/admin/dynamicgraph" activeClassName="active">Dynamic Graph</NavLink></div>
    </div>
  )
}

export default AdminSidebar;
