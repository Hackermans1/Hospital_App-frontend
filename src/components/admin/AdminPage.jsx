import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from './adminNavbar/AdminNavbar';
import AdminSidebar from './adminSidebar/AdminSidebar';
import AdminRightContent from './adminRightContent/AdminRightContent';

const AdminPage = () => {
  return (
    <div className='admin'>
      <AdminNavbar />
      <AdminSidebar />
      <AdminRightContent>
        <Outlet />
      </AdminRightContent>
    </div>
  )
}

export default AdminPage